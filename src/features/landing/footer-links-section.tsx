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
            <a
              href="https://plantasia.space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
            >
              plantasia.space ↗
            </a>
            <a
              href="https://artizen.fund/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
            >
              Fund on Artizen ↗
            </a>
            <a
              href="https://github.com/plantasia-space-org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              GitHub ↗
            </a>
            <a
              href="?contact=1"
              onClick={(event) => {
                event.preventDefault()
                onContactClick()
              }}
              className="inline-flex items-center border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
