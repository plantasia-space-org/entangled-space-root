import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"

const IFRAME_ORIGIN = "https://dev-world.plantasia.space"
const IFRAME_INIT_SYNC_DELAY_MS = 250
const IFRAME_MASK_DURATION_MS = 900

type ThemeColors = { backgroundColor: string; foregroundColor: string }

function buildIframeSrc(theme: "dark" | "light"): string {
  const url = new URL("/", IFRAME_ORIGIN)
  url.searchParams.set("mode", "10")
  url.searchParams.set("fullscreen", "false")
  url.searchParams.set("skybox", "false")
  url.searchParams.set("theme", theme)
  return url.toString()
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function srgbChannelToByte(value: number): number {
  if (value <= 0) return 0
  if (value >= 1) return 255

  const encoded =
    value <= 0.0031308
      ? value * 12.92
      : 1.055 * Math.pow(value, 1 / 2.4) - 0.055

  return clampByte(encoded * 255)
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map(channel => clampByte(channel).toString(16).padStart(2, "0"))
    .join("")}`
}

function parseRgbChannel(channel: string): number {
  const value = channel.trim()
  if (value.endsWith("%")) {
    return (Number.parseFloat(value) / 100) * 255
  }

  return Number.parseFloat(value)
}

function parseHexColor(color: string): string | null {
  const value = color.trim().replace(/^#/, "")

  if (value.length === 3 || value.length === 4) {
    const [r, g, b] = value
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }

  if (value.length === 6 || value.length === 8) {
    return `#${value.slice(0, 6).toLowerCase()}`
  }

  return null
}

function parseRgbColor(color: string): string | null {
  const match = color.match(/^rgba?\((.+)\)$/i)
  if (!match) return null

  const [r = "0", g = "0", b = "0"] = match[1]
    .split(/[,\s/]+/)
    .filter(Boolean)

  return rgbToHex(
    parseRgbChannel(r),
    parseRgbChannel(g),
    parseRgbChannel(b)
  )
}

function parseLightness(value: string): number {
  const trimmed = value.trim()
  if (trimmed.endsWith("%")) {
    return Number.parseFloat(trimmed) / 100
  }

  return Number.parseFloat(trimmed)
}

function parseHue(value: string): number {
  const trimmed = value.trim().toLowerCase()
  if (!trimmed) return 0
  if (trimmed.endsWith("deg")) return Number.parseFloat(trimmed)
  if (trimmed.endsWith("grad")) return Number.parseFloat(trimmed) * 0.9
  if (trimmed.endsWith("rad")) return (Number.parseFloat(trimmed) * 180) / Math.PI
  if (trimmed.endsWith("turn")) return Number.parseFloat(trimmed) * 360
  return Number.parseFloat(trimmed)
}

function parseOklchColor(color: string): string | null {
  const match = color.match(/^oklch\((.+)\)$/i)
  if (!match) return null

  const [lightness = "0", chroma = "0", hue = "0"] = match[1]
    .split("/")[0]
    .trim()
    .split(/\s+/)

  const l = parseLightness(lightness)
  const c = Number.parseFloat(chroma)
  const h = (parseHue(hue) * Math.PI) / 180

  const a = c * Math.cos(h)
  const b = c * Math.sin(h)

  const lComponent = l + 0.3963377774 * a + 0.2158037573 * b
  const mComponent = l - 0.1055613458 * a - 0.0638541728 * b
  const sComponent = l - 0.0894841775 * a - 1.291485548 * b

  const lLinear = lComponent ** 3
  const mLinear = mComponent ** 3
  const sLinear = sComponent ** 3

  const r =
    4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear
  const g =
    -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear
  const blue =
    -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear

  return rgbToHex(
    srgbChannelToByte(r),
    srgbChannelToByte(g),
    srgbChannelToByte(blue)
  )
}

function cssVarToHex(variable: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()

  return (
    parseHexColor(value) ??
    parseRgbColor(value) ??
    parseOklchColor(value) ??
    "#000000"
  )
}

function readThemeColors(): ThemeColors {
  return {
    backgroundColor: cssVarToHex("--background"),
    foregroundColor: cssVarToHex("--foreground"),
  }
}

