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
      className="relative scroll-mt-24 overflow-hidden border-t border-border bg-background"
    >
      <div className="absolute inset-0">
        <img
          src="https://herbarium.plantasia.space/image-assets/entangled-space/landing/sunflower_mid.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-50 dark:opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,244,236,0.98)_0%,rgba(247,244,236,0.95)_44%,rgba(247,244,236,0.72)_78%,rgba(247,244,236,0.9)_100%)] dark:bg-[linear-gradient(90deg,rgba(18,18,18,0.9)_0%,rgba(18,18,18,0.76)_44%,rgba(18,18,18,0.42)_78%,rgba(18,18,18,0.64)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_36%,rgba(116,83,36,0.15),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.16))] dark:bg-[radial-gradient(circle_at_82%_36%,rgba(214,171,93,0.2),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.12))]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
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
