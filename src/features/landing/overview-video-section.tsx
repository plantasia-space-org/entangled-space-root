import { useEffect, useState } from "react"

const LANDSCAPE_VIDEO_SRC =
  "https://herbarium.plantasia.space/entangled-space/videos/horizontal-entangled-space-60.mp4"
const VERTICAL_VIDEO_SRC =
  "https://herbarium.plantasia.space/entangled-space/videos/vertical-entangled-space-60.mp4"
const LANDSCAPE_POSTER_SRC =
  "https://herbarium.plantasia.space/image-assets/entangled-space/landing/ent-space-horizontal-poster_mid.webp"
const VERTICAL_POSTER_SRC =
  "https://herbarium.plantasia.space/image-assets/entangled-space/landing/ent-space-vertical-poster_mid.webp"

function useIsDesktopVideo() {
  const [isDesktopVideo, setIsDesktopVideo] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const syncVideoFormat = () => setIsDesktopVideo(mediaQuery.matches)

    syncVideoFormat()
    mediaQuery.addEventListener("change", syncVideoFormat)

    return () => mediaQuery.removeEventListener("change", syncVideoFormat)
  }, [])

  return isDesktopVideo
}

export function OverviewVideoSection() {
  const isDesktopVideo = useIsDesktopVideo()
  const videoSrc = isDesktopVideo ? LANDSCAPE_VIDEO_SRC : VERTICAL_VIDEO_SRC
  const posterSrc = isDesktopVideo ? LANDSCAPE_POSTER_SRC : VERTICAL_POSTER_SRC
  const videoClassName = isDesktopVideo
    ? "aspect-video w-full bg-background object-cover"
    : "aspect-[9/16] w-full bg-background object-cover"

  return (
    <section
      id="video"
      className="scroll-mt-24 border-b border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-4">
            <h2 className="max-w-2xl text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
              Video overview
            </h2>
          </div>
        </div>

        <div className="overflow-hidden border border-border bg-muted/35">
          <video
            key={videoSrc}
            className={videoClassName}
            controls
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
