export const introduction = [
  "The music industry went from vinyl to streaming. Plastic use dropped. But carbon emissions from storing and transmitting digital music kept rising — the footprint didn't disappear, it moved from landfill to atmosphere. The model changed. The damage didn't. It's a structural problem.",
  "Every extractive economy draws the same line: growth without return. Natural ecosystems work through cycles of exchange, return, and redistribution. A sunflower arranges its seeds in a golden spiral — each seed placed at an angle that packs them efficiently across the seed head, with room to grow and a path to fall. Less crowding. Less waste. The pattern isn't aesthetic; it's how the plant solves the problem of distributing many participants across one finite surface.",
  "Entangled Space encodes that logic into economic infrastructure: an open protocol where revenue flows between stakeholders — investors, team, creators, builders, and landscape regeneration — balanced by a cycle derived from music theory and the golden ratio.",
  "The application is universal. Music is where it starts.",
] as const

export const whatItIs = [
  {
    ordinal: "01",
    label: "Publish the specification",
    description:
      "Define and release the core protocol openly: the Snail Factor math, the creator/builder/regeneration distribution model, and the usage-based allocation rules.",
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
        "Distribution amounts per participant. The library calculates; the platform executes payment.",
    },
  },
  {
    ordinal: "03",
    label: "Launch the dashboard",
    description:
      "Create a public interface at entangled.space where anyone can observe the cycle, simulate distributions in their own context, and verify how implementations should compute.",
    goal:
      "The goal is to make the protocol transparent, testable, and understandable before and during real-world deployment. At first, the dashboard can run on simulated or test data; later, it can also display verified live implementations.",
    io: null,
  },
  {
    ordinal: "04",
    label: "Deploy in Plantasia Space",
    description:
      "Plantasia Space becomes the first live implementation of the protocol inside a working creative platform.",
    goal:
      "This step moves the protocol from public specification, library, and simulation into real economic activity. It lets us validate the logic inside a live creative ecosystem, observe how the roles behave in practice, and learn before expanding to other contexts.",
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
          "Investment input, prorated. Yearly investment enters as 1/12 per month",
      },
    ],
  },
  {
    label: "What it costs to sustain",
    items: [
      {
        symbol: "Fₜ",
        description:
          "Fixed costs. Operations, hosting, taxes, legal, salaries. Non-negotiable, not modulated by the cycle",
      },
      {
        symbol: "Vₜ × Sₜ",
        description:
          "Flexible costs modulated by the Snail Factor. Investor returns, infrastructure investment, equipment, travel, marketing, and other discretionary spend the company needs to operate but can scale up or down with the cycle",
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
          "Projects addressing the human and environmental externalities of the activity",
      },
    ],
  },
] as const

export const implementationRows = [
  {
    context: "Plantasia Space",
    creators: "Artists releasing music and interactive works",
    builders: "Developers building Orbiters, worlds, and platform tools",
    regeneration: "Environmental or landscape-regeneration projects linked to releases",
  },
  {
    context: "Documentary film",
    creators: "Directors, writers, cinematographers, editors, and core creative crew",
    builders: "Production systems, distribution tools, archives, and preservation infrastructure",
    regeneration: "Communities represented in the film, location repair, or long-term subject support",
  },
  {
    context: "Scientific research lab",
    creators: "Researchers producing the scientific work",
    builders: "Lab infrastructure, data systems, instruments, software, and peer-review tools",
    regeneration: "Open-access publication, replication funding, public education, or ecological repair connected to the research",
  },
  {
    context: "Software platform",
    creators: "Product teams creating the user-facing value",
    builders: "Infrastructure, DevOps, security, maintenance, documentation",
    regeneration: "Open-source maintenance, digital literacy, accessibility, or environmental impact mitigation",
  },
] as const

export const capitalReturnsNote = {
  heading: "Capital returns and ownership",
  paragraphs: [
    "The protocol is neutral on how a project organizes ownership. Cap tables, cooperatives, revenue-share, tokens, or no investors at all — all are compatible.",
    "Whatever mechanism a project uses to return capital to those who provided it lives in Vₜ × Sₜ, the flexible-cost term. Creators, builders, and regeneration receive their fixed shares (33%, 33%, 34%) regardless of how capital is structured. Capital is treated as a cost of operation, not as a perpetual claim on value created.",
    "Projects without investors run the protocol with Vₜ containing only operational flexible costs.",
    "Each implementation decides its own ownership model, return structure, and how individual creators or builders share their respective slices.",
  ],
} as const

export const snailFactorCopy = [
  "The engine of the protocol is a dynamic coefficient called the Snail Factor, derived from the 833 Cents Scale — a musical scale developed by Heinz Bohlen (2012), built on combination tones, that coincidentally converges on the golden ratio (1.618).",
  "Most music repeats at the octave, a 2:1 ratio. The 833 Cents Scale replaces this with the golden ratio as its repeating interval, producing a symmetrical seven-tone structure.",
  "We translate those 7 tones into an economic cycle of 12 steps — ascending and descending without repeating the turning points — spanning one calendar year.",
] as const

export const founderProfile = {
  name: "Bruna Guarnieri Colasso",
  bio: [
    "Engineer, artist, and musician. 20+ years designing immersive sound experiences across three continents. Co-founder, designer, and developer of Plantasia Space. Founder of Maar.World, an independent record label developing new formats that merge physical and digital releases, music listening and making. Work shown at the Venice Biennale, Expo Milan, and London Fashion Week. Orbits and Bodies (with Gabriel Vigliensoni) premiered at IRCAM in 2025.",
  ],
} as const
