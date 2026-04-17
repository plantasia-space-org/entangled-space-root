import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Infinity as InfinityIcon, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { ContactDialog } from "@/features/landing/contact-dialog"
import { FooterLinksSection } from "@/features/landing/footer-links-section"
import { HeroSection } from "@/features/landing/hero-section"
import { OpeningThesisSection } from "@/features/landing/opening-thesis-section"
import { ProtocolSection } from "@/features/landing/protocol-section"
import { ResearchDevelopmentSection } from "@/features/landing/research-development-section"
import { SnailFactorIntroSection } from "@/features/landing/snail-factor-intro-section"
import { WaitlistSection } from "@/features/landing/waitlist-section"
import { WhatItIsSection } from "@/features/landing/what-it-is-section"
import {
  founderProfile,
  formulaBreakdown,
  implementationRows,
  introduction,
  snailFactorCopy,
  whatItIs,
} from "@/features/landing/content"
import {
  emailPattern,
  postFormJson,
  type FormStatus,
} from "@/features/landing/forms"
import { SnailKeyboardSection } from "@/features/snail-synth/snail-keyboard-section"
import { SnailVisualizationSection } from "@/features/snail-visualization/snail-visualization-section"

export function App() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [activeSnailStep, setActiveSnailStep] = useState(0)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistStatus, setWaitlistStatus] = useState<FormStatus>({ type: "idle" })
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [contactStatus, setContactStatus] = useState<FormStatus>({ type: "idle" })

  useEffect(() => {
    const syncContactDialog = () => {
      const params = new URLSearchParams(window.location.search)
      const contactValue = params.get("contact")
      const shouldOpen =
        contactValue === "" ||
        contactValue === "1" ||
        contactValue === "true" ||
        contactValue === "open"

      setIsContactOpen(shouldOpen)
    }

    syncContactDialog()
    window.addEventListener("popstate", syncContactDialog)

    return () => window.removeEventListener("popstate", syncContactDialog)
  }, [])

  const setContactOpen = (open: boolean) => {
    setIsContactOpen(open)

    const params = new URLSearchParams(window.location.search)

    if (open) {
      params.set("contact", "1")
    } else {
      params.delete("contact")
    }

    const query = params.toString()
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`
    window.history.replaceState({}, "", nextUrl)
  }

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = waitlistEmail.trim()

    if (!emailPattern.test(email)) {
      setWaitlistStatus({
        type: "error",
        message: "Please enter a valid email address.",
      })
      return
    }

    setWaitlistStatus({ type: "submitting" })

    try {
      await postFormJson("/submit-waiting-list", {
        locale: "en",
        source: {
          app: "entangled-space-web",
          route: "/en/waiting-list",
        },
        contact: {
          email,
        },
      })

      setWaitlistEmail("")
      setWaitlistStatus({
        type: "success",
        message: "You’re on the list.",
      })
    } catch (error) {
      setWaitlistStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to submit form",
      })
    }
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = contactName.trim()
    const email = contactEmail.trim()
    const message = contactMessage.trim()

    if (!name) {
      setContactStatus({ type: "error", message: "Name is required." })
      return
    }

    if (!emailPattern.test(email)) {
      setContactStatus({
        type: "error",
        message: "Please enter a valid email address.",
      })
      return
    }

    if (!message) {
      setContactStatus({ type: "error", message: "Message is required." })
      return
    }

    setContactStatus({ type: "submitting" })

    try {
      await postFormJson("/submit-contact-form", {
        locale: "en",
        source: {
          app: "entangled-space-web",
          route: "/en/contact",
        },
        contact: {
          name,
          email,
        },
        form: {
          message,
        },
      })

      setContactName("")
      setContactEmail("")
      setContactMessage("")
      setContactStatus({
        type: "success",
        message: "Message received.",
      })
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to submit form",
      })
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background pb-24 text-foreground sm:pb-28">
        <header className="border-b border-border bg-background">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <InfinityIcon
                className="size-4 text-foreground"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Entangled Space
              </span>
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </header>
        <HeroSection />
        <OpeningThesisSection paragraphs={introduction} />
        <SnailFactorIntroSection paragraphs={snailFactorCopy} />
        <SnailVisualizationSection activeStep={activeSnailStep} />
        <ProtocolSection
          formulaBreakdown={formulaBreakdown}
          implementationRows={implementationRows}
        />
        <WhatItIsSection items={whatItIs} />
        <ResearchDevelopmentSection founderProfile={founderProfile} />
        <WaitlistSection
          email={waitlistEmail}
          status={waitlistStatus}
          onEmailChange={(value) => {
            setWaitlistEmail(value)
            if (waitlistStatus.type !== "idle") {
              setWaitlistStatus({ type: "idle" })
            }
          }}
          onSubmit={handleWaitlistSubmit}
        />
        <FooterLinksSection onContactClick={() => setContactOpen(true)} />
      </main>
      <ContactDialog
        open={isContactOpen}
        onOpenChange={setContactOpen}
        name={contactName}
        email={contactEmail}
        message={contactMessage}
        status={contactStatus}
        onNameChange={(value) => {
          setContactName(value)
          if (contactStatus.type !== "idle") {
            setContactStatus({ type: "idle" })
          }
        }}
        onEmailChange={(value) => {
          setContactEmail(value)
          if (contactStatus.type !== "idle") {
            setContactStatus({ type: "idle" })
          }
        }}
        onMessageChange={(value) => {
          setContactMessage(value)
          if (contactStatus.type !== "idle") {
            setContactStatus({ type: "idle" })
          }
        }}
        onSubmit={handleContactSubmit}
      />
      <SnailKeyboardSection onStepChange={setActiveSnailStep} />
    </>
  )
}

export default App
