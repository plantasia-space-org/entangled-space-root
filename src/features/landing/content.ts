export const introduction = [
  "The music industry moved from vinyl to streaming. Plastic use declined, but the energy required to store and transmit digital media continued to grow. The footprint did not disappear; it shifted from physical waste toward invisible infrastructure. The model changed. The extraction remained structural.",
  "Most economic systems are optimized for accumulation without built-in mechanisms of return. Natural ecosystems operate differently: through cycles of exchange, redistribution, decay, and renewal.",
  "Entangled Space draws inspiration from these recursive patterns to explore alternative forms of economic coordination: an open protocol where revenue flows between stakeholders — investors, team, creators, builders, and landscape regeneration — modulated through a cyclical system informed by music theory.",
  "Music is where the experiment begins.",
] as const

export const whatItIs = [
  {
    ordinal: "01",
    label: "Publish the specification",
    description:
      "Define and release the core protocol openly: the Snail Factor math, the creator/builder/regeneration distribution model, and the usage-based allocation rules.",
    goal: "The goal is to make the system clear, auditable, and easy for others to understand, question, and build on.",
    io: null,
  },
  {
    ordinal: "02",
    label: "Build the library",
    description:
      "Develop an open-source package that any platform can integrate.",
    goal: "The goal is to make the protocol usable in practice across different platforms and payment systems.",
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
    goal: "The goal is to make the protocol transparent, testable, and understandable before and during real-world deployment. At first, the dashboard can run on simulated or test data; later, it can also display verified live implementations.",
    io: null,
  },
  {
    ordinal: "04",
    label: "Deploy in Plantasia Space",
    description:
      "Plantasia Space becomes the first live implementation of the protocol inside a working creative platform.",
    goal: "This step moves the protocol from public specification, library, and simulation into real economic activity. It lets us validate the logic inside a live creative ecosystem, observe how the roles behave in practice, and learn before expanding to other contexts.",
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
          "Flexible costs modulated by the Snail Factor. Capital returns to owners & investors, infrastructure investment, equipment, travel, marketing, reserves, R&D, and other discretionary spend the implementation can scale up or down with the cycle",
      },
    ],
  },
  {
    label: "What flows out",
    items: [
      {
        symbol: "Dₜ",
        description:
          "Distributable surplus — what remains after all costs are covered. Non-negative: if costs exceed revenue, no distribution occurs that period.",
      },
      {
        symbol: "0.33 × Dₜ → Creators",
        description: "Whoever produces the primary value",
      },
      {
        symbol: "0.33 × Dₜ → Builders",
        description: "Whoever builds and maintains the tools and systems",
      },
      {
        symbol: "0.34 × Dₜ → Regeneration",
        description:
          "Projects addressing the human and environmental externalities of the activity. One third cannot be expressed exactly in two decimal places — the rounding residual goes to Regeneration.",
      },
    ],
  },
] as const

export const implementationRows = [
  {
    context: "Plantasia Space",
    creators: "Artists releasing music and interactive works",
    builders: "Tool developers building worlds and platform infrastructure",
    regeneration:
      "Landscape regeneration partners chosen by each artist at release — connecting the music to a place that needs it",
  },
  {
    context: "Documentary film",
    creators:
      "Directors, writers, cinematographers, editors, and core creative crew",
    builders:
      "Production systems, distribution tools, archives, and preservation infrastructure",
    regeneration:
      "Communities and places whose stories the work carries, especially those without other means of telling them",
  },
  {
    context: "Research lab",
    creators: "Researchers producing the scientific work",
    builders:
      "Lab infrastructure, data systems, instruments, software, and peer-review tools",
    regeneration:
      "Open access for researchers in developing regions; community health and public education",
  },
  {
    context: "Software platform",
    creators: "Product teams creating the user-facing value",
    builders: "Infrastructure, DevOps, security, maintenance, documentation",
    regeneration:
      "Digital literacy and accessibility for under-served communities; ecosystem regeneration in the territories hosting the compute",
  },
  {
    context: "Food cooperative",
    creators: "Farmers and growers",
    builders: "Distribution and logistics networks",
    regeneration:
      "Food access for under-served communities and land-stewardship programs in producing regions",
  },
  {
    context: "Artisan workshop",
    creators: "Makers and craftspeople",
    builders: "Supply chain and workshop operators",
    regeneration:
      "Livelihoods and craft traditions in source-material communities",
  },
  {
    context: "Conference",
    creators: "Speakers and contributors",
    builders: "Organisers, venue and platform teams",
    regeneration:
      "Inclusion of contributors from developing countries and underrepresented backgrounds — travel, accommodation, access",
  },
  {
    context: "AI service",
    creators: "Authors and data contributors whose work trains the model",
    builders: "ML engineers and infrastructure operators",
    regeneration:
      "Energy, water and ecosystem restoration in the territories hosting the compute",
  },
] as const

export const capitalReturnsNote = {
  heading: "Capital returns and ownership",
  paragraphs: [
    "The protocol is neutral on how a project organizes ownership. Cap tables, cooperatives, revenue-share, tokens, or no investors at all — all are compatible.",
    "Whatever mechanism a project uses to return capital to those who provided it lives in Vₜ × Sₜ, the flexible-cost term. Creators, builders, and regeneration receive their fixed shares (33%, 33%, 34%) regardless of how capital is structured.",
    "Projects without investors run the protocol with Vₜ containing only operational flexible costs.",
    "Each implementation decides its own ownership model, return structure, and how individual creators or builders share their respective slices.",
  ],
} as const

export const snailFactorCopy = [
  "The Snail Factor is not a decorative modulation, but a structural application of recursive proportional systems. Inspired by Benoit Mandelbrot’s work on fractals and self-similar patterns in natural and financial systems, we use a musical derivation: the 833 Cents Scale.",
  "Music theory offers one of humanity’s longest-standing mathematical frameworks for studying proportional relationships as they unfold through time. By encoding these recursive ratios into the protocol, the system moves away from the binary logic of perpetual growth or collapse, toward a model of oscillation, adaptation, and redistribution.",
  "The scale’s 7 tones are translated into a 12-step economic cycle — 1 2 3 4 5 6 7 6 5 4 3 2, ascending and descending without repeating the turning points — spanning one calendar year to modulate the protocol’s flexible costs.",
] as const

export const founderProfile = {
  name: "Bruna Guarnieri Colasso",
  bio: [
    "Engineer, artist, and musician. 20+ years designing immersive sound experiences across three continents. Co-founder, designer, and developer of Plantasia Space. Founder of Maar.World, an independent record label developing new formats that merge physical and digital releases, music listening and making. Work shown at the Venice Biennale, Expo Milan, and London Fashion Week. Orbits and Bodies (with Gabriel Vigliensoni) premiered at IRCAM in 2025.",
    "Entangled Space also grows out of years of work with complex systems — building with agent-based models in NetLogo to study collective motion, self-organization, and the transition between order and disorder, then translating those models into sound and music. That practice became a theory, and the theory became a protocol: rather than simulating a complex system, Entangled Space is designed as one, where value moves through recursive, proportional cycles.",
  ],
} as const
