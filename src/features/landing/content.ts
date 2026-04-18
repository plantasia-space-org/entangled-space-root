export const introduction = [
  "Every extractive economy acts as if resources are infinite, generating social inequality and serious environmental damage.",
  "Natural ecosystems work differently. They expand and contract in balanced cycles. Beyond complexity, there is equilibrium. Forests breathe. Tides rise and fall.",
  "Entangled Space encodes one of those rhythms into economic infrastructure — an open protocol where revenue flows between investors, team, creators, builders, and regeneration — balanced by a cycle derived from music theory.",
] as const

export const whatItIs = [
  {
    ordinal: "01",
    label: "Publish the specification",
    description:
      "Define and release the core protocol openly: the Snail Factor math, the three-role distribution model, and the usage-based allocation rules.",
    goal:
      "The goal is to make the system clear, auditable, and easy for others to understand, question, and build on.",
    io: null,
  },
  {
    ordinal: "02",
    label: "Build the library",
    description: "Develop an open-source package that any platform can integrate.",
    goal:
      "The goal is to make the protocol usable in practice across different platforms and payment systems.",
    io: {
      input: "Revenue, costs, usage data, current date",
      output:
        "Distribution amounts per participant, independent of how payment is executed",
    },
  },
  {
    ordinal: "03",
    label: "Integrate the first use case",
    description:
      "Implement the protocol in Plantasia Space as the first real integration and proof of concept.",
    goal:
      "This step turns the protocol from a specification and library into a working system inside a live platform. It allows us to validate the logic in practice, test the model in a concrete environment, and learn from a real creative ecosystem before expanding further.",
    io: null,
  },
  {
    ordinal: "04",
    label: "Launch the dashboard",
    description:
      "Create a public interface at entangled.space where people can observe the cycle in motion, simulate distributions in their own context, and verify that implementations are computing correctly.",
    goal:
      "The goal is to make the protocol transparent, testable, and legible beyond the code itself.",
    io: null,
  },
] as const

export const formulaBreakdown = [
  {
    label: "What comes in",
    items: [
      { symbol: "Rₜ", description: "Revenue for this period" },
      {
        symbol: "Iₜ",
        description:
          "Investment input, prorated — yearly investment enters as 1/12 per month",
      },
    ],
  },
  {
    label: "What it costs to sustain",
    items: [
      {
        symbol: "Fₜ",
        description:
          "Fixed costs — operations, hosting, taxes, legal. Non-negotiable, not modulated by the cycle",
      },
      {
        symbol: "Vₜ × Snailsₜ",
        description:
          "Variable costs — salaries, investor returns, anything defined as flexible. These breathe with the cycle",
      },
    ],
  },
  {
    label: "What flows out",
    items: [
      { symbol: "Creators × 0.33", description: "Whoever produces the primary value" },
      {
        symbol: "Builders × 0.33",
        description: "Whoever builds and maintains the tools and systems",
      },
      {
        symbol: "Regeneration × 0.34",
        description:
          "Projects dedicated to human and planetary wellbeing, linked to the activity",
      },
    ],
  },
] as const

export const implementationRows = [
  {
    context: "Plantasia Space (music)",
    creators: "Artists",
    builders: "Orbiter & tool developers",
    regeneration: "Environmental projects linked to releases",
  },
  {
    context: "Food cooperative",
    creators: "Farmers",
    builders: "Distribution & logistics networks",
    regeneration: "Soil restoration, biodiversity programs",
  },
  {
    context: "Research collective",
    creators: "Researchers",
    builders: "Lab maintainers & toolmakers",
    regeneration: "Community health, public education",
  },
  {
    context: "Artisan workshop",
    creators: "Makers & craftspeople",
    builders: "Supply chain & workshop operators",
    regeneration: "Local material sourcing, waste reduction",
  },
] as const

export const snailFactorCopy = [
  "The engine of the protocol is a dynamic coefficient called the Snail Factor, derived from the 833 Cents Scale — a musical scale developed by Heinz Bohlen (2012), built on combination tones, that coincidentally converges on the golden ratio (1.618).",
  "Most music repeats at the octave, a 2:1 ratio. The 833 Cents Scale replaces this with the golden ratio as its repeating interval, producing a symmetrical seven-tone structure.",
  "We translate those 7 steps into an economic cycle: 12 steps of ascent and return spanning ~637 days. The full system breathes.",
] as const

export const founderProfile = {
  name: "Bruna Guarnieri Colasso",
  bio: [
    "Engineer and artist, 25 years in music across 3 continents.",
    "70+ products shipped. 7 international awards. Venice Biennale, IRCAM.",
    "Creator of ENT Cards (blockchain-physical album format). Founder of Maar.World.",
    "Coufounded, Designed and Developed Plantasia Space.",
  ],
} as const
