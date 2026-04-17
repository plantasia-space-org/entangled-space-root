import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type { FormStatus } from "@/features/landing/forms"
import { getStatusMessage } from "@/features/landing/forms"

type ContactDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  email: string
  message: string
  status: FormStatus
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onMessageChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function ContactDialog({
  open,
  onOpenChange,
  name,
  email,
  message,
  status,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onSubmit,
}: ContactDialogProps) {
  const isSuccess = status.type === "success"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] p-6 sm:max-w-xl sm:p-8">
        <DialogHeader className="gap-3">
          <p className="text-[0.68rem] font-medium tracking-[0.24em] text-muted-foreground uppercase">
            Contact
          </p>
          <DialogTitle className="text-2xl tracking-[-0.03em] text-foreground sm:text-3xl">
            {isSuccess ? "Message sent" : "Start a conversation"}
          </DialogTitle>
          <DialogDescription className="max-w-md text-sm leading-7 sm:text-base">
            {isSuccess
              ? "Thanks. We’ll continue by email if a reply is needed."
              : "Send a message about the protocol, the research, or a possible implementation."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="mt-2 space-y-5 border border-border bg-muted/35 p-5 sm:p-6">
            <p className="text-base leading-8 text-foreground sm:text-lg">
              {getStatusMessage(status, "Your message was received.")}
            </p>
            <div className="flex justify-end">
              <Button
                type="button"
                className="min-h-11 px-6 sm:min-h-9"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form className="mt-2 space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="text-[0.68rem] font-medium tracking-[0.2em] text-muted-foreground uppercase"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="text-[0.68rem] font-medium tracking-[0.2em] text-muted-foreground uppercase"
              >
                Mail
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-[0.68rem] font-medium tracking-[0.2em] text-muted-foreground uppercase"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={message}
                onChange={(event) => onMessageChange(event.target.value)}
                className="w-full resize-y border border-border bg-background px-4 py-3 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className={`text-sm ${
                  status.type === "error"
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
                aria-live="polite"
              >
                {status.type === "error"
                  ? getStatusMessage(status, "")
                  : status.type === "submitting"
                    ? "Sending..."
                    : ""}
              </p>
              <Button
                type="submit"
                className="min-h-11 w-full px-6 sm:min-h-9 sm:w-auto"
                disabled={status.type === "submitting"}
              >
                {status.type === "submitting" ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
