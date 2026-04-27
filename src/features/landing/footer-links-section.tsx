import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type FooterLinksSectionProps = {
  onContactClick: () => void
}

export function FooterLinksSection({
  onContactClick,
}: FooterLinksSectionProps) {
  return (
    <section
      id="discover"
      className="scroll-mt-24 border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-medium tracking-[0.28em] text-muted-foreground uppercase">
            Discover
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="px-5 text-sm">
              <a
                href="https://plantasia.space"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <span>Plantasia Space</span>
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" className="px-5 text-sm">
              <a
                href="https://artizen.fund/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <span>Sponsor on Artizen</span>
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" className="px-5 text-sm">
              <a
                href="https://github.com/sponsors/plantasia-space-org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <span>Sponsor on GitHub</span>
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" className="px-5 text-sm">
              <a
                href="?contact=1"
                onClick={(event) => {
                  event.preventDefault()
                  onContactClick()
                }}
              >
                Contact
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
