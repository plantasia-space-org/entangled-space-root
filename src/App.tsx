import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import entSpaceBlackLogo from "@/assets/ENT-SPACE-LOGO-BLACK-BACKGROUND.svg"
import entSpaceWhiteLogo from "@/assets/ENT-SPACE-LOGO-WHITE-BACKGROUND.svg"
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
  capitalReturnsNote,
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

const navigationSections = [
  { id: "thesis", label: "Thesis" },
  { id: "snail-factor", label: "Snail Factor" },
  { id: "protocol", label: "Protocol" },
  { id: "roadmap", label: "Roadmap" },
  { id: "author", label: "Author" },
  { id: "discover", label: "Discover" },
] as const

type NavigationSectionId = (typeof navigationSections)[number]["id"]

const navigationSectionIds = new Set<string>(
  navigationSections.map(({ id }) => id)
)

export function App() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const headerLogo = isDark ? entSpaceBlackLogo : entSpaceWhiteLogo
  const [activeSnailStep, setActiveSnailStep] = useState(0)
  const [isSnailDrawerOpen, setIsSnailDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<NavigationSectionId>(
    navigationSections[0].id
  )
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistStatus, setWaitlistStatus] = useState<FormStatus>({
    type: "idle",
  })
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [contactStatus, setContactStatus] = useState<FormStatus>({
    type: "idle",
  })

  useEffect(() => {
    const sectionElements = navigationSections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const mostVisibleEntry = visibleEntries[0]

        const nextSectionId = mostVisibleEntry?.target.id

        if (nextSectionId && navigationSectionIds.has(nextSectionId)) {
          setActiveSection(nextSectionId as NavigationSectionId)
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.08, 0.18, 0.32, 0.48],
      }
    )

    sectionElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMobileNavOpen) return

    const closeOnHashChange = () => setIsMobileNavOpen(false)
    window.addEventListener("hashchange", closeOnHashChange)

    return () => window.removeEventListener("hashchange", closeOnHashChange)
  }, [isMobileNavOpen])

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
        message:
          error instanceof Error ? error.message : "Unable to submit form",
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
        message:
          error instanceof Error ? error.message : "Unable to submit form",
      })
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background pb-24 text-foreground sm:pb-28">
        <header className="sticky top-0 z-50 border-b border-border bg-background/96 backdrop-blur supports-[backdrop-filter]:bg-background/82">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-6 py-4 sm:px-8">
            <a
              href="#home"
              className="flex items-center gap-3 transition-opacity hover:opacity-75"
              aria-label="Entangled Space home"
            >
              <img
                src={headerLogo}
                alt=""
                className="size-7 rounded-[4px] border border-border"
                aria-hidden="true"
              />
              <span className="text-[0.7rem] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                Entangled Space
              </span>
            </a>
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Primary navigation"
            >
              {navigationSections.map(({ id, label }) => {
                const isActive = activeSection === id

                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`px-2.5 py-2 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {label}
                  </a>
                )
              })}
            </nav>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Toggle theme"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="lg:hidden"
                aria-label={
                  isMobileNavOpen ? "Close navigation" : "Open navigation"
                }
                aria-expanded={isMobileNavOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsMobileNavOpen((open) => !open)}
              >
                {isMobileNavOpen ? (
                  <X className="size-4" />
                ) : (
                  <Menu className="size-4" />
                )}
              </Button>
            </div>
          </div>
          {isMobileNavOpen && (
            <nav
              id="mobile-navigation"
              className="border-t border-border bg-white lg:hidden dark:bg-background"
              aria-label="Primary navigation"
            >
              <div className="mx-auto grid w-full max-w-6xl grid-cols-2 px-6 sm:px-8">
                {navigationSections.map(({ id, label }) => {
                  const isActive = activeSection === id

                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`border-b border-border bg-white px-4 py-3 text-sm font-medium odd:border-r dark:bg-background ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      {label}
                    </a>
                  )
                })}
              </div>
            </nav>
          )}
        </header>
        <HeroSection />
        <OpeningThesisSection paragraphs={introduction} />
        <SnailFactorIntroSection paragraphs={snailFactorCopy} />
        <SnailVisualizationSection
          activeStep={activeSnailStep}
          onExplore={() => setIsSnailDrawerOpen(true)}
        />
        <ProtocolSection
          formulaBreakdown={formulaBreakdown}
          implementationRows={implementationRows}
          capitalReturnsNote={capitalReturnsNote}
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
      <SnailKeyboardSection
        open={isSnailDrawerOpen}
        onOpenChange={setIsSnailDrawerOpen}
        onStepChange={setActiveSnailStep}
      />
    </>
  )
}

export default App
