import type { ReactNode } from "react"
import { ArrowLeft, Moon, Printer, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import entSpaceBlackLogo from "@/assets/ENT-SPACE-LOGO-BLACK-BACKGROUND.svg"
import entSpaceWhiteLogo from "@/assets/ENT-SPACE-LOGO-WHITE-BACKGROUND.svg"
import whitePaperMarkdown from "./entangled-space-white-paper.md?raw"
import snailFactorImage from "./snail-factor.png"

type MarkdownBlock =
  | { type: "code"; content: string }
  | { type: "heading"; depth: number; text: string }
  | { type: "hr" }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "table"; rows: string[][] }

const HEADING_PATTERN = /^(#{1,6})\s+(.+)$/
const ORDERED_LIST_PATTERN = /^\d+\.\s+(.+)$/
const UNORDERED_LIST_PATTERN = /^[-*]\s+(.+)$/
const REFERENCE_PATTERN = /^\[[^\]]+\]:/
const TABLE_ALIGNMENT_PATTERN = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/
const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\[\^[^\]]+\])/g
const HARD_BREAK_MARKER = "%%WHITE_PAPER_BREAK%%"

function getHeadingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function stripMarkdownSyntax(text: string) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\\-/g, "-")
    .replace(/\[\^([^\]]+)\]/g, "[$1]")
}

function parseInline(text: string): ReactNode[] {
  return text
    .split(INLINE_PATTERN)
    .filter(Boolean)
    .flatMap((part, index) => {
      const key = `${part}-${index}`

      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={key}>{parseInline(part.slice(2, -2))}</strong>
      }

      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={key}>{parseInline(part.slice(1, -1))}</em>
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={key}>{part.slice(1, -1)}</code>
      }

      if (part.startsWith("[^") && part.endsWith("]")) {
        return (
          <sup key={key} className="text-[0.65em]">
            {part.slice(2, -1)}
          </sup>
        )
      }

      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        return (
          <a key={key} href={linkMatch[2]} target="_blank" rel="noreferrer">
            {linkMatch[1]}
          </a>
        )
      }

      const pieces = part.replace(/\\-/g, "-").split(HARD_BREAK_MARKER)

      return pieces.flatMap((piece, pieceIndex) =>
        pieceIndex === pieces.length - 1
          ? [piece]
          : [piece, <br key={`${key}-break-${pieceIndex}`} />]
      )
    })
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => stripMarkdownSyntax(cell.trim()))
}

function getNextContentLine(lines: string[], startIndex: number) {
  for (let index = startIndex; index < lines.length; index += 1) {
    const trimmed = lines[index].trim()
    if (trimmed) return trimmed
  }

  return ""
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split(/\r?\n/)
  const blocks: MarkdownBlock[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (
      !trimmed ||
      trimmed.startsWith("![") ||
      REFERENCE_PATTERN.test(trimmed)
    ) {
      index += 1
      continue
    }

    if (trimmed === "---") {
      const nextContentLine = getNextContentLine(lines, index + 1)

      if (HEADING_PATTERN.test(nextContentLine)) {
        index += 1
        continue
      }

      blocks.push({ type: "hr" })
      index += 1
      continue
    }

    if (trimmed.startsWith("```")) {
      const codeLines: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index])
        index += 1
      }
      blocks.push({ type: "code", content: codeLines.join("\n") })
      index += 1
      continue
    }

    const headingMatch = trimmed.match(HEADING_PATTERN)
    if (headingMatch) {
      blocks.push({
        type: "heading",
        depth: headingMatch[1].length,
        text: stripMarkdownSyntax(headingMatch[2]),
      })
      index += 1
      continue
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = []
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""))
        index += 1
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") })
      continue
    }

    if (
      trimmed.includes("|") &&
      TABLE_ALIGNMENT_PATTERN.test(lines[index + 1]?.trim() ?? "")
    ) {
      const rows = [parseTableRow(trimmed)]
      index += 2
      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(parseTableRow(lines[index]))
        index += 1
      }
      blocks.push({ type: "table", rows })
      continue
    }

    const unorderedMatch = trimmed.match(UNORDERED_LIST_PATTERN)
    const orderedMatch = trimmed.match(ORDERED_LIST_PATTERN)
    if (unorderedMatch || orderedMatch) {
      const ordered = Boolean(orderedMatch)
      const items: string[] = []

      while (index < lines.length) {
        const itemLine = lines[index].trim()
        const itemPattern = ordered
          ? ORDERED_LIST_PATTERN
          : UNORDERED_LIST_PATTERN

        if (!itemLine) {
          const nextContentLine = getNextContentLine(lines, index + 1)

          if (itemPattern.test(nextContentLine)) {
            index += 1
            continue
          }

          break
        }

        const itemMatch = itemLine.match(itemPattern)

        if (!itemMatch) break
        items.push(itemMatch[1])
        index += 1
      }

      blocks.push({ type: "list", ordered, items })
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length) {
      const paragraphLine = lines[index].trim()
      const nextStartsBlock =
        !paragraphLine ||
        paragraphLine === "---" ||
        paragraphLine.startsWith("```") ||
        paragraphLine.startsWith("![") ||
        paragraphLine.startsWith(">") ||
        HEADING_PATTERN.test(paragraphLine) ||
        ORDERED_LIST_PATTERN.test(paragraphLine) ||
        UNORDERED_LIST_PATTERN.test(paragraphLine) ||
        REFERENCE_PATTERN.test(paragraphLine) ||
        (paragraphLine.includes("|") &&
          TABLE_ALIGNMENT_PATTERN.test(lines[index + 1]?.trim() ?? ""))

      if (nextStartsBlock) break
      paragraphLines.push(
        paragraphLine.endsWith("  ")
          ? `${paragraphLine.trimEnd()}${HARD_BREAK_MARKER}`
          : paragraphLine
      )
      index += 1
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") })
  }

  return blocks
}