function send(iframe: HTMLIFrameElement, type: string, payload: object) {
  iframe.contentWindow?.postMessage(
    { type, version: "1.0", requestId: `${type}_${Date.now()}`, payload },
    "*"
  )
}

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const initialIframeSrcRef = useRef(buildIframeSrc(resolvedTheme))
  const handshook = useRef(false)
  const hasLoaded = useRef(false)
  const lastThemeSignatureRef = useRef<string | null>(null)
  const initSyncTimeoutRef = useRef<number | null>(null)
  const maskTimeoutRef = useRef<number | null>(null)
  const [isIframeMasked, setIsIframeMasked] = useState(true)

  const postTheme = useCallback((
    colors: ThemeColors,
    options?: { forceHello?: boolean; forcePayload?: boolean }
  ) => {
    const iframe = iframeRef.current
    if (!iframe) return

    const forceHello = options?.forceHello ?? false
    const forcePayload = options?.forcePayload ?? false
    const signature = `${colors.backgroundColor}:${colors.foregroundColor}`

    if (forceHello || !handshook.current) {
      send(iframe, "HELLO", {})
      handshook.current = true
    }

    if (!forcePayload && lastThemeSignatureRef.current === signature) {
      return
    }

    send(iframe, "HOST_OUTPUT", { previewState: { entangledSpace: colors } })
    lastThemeSignatureRef.current = signature
  }, [])

  const maskIframeTemporarily = useCallback(() => {
    setIsIframeMasked(true)

    if (maskTimeoutRef.current !== null) {
      window.clearTimeout(maskTimeoutRef.current)
    }

    maskTimeoutRef.current = window.setTimeout(() => {
      setIsIframeMasked(false)
      maskTimeoutRef.current = null
    }, IFRAME_MASK_DURATION_MS)
  }, [])

  const syncTheme = useCallback((options?: { forceHello?: boolean; forcePayload?: boolean }) => {
    postTheme(readThemeColors(), options)
  }, [postTheme])

  useEffect(() => {
    if (!hasLoaded.current) {
      return
    }

    const id = requestAnimationFrame(() => {
      maskIframeTemporarily()
      syncTheme()
    })
    return () => cancelAnimationFrame(id)
  }, [resolvedTheme, maskIframeTemporarily, syncTheme])

  useEffect(() => {
    return () => {
      if (initSyncTimeoutRef.current !== null) {
        window.clearTimeout(initSyncTimeoutRef.current)
      }

      if (maskTimeoutRef.current !== null) {
        window.clearTimeout(maskTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 hidden lg:block">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-background via-background/76 via-38% to-background/18"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-background/12 via-transparent to-background/58"
        />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-4.5rem)] w-full max-w-6xl flex-col justify-between px-6 py-20 sm:px-8 sm:py-28 lg:min-h-[78vh] lg:py-24 xl:min-h-[84vh]">
        <div className="max-w-4xl lg:max-w-3xl xl:max-w-4xl">
          <p className="mb-8 text-[0.72rem] font-medium tracking-[0.28em] text-muted-foreground uppercase">
            entangled.space
          </p>
          <h1 className="max-w-4xl text-5xl leading-[0.92] font-medium tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl xl:text-[7rem]">
            An open protocol for regenerative economies.
          </h1>
        </div>

        <div className="mt-14 border-t border-border/80 pt-8 lg:max-w-md lg:border-t-0 lg:pt-0">
          <p className="max-w-2xl text-base leading-8 text-foreground sm:text-lg">
            Derived from music theory. Tuned to natural cycles. Open by design.
          </p>
        </div>
      </div>

      <div className="relative mt-14 aspect-square overflow-hidden border border-border/60 bg-background lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:border-0">
        <iframe
          ref={iframeRef}
          src={initialIframeSrcRef.current}
          title="Entangled Space 3D animation"
          className="pointer-events-none h-full w-full outline-none lg:pointer-events-auto"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => {
            hasLoaded.current = true
            handshook.current = false
            lastThemeSignatureRef.current = null
            maskIframeTemporarily()

            if (initSyncTimeoutRef.current !== null) {
              window.clearTimeout(initSyncTimeoutRef.current)
            }

            requestAnimationFrame(() => {
              syncTheme({ forceHello: true, forcePayload: true })
            })

            initSyncTimeoutRef.current = window.setTimeout(() => {
              syncTheme({ forcePayload: true })
              initSyncTimeoutRef.current = null
            }, IFRAME_INIT_SYNC_DELAY_MS)
          }}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-background transition-opacity duration-300 ${
            isIframeMasked ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/18 lg:hidden"
        />
      </div>
    </section>
  )
}
