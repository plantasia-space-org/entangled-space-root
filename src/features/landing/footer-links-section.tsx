import { Button } from "@/components/ui/button"

type FooterLinksSectionProps = {
  onContactClick: () => void
}

export function FooterLinksSection({
  onContactClick,
}: FooterLinksSectionProps) {
  return (
    <section id="follow" className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Learn More
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="px-5 text-sm">
              <a
                href="https://plantasia.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                plantasia.space ↗
              </a>
            </Button>
            <Button asChild size="lg" className="px-5 text-sm">
              <a
                href="https://artizen.fund/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fund on Artizen ↗
              </a>
            </Button>
            <Button asChild size="lg" className="px-5 text-sm">
              <a
                href="https://github.com/plantasia-space-org"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
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