const paperBlocks = parseMarkdown(whitePaperMarkdown)
// Skip the title and subtitle headings, which are not rendered in the article body.
const sectionLinks = paperBlocks
  .slice(2)
  .filter(
    (block): block is Extract<MarkdownBlock, { type: "heading" }> =>
      block.type === "heading" && block.depth === 2
  )
  .map((block) => ({
    id: getHeadingId(block.text),
    label: block.text.replace(/\s\\?-\s.*$/, ""),
  }))

const versionMatch = whitePaperMarkdown.match(/^\*Version\s+([^*]+)\*/m)
const versionLabel = versionMatch
  ? `Version ${versionMatch[1].replace(" — ", " · ")}`
  : null

function MarkdownRenderer({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div className="white-paper-prose">
      {blocks.map((block, index) => {
        if (block.type === "hr") {
          return <hr key={index} />
        }

        if (block.type === "heading") {
          const Tag = `h${Math.min(block.depth, 4)}` as
            | "h1"
            | "h2"
            | "h3"
            | "h4"
          return (
            <Tag
              key={index}
              id={getHeadingId(block.text)}
              className={block.depth === 2 ? "break-before-auto" : undefined}
            >
              {block.text}
            </Tag>
          )
        }

        if (block.type === "paragraph") {
          if (block.text === "Snail Factor over two years") {
            return (
              <figure key={index}>
                <img
                  src={snailFactorImage}
                  alt="Snail Factor over two years — a curve ascending from 0.10 in month 1 to 0.83 in month 7, then descending back to 0.10 in month 12, repeated across a second year"
                  className="w-full border border-border bg-background"
                  loading="lazy"
                />
                <figcaption>Snail Factor over two years</figcaption>
              </figure>
            )
          }

          return <p key={index}>{parseInline(block.text)}</p>
        }

        if (block.type === "quote") {
          return <blockquote key={index}>{parseInline(block.text)}</blockquote>
        }

        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>{block.content}</code>
            </pre>
          )
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul"
          return (
            <ListTag key={index}>
              {block.items.map((item) => (
                <li key={item}>{parseInline(item)}</li>
              ))}
            </ListTag>
          )
        }

        const [head, ...body] = block.rows
        return (
          <div
            key={index}
            className="not-prose overflow-x-auto border border-border"
          >
            <table>
              <thead>
                <tr>
                  {head.map((cell) => (
                    <th key={cell || "empty"}>{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rowIndex) => (
                  <tr key={`${row.join("-")}-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export function WhitePaperPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const headerLogo = isDark ? entSpaceBlackLogo : entSpaceWhiteLogo

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="no-print sticky top-0 z-50 border-b border-border bg-background/96 backdrop-blur supports-[backdrop-filter]:bg-background/82">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a
            href="/"
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/">
                <ArrowLeft className="size-3.5" />
                Home
              </a>
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="size-3.5" />
              Print
            </Button>
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
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0">
          <img
            src="https://herbarium.plantasia.space/image-assets/entangled-space/landing/entangled-space-formula_mid.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-45 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,244,236,0.98)_0%,rgba(247,244,236,0.94)_46%,rgba(247,244,236,0.74)_100%)] dark:bg-[linear-gradient(90deg,rgba(18,18,18,0.92)_0%,rgba(18,18,18,0.78)_46%,rgba(18,18,18,0.52)_100%)]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-28">
          <div className="max-w-4xl">
            <p className="text-[0.72rem] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              White Paper
            </p>
            <h1 className="mt-6 text-5xl leading-[0.95] font-medium tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              Entangled Space
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-foreground/88">
              A regenerative and oscillatory economy for a new music industry
              and beyond.
            </p>
            {versionLabel && (
              <p className="mt-8 text-[0.72rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                {versionLabel}
              </p>
            )}
          </div>
          <aside className="no-print hidden border-l border-border pl-6 lg:block">
            <p className="text-[0.68rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
              Sections
            </p>
            <nav className="mt-5 grid gap-2" aria-label="White paper sections">
              {sectionLinks.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      <article className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <MarkdownRenderer blocks={paperBlocks.slice(2)} />
      </article>
    </main>
  )
}
