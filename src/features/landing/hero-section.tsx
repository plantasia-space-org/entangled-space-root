import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"

const LIGHT_VIDEO_SRC =
  "https://plantasia-prod-public.fra1.digitaloceanspaces.com/entangled-space/videos/entangled-space-preview-light.mp4"
const DARK_VIDEO_SRC =
  "https://plantasia-prod-public.fra1.digitaloceanspaces.com/entangled-space/videos/entangled-space-preview-dark.mp4"

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)

  const videoSrc = resolvedTheme === "dark" ? DARK_VIDEO_SRC : LIGHT_VIDEO_SRC

  useEffect(() => {
    setIsVideoReady(false)
  }, [videoSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {})
    }
  }, [videoSrc])

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0">
        <video
          key={videoSrc}
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setIsVideoReady(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-background transition-opacity duration-500 ${
            isVideoReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-background via-background/84 via-42% to-background/24 lg:via-background/72 lg:to-background/14"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-background/16 via-transparent to-background/66"
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
    </section>
  )
}
