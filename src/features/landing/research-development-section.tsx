import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    <section
      id="author"
      className="scroll-mt-24 border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <p className="mb-8 text-[0.72rem] font-medium tracking-[0.28em] text-muted-foreground uppercase">
          Author
        </p>
        <div className="border-t border-border pt-8">
          <div className="grid gap-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
            <Avatar className="!size-36 bg-muted/35 sm:!size-40">
              <AvatarImage
                src="https://dev-herbarium.plantasia.space/image-assets/entangled-space/landing/06b-bruna-profile-square-self-portrait_mid.webp"
                alt="Bruna Guarnieri Colasso"
                className="object-[center_12%]"
                loading="lazy"
              />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
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
