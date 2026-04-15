import { Button } from "@/components/ui/button"

import type { FormStatus } from "@/features/landing/forms"
import { getStatusMessage } from "@/features/landing/forms"

type WaitlistSectionProps = {
  email: string
  status: FormStatus
  onEmailChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function WaitlistSection({
  email,
  status,
  onEmailChange,
  onSubmit,
}: WaitlistSectionProps) {
  const isSuccess = status.type === "success"

  return (
    <section id="waitlist" className="border-t border-border bg-muted/35">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Stay in the loop
          </p>
          <h2 className="mt-6 text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
            Join the waitlist
          </h2>
          {isSuccess ? (
            <div className="mx-auto mt-10 max-w-xl border border-border bg-background px-6 py-6 sm:px-8">
              <p className="text-lg font-medium tracking-[-0.02em] text-foreground sm:text-xl">
                You&apos;re on the list.
              </p>
            </div>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={onSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                className="min-w-0 flex-1 border border-border bg-background px-5 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              />
              <Button
                type="submit"
                className="px-6"
                disabled={status.type === "submitting"}
              >
                {status.type === "submitting" ? "Submitting..." : "Notify me"}
              </Button>
            </form>
          )}

          <p
            className={`mt-4 text-sm ${
              status.type === "error" ? "text-destructive" : "text-muted-foreground"
            }`}
            aria-live="polite"
          >
            {status.type === "idle"
              ? "Unsubscribe any time."
              : status.type === "success"
                ? "We’ll keep you updated by email."
                : getStatusMessage(status, "Submitting...")}
          </p>
        </div>
      </div>
    </section>
  )
}
