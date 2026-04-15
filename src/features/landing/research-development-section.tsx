type FounderProfile = {
  name: string
  bio: readonly string[]
}

type ResearchDevelopmentSectionProps = {
  founderProfile: FounderProfile
}

export function ResearchDevelopmentSection({
  founderProfile,
}: ResearchDevelopmentSectionProps) {
  return (
    <section id="team" className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <p className="mb-8 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Research &amp; Development
        </p>
        <div className="border-t border-border pt-8">
          <div className="grid gap-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8">
            <div className="flex size-14 items-center justify-center rounded-full border border-border bg-muted/45 text-lg font-medium tracking-[-0.03em] text-foreground sm:size-18 sm:text-xl">
              B
            </div>
            <div className="max-w-4xl">
              <h3 className="text-2xl font-medium tracking-[-0.02em] text-foreground">
                {founderProfile.name}
              </h3>
              <div className="mt-4 space-y-4">
                {founderProfile.bio.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-foreground/88 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
