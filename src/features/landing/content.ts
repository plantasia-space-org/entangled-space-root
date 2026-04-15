export const introduction = [
  "Every extractive economy draws a line, growth without return.",
  "Natural systems work differently. Seasons expand and contract. Forests breathe. Tides rise and fall. There are times for planting and times for harvesting.",
  "Entangled Space encodes this rhythm into economic infrastructure. An open protocol where revenue does not just flow out, it cycles through creators, builders, and regeneration on a pattern derived from a musical tuning system based on the golden ratio.",
  "Golden ratio math to music and music to economics. The application is universal.",
] as const

export const whatItIs = [
  {
    ordinal: "01",
    label: "A specification",
    description:
      "The Snail Factor math, the three-role distribution, usage-based allocation rules. Published, open, auditable.",
    io: null,
  },
  {
    ordinal: "02",
    label: "A library",
    description: "An open-source package any platform can integrate.",
    io: {
      input: "Revenue, costs, usage data, current date",
      output: "Distribution amounts per participant. You choose how to pay.",
    },
  },
  {
    ordinal: "03",
    label: "A dashboard",
    description:
      "A public interface at entangled.space to see the cycle in motion, simulate distributions for your own context, and verify any implementation is computing correctly.",
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
  "The engine of the protocol is a dynamic coefficient called the Snail Alpha Factor, derived from the 833 Cents Scale, a tuning system developed by Heinz Bohlen (2012), built on combination tones, which coincidentally converges on the golden ratio (1.618).",
  "Most music repeats at the octave, a 2:1 ratio. The 833 Cents Scale replaces this with the golden ratio as its repeating interval, producing a symmetrical seven-tone structure.",
  "We translate those 7 steps into an economic cycle: 13 steps of ascent and return spanning ~637 days. The full system breathes.",
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
