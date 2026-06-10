# Entangled Space

## A Regenerative and Oscillatory Economy for a New Music Industry and Beyond.

*Version 0.3 — June 2026*

Bruna Guarnieri∗  
Plantasia.space  
Tenerife, Spain  
bruna@plantasia.space

**Abstract:** Entangled Space is an open protocol for regenerative economies. It defines how revenue flows between stakeholders — creators, builders, and projects regenerating the wider human and ecological context the activity inhabits — modulated by a cycle derived from music theory and the golden ratio. This paper documents the structural problem the protocol addresses, the mathematical foundation of its distribution model, and the formula that implements it. Plantasia Space will be its first live implementation.

---

## Executive Summary

The music industry's carbon footprint did not disappear with digitization — it moved from landfill to atmosphere, and then distributed itself across the hardware in people's pockets, the data centres running the platforms, and the touring economy that low streaming margins made inescapable. The problem is structural: an economy optimized for distribution at scale, without a mechanism for accounting for or redistributing its true costs.

Entangled Space is an open protocol designed to address that structure. It defines a formula for distributing revenue among the three parties whose participation makes any creative economy function — creators, builders, and regeneration — modulated by a temporal cycle derived from music theory and the golden ratio. 

The protocol is open, infrastructure-agnostic, and designed to be adopted by any platform. Plantasia Space is its first live deployment. This paper documents the problem, the model, why it runs on a cycle, and the implementation path.

> *This document describes a protocol specification. It does not constitute a financial product, investment offer, or legal commitment of any kind. Implementations must define their own legal and governance frameworks.*

---

## Problem Statement \- Motive of the Innovation:

The music industry’s transition from physical formats to digital streaming was often presented as an environmental improvement.[^2] Physical music plastic waste did fall sharply — from approximately 58 million kilograms at its peak to around 8 million kilograms by 2016 as streaming took over. But the assumption that dematerialization meant decarbonization has not held — and the physical format is not gone. Vinyl sales have grown for nineteen consecutive years. The first ISO-compliant lifecycle analysis of the vinyl supply chain, published jointly by the Vinyl Record Manufacturers Association and the Vinyl Alliance in 2024, found that a standard 140g record carries approximately 1.15 kg CO₂e cradle to factory gate — rising to between 2.5 and 4.6 kg CO₂e once logistics are included, with air freight alone exceeding the manufacturing footprint.[^3]

Research by Devine and Brennan (University of Glasgow / University of Oslo, 2019) found that by 2016, storing and transmitting digital music in the United States alone generated an estimated 200–350 million kg of CO₂ equivalents — a figure higher than at any previous point in the physical format era, including the CD peak of approximately 157 million kg in 2000. The footprint did not disappear. It moved from landfill to atmosphere.

The picture has grown more complex since. A 2024 initiative by France’s Centre national de la musique (CNM) and industry partners — the most comprehensive recent whole-sector estimate available — measured the French recorded music sector at approximately 2,780 kilotonnes CO₂e in 2022, across production, distribution, and listening. The same report warned that emissions could triple by 2030 under continued growth and rising audio quality assumptions.

Critically, that analysis found that the largest share of the sector’s footprint — 51% — comes not from data centres or streaming servers, but from the manufacture and end-of-life disposal of the devices people use to listen. Digital distribution accounts for 22%, and use-phase energy for 23%. The environmental cost is distributed across hardware supply chains and household electricity, not concentrated in a single visible source. A peer-reviewed lifecycle analysis of music player devices (Alejandre et al., 2023) gives this a concrete unit: one hour of music listening on a smartphone generates approximately 2.58 g CO₂e; on a smart TV, 8.18 g CO₂e.[^4] A BBC Research & Development study of UK radio services independently found that consumer devices accounted for 73.4–81% of total system energy — corroborating the French figure from a different national baseline and methodology.[^5]

At infrastructure scale, the International Energy Agency (IEA) estimates that global data centres consumed approximately 415 TWh of electricity in 2024 — about 1.5% of global electricity demand — and could reach 945 TWh by 2030.[^6] Music streaming is part of that load, though no public source currently isolates music’s global share with sufficient confidence to quote as a standalone figure.

The structure of streaming economics amplifies these effects beyond infrastructure. With per-stream payments averaging a fraction of a cent, most artists remain economically dependent on live touring. An MIT Climate Machine assessment (published 2025, using 2023 data) estimated that live music generated 14.3 million metric tons CO₂e in the United States alone — with fan travel accounting for 62% of that total.[^7] The same low-margin streaming economy that concentrates emissions in consumer hardware also drives the touring dependency that produces a separate, largely untracked emissions category.

Corporate disclosure remains limited. Spotify reported total greenhouse gas emissions of 195,027 metric tons CO₂e for 2024 — but its reporting explicitly excluded Category 11 (use of sold products), meaning the energy consumed by user devices was absent by design, not oversight. Neither Apple Music nor YouTube Music publishes service-level footprint figures. What the available numbers reveal is not the full cost of music streaming — it is the portion that companies choose to account for.

This is not a technology problem or a platform problem. It is a structural problem: an economy optimized for distribution at scale, without a mechanism for accounting for or redistributing its true costs.

## Entangled Space

Most economic systems are optimized for accumulation without built-in mechanisms of return. Natural ecosystems operate differently: through cycles of exchange, redistribution, decay, and renewal.

Entangled Space draws inspiration from these recursive patterns to explore alternative forms of economic coordination: an open protocol where revenue flows between stakeholders — investors, team, creators, builders, and landscape regeneration — modulated through a cyclical system informed by music theory and the Golden Ratio.

Music Industry is where the experiment begins.

A platform could change its payment terms. A cooperative could choose its members. A policy could mandate disclosure. None of these change the underlying logic: value flows to whoever controls distribution. A protocol is different. It embeds the distribution logic at the infrastructure layer — open, auditable, and independent of any single platform's incentives. Any implementation that adopts the protocol inherits its distribution structure. The math does not change based on who runs the system.

Entangled Space draws from an existing lineage of work on this problem. Elinor Ostrom's research on commons governance identified the design principles that allow shared resources to be managed sustainably — without privatisation or state control — by the communities that depend on them.[^8] Platform cooperativism, developed by Trebor Scholz and others, applied that logic to digital platforms, arguing for structural alternatives to the extractive corporate model.[^9] Kate Raworth's doughnut economics established the social and ecological boundaries within which any genuinely regenerative economy must operate.[^10] Entangled Space is not a cooperative and does not prescribe an ownership model. It works at the layer beneath ownership — encoding distribution rules into infrastructure so that any implementation, whatever its governance structure, inherits the same shape of value flow.

## The Snail Factor

The Snail Factor is the part of the protocol that gives the economy its rhythm. Benoit Mandelbrot observed that natural and financial systems often repeat the same patterns at different scales; Entangled Space borrows that idea and uses a cyclical curve based on the Golden Ratio ($\phi$). We take the curve from music — the 833 Cents Scale — because music is one of humanity’s oldest tools for studying proportion as it unfolds in time. The result: instead of the binary of endless growth or collapse, the system oscillates — it grows, rests, redistributes, and adapts.

**The 833 Cents Scale[^1]** is a musical tuning system developed by Heinz Bohlen (2012). Most music repeats at the octave — a 2:1 ratio. Bohlen's scale replaces this with the golden ratio (1.618034) as its repeating interval, producing a symmetrical seven-tone structure built on combination tones.

The Snail Factor translates those seven tones into an economic modulation cycle: one calendar year, twelve steps, ascending from 0.10 to 0.83 and descending back.

## Selected Scale: Snail Factor Cycle

The selected scale defines a yearly cycle structured as a repeating pattern of **ascent, peak, descent, and return**.

Each of the 12 main steps corresponds to one calendar month. One full cycle spans one year, and the table below shows the pattern across two years.

The cents values come from the 833 Cents Scale. Since cents are already logarithmic, we use them directly as a perceptual modulation curve.

To create the **Snail Alpha Factor**, each cents value is divided by 1000:

```text
snail = cents / 1000
```

This maps the scale into a soft 0-1 modulation range without forcing full normalization. The result is a factor between 0.10 and 0.83, preserving the perceived interval structure of the scale while keeping the cycle active across all months.

The Snail Alpha Factor is not a final distribution percentage. It is a monthly coefficient that will later appear in the formula as **Sₜ** — the harmonic value that controls how strongly the flexible layer of the system expands or contracts.

| Step (just) | Month | Cents (just) | Step (36/octave) | Cents (36/octave) | Snail Alpha Factor |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 1.00 | 1.00 | 99.27 | 3 | 100.00 | 0.10 |
| 2.00 | 2.00 | 235.77 | 7 | 233.33 | 0.23 |
| 3.00 | 3.00 | 366.91 | 11 | 366.67 | 0.37 |
| 4.00 | 4.00 | 466.18 | 14 | 466.67 | 0.47 |
| 5.00 | 5.00 | 597.32 | 18 | 600.00 | 0.60 |
| 6.00 | 6.00 | 733.82 | 22 | 733.33 | 0.73 |
| 7.00 | 7.00 | 833.09 | 25 | 833.33 | 0.83 |
| 8.00 | 8.00 | 733.82 | 22 | 733.33 | 0.73 |
| 9.00 | 9.00 | 597.32 | 18 | 600.00 | 0.60 |
| 10.00 | 10.00 | 466.18 | 14 | 466.67 | 0.47 |
| 11.00 | 11.00 | 366.91 | 11 | 366.67 | 0.37 |
| 12.00 | 12.00 | 235.77 | 7 | 233.33 | 0.23 |
| 13.00 | 13.00 | 99.27 | 3 | 100.00 | 0.10 |
| 14.00 | 14.00 | 235.77 | 7 | 233.33 | 0.23 |
| 15.00 | 15.00 | 366.91 | 11 | 366.67 | 0.37 |
| 16.00 | 16.00 | 466.18 | 14 | 466.67 | 0.47 |
| 17.00 | 17.00 | 597.32 | 18 | 600.00 | 0.60 |
| 18.00 | 18.00 | 733.82 | 22 | 733.33 | 0.73 |
| 19.00 | 19.00 | 833.09 | 25 | 833.33 | 0.83 |
| 20.00 | 20.00 | 733.82 | 22 | 733.33 | 0.73 |
| 21.00 | 21.00 | 597.32 | 18 | 600.00 | 0.60 |
| 22.00 | 22.00 | 466.18 | 14 | 466.67 | 0.47 |
| 23.00 | 23.00 | 366.91 | 11 | 366.67 | 0.37 |
| 24.00 | 24.00 | 235.77 | 7 | 233.33 | 0.23 |

![Snail Factor over two years — a curve ascending from 0.10 in month 1 to 0.83 in month 7, then descending back to 0.10 in month 12, repeated across a second year][image1]

*Snail Factor over two years*

The curve expands from 0.10 to 0.83, then contracts back down. This creates a breathing cycle: growth, peak, decrease, and return.

---

## From Snail Factor to the Formula

The Snail Alpha Factor is not only a visual or symbolic curve. In the economic model, each monthly value becomes **Sₜ**, the Snail Factor used inside the formula.

```text
Sₜ = cents / 1000
```

This gives each month a soft modulation value between 0.10 and 0.83.

This value is not used as a direct payout percentage. Inside the economic formula, **Sₜ** is used as a monthly coefficient that modulates only the flexible layer of the system:

```text
Vₜ × Sₜ
```

Here **Vₜ** is the flexible cost term — the share of monthly spend the implementation defines as adjustable (investor returns, infrastructure investment, travel, marketing, and other discretionary outlays). Multiplying it by Sₜ is what allows that layer to breathe with the cycle while fixed costs stay protected. The full formula and remaining variables are introduced in the next section.

This keeps the logic simple:

* fixed costs stay protected
* flexible costs breathe with the cycle
* remaining value is distributed

Fixed costs are not modulated because the system must first protect what is necessary to continue operating. Flexible costs are modulated because they can expand and contract with the rhythm of the cycle.


## The Formula

```text
Dₜ = (Rₜ + Iₜ) − Fₜ − (Vₜ × Sₜ),   Dₜ ≥ 0
```

**Dₜ** is the distributable surplus for period t. It is allocated as:

```text
0.33 × Dₜ → Creators
0.33 × Dₜ → Builders
0.34 × Dₜ → Regeneration
```

where 0.33 + 0.33 + 0.34 = 1, confirming full distribution of Dₜ.

*One third cannot be expressed exactly in two decimal places. The rounding residual goes to Regeneration.*

All values are computed per period, usually monthly. The formula is applied once per cycle step.

**If Dₜ < 0** — costs exceed revenue plus investment in a given period — no distribution occurs for that period. Implementations must define how to handle the shortfall: common approaches are carrying the deficit forward against future surpluses, drawing from a reserve, or reducing Vₜ before the deficit reaches fixed costs. The protocol does not mandate a specific mechanism; it requires that one is defined before deployment. A simple default — a reserve filled gradually from surplus — is described in **Safeguards**.

---

### What comes in

* **Rₜ** — Revenue for this period.
* **Iₜ** — Investment input for this period. If investment is yearly, it enters as 1/12 per month.
* **Sₜ** — Snail Factor for this month, derived from the selected scale.

---

### What is protected first

* **Fₜ** — Fixed costs: operations, hosting, taxes, legal, salaries, or anything non-negotiable in the implementation.

Fixed costs are subtracted first and are not modulated by the cycle. This protects the base layer of the system.

---

### What breathes with the cycle

* **Vₜ × Sₜ** — Flexible costs modulated by the Snail Factor.

**Vₜ** represents flexible costs: investor returns, infrastructure investment, equipment, travel, marketing, and other discretionary spend the implementation defines as adjustable.

**Sₜ** determines how strongly that flexible layer is activated during the month. In higher Snail months, flexible costs can expand. In lower Snail months, they compress — increasing Dₜ.

This is where the scale enters the formula directly.

---

### What flows out

After fixed and flexible costs are subtracted, the remaining value is distributed to three roles:

* **0.33 × Dₜ → Creators** — participants who produce the primary cultural or creative value.
* **0.33 × Dₜ → Builders** — participants who build, maintain, and improve the tools, systems, and infrastructure.
* **0.34 × Dₜ → Regeneration** — projects that restore a landscape: people and place, one living system. Each implementation defines how its regeneration projects are chosen.

Three roles, equal shares. When the split cannot be exactly equal, Dₜ is distributed with regeneration receiving the surplus step — the layer that addresses the wider human and ecological needs the system touches.

**The split echoes the scale.** Read each tone of the scale as a percentage (cents ÷ 100) and one ascent through the seven tones sums to exactly one third:

```text
1.00 + 2.33 + 3.67 + 4.67 + 6.00 + 7.33 + 8.33 = 33.33
```

Played three times, the scale completes the whole: the cumulative sum passes through 33, 67, and lands on 100 — the same shape as the 33 / 33 / 34 split, rounding residual included. This is a correspondence, not a derivation — the shares are equal because no role is secondary — but it means the distribution and the cycle are the same scale, read from two different angles. The same cumulative curve can guide later decisions too, such as the pace at which a reserve is filled.

Each implementation maps these roles to its own context:

|  | Creators | Builders | Regeneration |
| :---- | :---- | :---- | :---- |
| **Plantasia Space** (music) | Artists | Tool developers | Landscape regeneration partners chosen by each artist at release — connecting the music to a place that needs it |
| **Documentary film** | Directors & creative crew | Production systems, distribution & archives | Communities and places whose stories the work carries, especially those without other means of telling them |
| **Research lab** | Researchers | Lab infrastructure, instruments & peer-review tools | Open access for researchers in developing regions; community health and public education |
| **Software platform** | Product teams | DevOps, infrastructure & maintenance | Digital literacy and accessibility for under-served communities; ecosystem regeneration in compute territories |
| **Food cooperative** | Farmers | Distribution & logistics networks | Food access for under-served communities and land-stewardship programs in producing regions |
| **Artisan workshop** | Makers & craftspeople | Supply chain & workshop operators | Livelihoods and craft traditions in source-material communities |
| **Conference / symposium** | Speakers & contributors | Organisers, venue & platform teams | Inclusion of contributors from developing countries and underrepresented backgrounds (travel, accommodation, access) |
| **AI service** | Authors & data contributors whose work trains the model | ML engineers & infrastructure operators | Energy, water & ecosystem restoration in the territories hosting the compute |

The protocol defines the math. The implementation defines who fills each role.

---

### A note on equity, ownership, and capital returns

Different projects fund themselves differently. Some have cap tables with founders and external investors. Some are cooperatives. Some are solo creators with no investors at all. Some use revenue-share agreements, token mechanics, or other structures. The protocol does not require any specific ownership model.

What the protocol does require is structural: any mechanism that returns capital to the people who provided it lives in **Vₜ × Sₜ**, the flexible-cost term. Creators, builders, and regeneration receive their fixed shares (33%, 33%, 34%) of Dₜ regardless of how capital returns are organized.

If a project has no investors, Vₜ simply contains operational flexible costs. If a project has founders, investors, cooperative members, or token holders, their returns flow through Vₜ according to whatever rules that project has chosen.

Founders or core team members who are also doing creator or builder work receive their role-based share separately, through the right-hand side of the formula. Founding contribution and ongoing labor are different and are paid through different channels.

#### What the protocol defines

- **The split.** Creators 33%, builders 33%, regeneration 34%, of the distributable pool, every period.
- **The pool.** What is and isn't distributable, defined by the formula.
- **The cycle.** The Snail Factor modulates Vₜ each month across a 12-step annual cycle.
- **The separation.** Capital-return claims live in Vₜ, not in the right-hand side. The three role shares are protected from dilution by capital structure.
- **Transparency of regeneration.** Selection of partners, ongoing accountability, and reporting of results must all be transparent and auditable. Regeneration cannot be a black box.

#### What each implementation defines

- **Whether to have an ownership structure at all.** Cap tables, cooperative membership, token mechanics, revenue-share agreements, or none of the above.
- **Who participates and on what terms.** Founders, core team, external investors, members, token holders — composition is up to each project.
- **Return structure.** Whether there is a cap on cumulative returns, what triggers it, and what happens after.
- **Vesting or earn-in rules**, if applicable.
- **Governance scope.** Whether ownership carries governance rights, financial rights, or both.
- **Distribution within roles.** How the 33% creator share is split among individual creators, how the 33% builder share is split among individual builders, and how the 34% regeneration share is allocated across regeneration projects. This depends entirely on the platform — usage, contribution, peer review, project selection, or other mechanisms.
- **Regeneration partners.** Whether regeneration recipients are internal initiatives of the implementation, independent external organizations, or a mix. Either is permitted; the protocol's only requirement is that the selection process is transparent.

The protocol's job is to make sure the right shape of value flows to the right categories of participants, every period, modulated by the cycle. How each category divides its share internally, and how capital is returned to those who provided it, are the implementation's responsibility.

---

## Worked Example

The following uses illustrative figures to show how the formula behaves across two contrasting months. All values are hypothetical.

**Shared inputs:**

| Variable | Value | Note |
| :--- | :--- | :--- |
| Rₜ | €80,000 | Monthly revenue |
| Iₜ | €25,000 | Annual investment of €300,000 prorated (÷ 12) |
| Fₜ | €40,000 | Fixed costs: hosting, salaries, legal |
| Vₜ | €30,000 | Flexible costs — see breakdown below |

**Vₜ breakdown (illustrative):**

| Component | Amount |
| :--- | ---: |
| Capital returns to owners & investors | €12,000 |
| Marketing & travel | €8,000 |
| Reserve / cash buffer | €6,000 |
| R&D / experimentation | €4,000 |
| **Total** | **€30,000** |

The reserve sits inside Vₜ here, so it accrues most in peak-Snail months when reinvestment is highest. A fixed rainy-day fund — set aside the same amount every month regardless of cycle — would belong in Fₜ instead. Each implementation chooses.

**January — Month 1, Sₜ = 0.10 (low Snail month)**

```text
D₁ = (80,000 + 25,000) − 40,000 − (30,000 × 0.10)
   = 105,000 − 40,000 − 3,000
   = 62,000
```

| Role | Allocation | Amount |
| :--- | :--- | :--- |
| Creators | 0.33 × D₁ | €20,460 |
| Builders | 0.33 × D₁ | €20,460 |
| Regeneration | 0.34 × D₁ | €21,080 |

**July — Month 7, Sₜ = 0.83 (peak Snail month)**

```text
D₇ = (80,000 + 25,000) − 40,000 − (30,000 × 0.83)
   = 105,000 − 40,000 − 24,900
   = 40,100
```

| Role | Allocation | Amount |
| :--- | :--- | :--- |
| Creators | 0.33 × D₇ | €13,233 |
| Builders | 0.33 × D₇ | €13,233 |
| Regeneration | 0.34 × D₇ | €13,634 |

**What the cycle does:** In low Snail months, Vₜ × Sₜ is smaller — less is spent on flexible costs, and Dₜ is larger. In peak months, Vₜ × Sₜ expands — more is reinvested in the system's own growth, and Dₜ is smaller. The cycle does not change total revenue; it modulates the balance between reinvestment and distribution across the year.

---

## Why a Cycle?

The formula moves money. But money is only one of the capitals this system holds.

**Financial capital** is what the formula manages: revenue, costs, surplus. **Cultural capital** is what creators and builders grow with their shares — better music, better tools, better experiences. **Material capital** is what regeneration feeds — the land and communities the activity touches. These are not separate parties competing for a pie. They are the same system, seen from three sides.

The cycle keeps the three in equilibrium. In high months, more goes into the system's own growth. In low months, that spending rests, and more of the surplus flows into culture and regeneration. Nothing is taken from one side and handed to another — the system is feeding the sources of its own value, in turn.

This is also why the cycle is fixed and public:

* **Low months are not emergencies.** Contraction is part of the rhythm and known in advance. Nobody has to make panic cuts.
* **Everyone can see ahead.** Revenue is uncertain; the cycle is not. Anyone can look twelve months forward and know how the protocol will behave.
* **The unit is one year, not one month.** Participants can join in any month, but a commitment runs a full cycle — all twelve steps, ascent and descent. Nobody rides only the peak. The protocol is designed to run as code — automatic and auditable, like a contract that executes itself (with or without a blockchain) — so this cannot be timed or gamed.
* **Growth comes with rest.** After every expansion comes a quieter phase: maintain, repair, consolidate, before the next ascent.
* **Regeneration is never optional.** 34% of every distribution, in every phase. It shrinks and grows with the surplus, but it cannot be cut from the structure.
* **Nothing is arbitrary.** Every value in the cycle comes from the 833 Cents Scale — derived, not negotiated. Its smallest steps sit on either side of the peak, so the cycle eases through its turning points.

Whether this rhythm truly strengthens a system over time — lower burn, stronger reserves, healthier culture — is something each implementation should measure and publish, not assume.

---

## Safeguards

A first version of a protocol does not need to solve everything. Three habits keep an implementation honest:

* **Keep a reserve.** Set a clear target — for example, six months of fixed costs — and fill it gradually from surplus, gently at first so a young project is not starved. In a deficit month (Dₜ < 0), the reserve absorbs the shock and no distribution happens.
* **Don't move the lines quietly.** The cycle only modulates what is declared flexible. What an implementation counts as fixed or flexible must be public, and changing it must be a public decision — not a bookkeeping trick.
* **Don't touch the cycle.** The cycle's value is that nobody can reschedule it. If an implementation ever allows a shift, it should be rare, public, and hard to do.

---

## Implementation Path

The protocol is released in four phases:

1. **Publish the specification** — Define and release the core protocol openly: the Snail Factor math, the creator/builder/regeneration distribution model, and the formula. The goal is a system that is clear, auditable, and easy to question and build on.

2. **Build the open-source library** — An open-source package any platform can integrate. Input: revenue, costs, usage data, current date. Output: distribution amounts per participant. The library calculates; the platform executes payment.

3. **Launch the dashboard** — A public interface at entangled.space where anyone can observe the cycle, simulate distributions in their own context, and verify how implementations should compute.

4. **Deploy in Plantasia Space** — Plantasia Space becomes the first live implementation of the protocol inside a working creative platform, moving from specification to real economic activity.

The protocol is infrastructure-agnostic. It can run on a blockchain, on a conventional payment processor, on both, or on any future system. The implementation layer varies. The math stays the same.

---

## Get Involved

Entangled Space is in active development. We are looking for three kinds of collaborators:

**Builders** — developers and engineers who want to implement the open-source library, build tools on top of the protocol, or integrate it into existing platforms.

**Partners** — creative platforms, labels, collectives, or cooperatives in any sector who want to run the protocol as their distribution model.

**Founding Sponsors** — individuals and organizations aligned with regenerative economics who want to sponsor the development phase and see the protocol's first live deployment in Plantasia Space.

To follow progress or start a conversation: [entangled.space](https://entangled.space)

---

## Glossary

**833 Cents Scale** — A musical tuning system developed by Heinz Bohlen (2012), using the golden ratio (φ ≈ 1.618) as its repeating interval instead of the octave. Source of the Snail Factor values.

**Builders** — Participants who build and maintain the tools, systems, and infrastructure that make an implementation function. Receive 33% of the distributable surplus.

**Cents** — A unit of musical interval: 1200 cents = one octave. A logarithmic measure of pitch perception, used here as the source curve for the Snail Factor.

**Creators** — Participants who produce the primary cultural or creative value in an implementation. Receive 33% of the distributable surplus.

**Distributable Surplus (Dₜ)** — The value remaining after fixed and flexible costs are subtracted from revenue and investment in period t: `Dₜ = (Rₜ + Iₜ) − Fₜ − (Vₜ × Sₜ), Dₜ ≥ 0`. The quantity allocated to creators, builders, and regeneration. If Dₜ < 0, no distribution occurs for that period.

**Fixed Costs (Fₜ)** — Non-negotiable operational costs for a given period: operations, hosting, taxes, legal, salaries. Subtracted first; not modulated by the cycle.

**Flexible Costs (Vₜ)** — Discretionary costs that scale with the Snail Factor: investor returns, infrastructure investment, travel, marketing, and other adjustable spend.

**Golden Ratio (φ)** — The mathematical constant ≈ 1.618034, appearing in natural growth patterns including the spiral arrangements of seeds and leaves. The repeating interval of the 833 Cents Scale.

**Landscape** — A living system of people and place: a territory, its ecosystems, and those who inhabit them. The protocol says *landscape* rather than *nature* because humans are not outside it.

**Protocol** — A set of rules that defines how a system operates, independently of any specific platform or technology that implements it. The math is fixed; the implementation is open.

**Regeneration** — Participants or projects that restore a landscape: ecological repair, community wellbeing, social inclusion, open access, or similar. Receives 34% of the distributable surplus. Each implementation defines how its projects are chosen.

**Snail Factor (Sₜ)** — The monthly modulation coefficient, ranging from 0.10 to 0.83, derived from the 833 Cents Scale. Determines how strongly the flexible cost layer is activated in a given month.

**Reserve** — A recommended habit for deficit periods: a fund with a clear target (for example, six months of fixed costs), filled gradually from surplus and used when Dₜ < 0.

---

## Works Cited

Alejandre, C., O. Akizu-Gardoki, J. Montoya, J. Larrinaga, and R. Minguez. 2023. “Environmental burdens analysis of current music player devices through Life-Cycle Assessment methodology and optimum lifespan of these apparatus.” *Environmental Challenges* 13: 100774. https://doi.org/10.1016/j.envc.2023.100774.

Bohlen, Heinz. 2012. “An 833 Cents Scale: An Experiment on Harmony.” *The Bohlen-Pierce Site.* https://www.huygens-fokker.org/bpsite/833cent.html.

Centre national de la musique, SNEP, UPFI, and SMA. 2024. *REC “Reduce our Carbon Footprint!”: Carbon Footprint of the Recorded Music Sector Distributed by French Players, 2022 Estimates.* Paris: CNM. https://cnm.fr/wp-content/uploads/2024/09/240918_REC_ENG.pdf.

Devine, Kyle. 2019. *Decomposed: The Political Ecology of Music.* Cambridge, MA: MIT Press.

Devine, Kyle, and Matt Brennan. 2019. “Music consumption has unintended economic and environmental costs.” *University of Glasgow News.* https://www.gla.ac.uk/news/archiveofnews/2019/april/headline_643297_en.html.

Fletcher, Chloe, and Jigna Chandaria. 2020. *The Energy Footprint of BBC Radio Services: Now and in the Future.* White Paper WHP 393. London: BBC Research & Development. https://downloads.bbc.co.uk/rd/pubs/whp/whp-pdf-files/WHP393.pdf.

International Energy Agency. 2025. *Energy and AI.* Paris: IEA. https://www.iea.org/reports/energy-and-ai.

MIT Climate Machine. 2025. *Assessment Report of the Media and Entertainment Industry and Climate Change. Phase 1: Live Music, UK and US.* Cambridge, MA: Massachusetts Institute of Technology. https://climatemachine.mit.edu/.

Ostrom, Elinor. 1990. *Governing the Commons: The Evolution of Institutions for Collective Action.* Cambridge: Cambridge University Press.

Raworth, Kate. 2017. *Doughnut Economics: Seven Ways to Think Like a 21st-Century Economist.* White River Junction, VT: Chelsea Green Publishing.

Scholz, Trebor. 2016. *Platform Cooperativism: Challenging the Corporate Sharing Economy.* New York: Rosa Luxemburg Stiftung.

Spotify. 2025. *Equity & Impact Report 2024.* Stockholm: Spotify Technology S.A. https://s29.q4cdn.com/175625835/files/doc_governance/2025/Mar/10/Spotify-Equity-Impact-Report-2024-9b1865.pdf.

VRMA/Vinyl Alliance Working Group on Carbon Footprinting the Vinyl Record Supply Chain. 2024. *Vinyl Record Industry: First Carbon Footprinting Report.* Vinyl Record Manufacturers Association and Vinyl Alliance. https://vinylalliance.org/wp-content/uploads/2024/06/First-Carbon-Footprint-report_VRMA_VA_30-May-2024_final.pdf.

[^1]: Bohlen, Heinz. 2012. “An 833 Cents Scale: An Experiment on Harmony.” *The Bohlen-Pierce Site*. https://www.huygens-fokker.org/bpsite/833cent.html.

[^2]: Devine, Kyle. 2019. *Decomposed: The Political Ecology of Music.* Cambridge, MA: MIT Press. Devine documents how the shift from physical formats to streaming was framed as a dematerialization that would reduce the music industry’s environmental footprint, and shows empirically that the footprint did not disappear but moved into energy and hardware.

[^3]: VRMA/Vinyl Alliance Working Group on Carbon Footprinting the Vinyl Record Supply Chain. 2024. *Vinyl Record Industry: First Carbon Footprinting Report.* Vinyl Record Manufacturers Association and Vinyl Alliance. https://vinylalliance.org/wp-content/uploads/2024/06/First-Carbon-Footprint-report_VRMA_VA_30-May-2024_final.pdf.

[^4]: Alejandre et al. 2023. “Environmental burdens analysis of current music player devices through Life-Cycle Assessment methodology.” *Environmental Challenges* 13: 100774.

[^5]: Fletcher, Chloe, and Jigna Chandaria. 2020. *The Energy Footprint of BBC Radio Services: Now and in the Future.* White Paper WHP 393. London: BBC Research & Development. https://downloads.bbc.co.uk/rd/pubs/whp/whp-pdf-files/WHP393.pdf.

[^6]: International Energy Agency. 2025. *Energy and AI.* Paris: IEA. https://www.iea.org/reports/energy-and-ai.

[^7]: MIT Climate Machine. 2025. *Assessment Report of the Media and Entertainment Industry and Climate Change. Phase 1: Live Music, UK and US.* Cambridge, MA: Massachusetts Institute of Technology. https://climatemachine.mit.edu/.

[^8]: Ostrom, Elinor. 1990. *Governing the Commons: The Evolution of Institutions for Collective Action.* Cambridge: Cambridge University Press.

[^9]: Scholz, Trebor. 2016. *Platform Cooperativism: Challenging the Corporate Sharing Economy.* New York: Rosa Luxemburg Stiftung.

[^10]: Raworth, Kate. 2017. *Doughnut Economics: Seven Ways to Think Like a 21st-Century Economist.* White River Junction, VT: Chelsea Green Publishing.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnAAAAEzCAYAAACxNz78AAAQAElEQVR4AeydB5wUxRLGa8hBkoKCIp4BRRDFSDKgCIoRQRDxqYA5gxjwmUBMKAr6FBFRQYyYMKAiooCIogQlCkpGyTnnt/8+5tg7ZvPs7sxu8aNvd3t6Onzd1V1dVV1daLf+UwQUAUVAEVAEFAFFICEEdiX0tr4cOwKFRP8pAoqAIqAIKAIxI6AvpBeB3ektfp/SrX1iNCK5CCgDl1x8NXdFQBFQBBQBRSAJCCjDlARQfZWlRxg4r+0kfNWHWVtZbXiiCCjdJYqgvq8IKAKKQLoQ8AgDpzuJdA0ALTebEVC6y+be17YrApmBQFwb0YxoukcYuIzAUhuhCCgCioAioAhkLALeZJWydyOqDFzGkpo2TBFQBDyLgFZMEfAhAtnLKnmzs8IzcN5kt72JpNZKEVAEFIG0IKATdVpg10IVgTQjEJ6BU3Y7zd2TtOL3zVjXgH0x0RhFwBcI6ETti27SSioCLiMQnoFzuTDNzsMI6Brg4c7RqikCioAi4BUEtB5eQUAZOK/0hNZDEUgrAiqCTSv8vi9cx4/vu1Ab4DsElIHzXZdphRWBZCDgHxFsMlqveSaKQPLGj7KGifaNvp+pCCgDl6k9q+1SBBQBRSADEEgea5gB4GgTshoBZeBi7n59QRFQBBQBRUARUAQUgfQikCADp8Lt9Haflq4IKAKKgCLgGwS0ooqAiwgkyMBloXBbedbEh59imDiGmoMioAgoAopAkhDwxyKVIAOXJOy8nG0W8qyud4di6DqkUWaoyRQBRUAR8CACXmOY/LFIKQPnwaGsVVIEFAFFQBFQBLIHAX8wTF7rj9QycF5rvdZHEVAEXEVg+fLl8s4770i3bt3kscceM9+XLl3qWhl9+vSRyZMny/r16+WZZ56RjRs3Oub98ccfywMPPOAY5s+f7/hOLJGrVq2SDRs2xPKKplUEFAFFwFUElIFzFU7NTBHIXgRgalq3bi3t27c3DFzXrl3N92bNmsnmzZtdAWbQoEEyY8YMw7j17dvXfDpl/PXXX8vTTz/tGP755x+nV6KOmzZtmpx11lmyYMGCqN/RhIkjoDkoAopAfgRiYuB2539XfykCioAikIcAUq958+bJZ599JmvXrpV169bJF198IVu3bpX7778/L10iX37++We54oorosri2muvld27d+8TGjRoENX7oRL9+++/snLlSpNvqDQarwikCgFdl1OFtPfKiYmBUy219zowKTXSGcEBVo2KhACSsdNOO02aNGkiZcqUkf322898/+ijj4wkjvdffvll6dixo7z99tty0UUXCRK7b7/9lkcm7Ny5U0jfpk0b8y7SvJ9++sk848+tt94q33//PV8TDr///ruQX9OmTaVly5amTsGZ0p7bbrtNzjvvPHnkkUeMFBHp2xNPPGEYuHbt2sns2bPNK6h0ib/wwgulVatWMnToUKEtPBw8eLBcffXVRp1Mm9977z2iNcSBgE5N+4Jm7RulMVmCQEwMXJZgos3UGUHHQBwIwLyMHDnS2KZNnTpVFi9eLFu2bJEaNWrIiSeeaHKE4Xnttdfknnvukb/++kvGjBkjF1xwgUycONE8f/XVV+X66683vxcuXChfffWVXHzxxfLnn3+a55MmTRLs7MyPCH+QAsKEBQfieG306NECs/nNN98I5YwfP146dOhgyuM5dTv77LPl008/lXkBqSKM51VXXSWbNm0yksVdu3YJKuMdO3bIihUrhLZjkzdr1iyZMGGCkPaDDz4gK5P/d999J48//rhh+IoWLWri9U/sCOjUFAYz5W7DgJPmR0kqXhm4JAGr2SoC2YbA6aefLs8++6wMHz5cGjduLEi2UGMOGDAgn7qxdOnS8tJLL5nDCF9++aUceOCBRtUKXhUqVJD3339ffg9Ixzis8MknnxjJF995HksYMmSI1KxZM1+AISMPmCiYsl9++UVgNkeNGiUnn3yyoAZG7XrnnXdKtWrVBAaPsmE6sauDgevRo4dUqlRJPv/8cznmmGNk2LBhgmQO+zwYTPKEgbv33nsNs0d5qFxh4KZMmWKkfcRp8CECXmaSlLv14YBKrMrKwCWGn76tCCgCexAoXry4URUibUIS1b17d2P/dtNNN8l99923J5XIwQcfbJg70h9//PFStmxZWbNmjXl+5ZVXGskYeaCS7Ny5s2H+tm/fbp7H8ge1JfZ3weGaa64xWdSvX1+uu+46IwV88cUXpVOnToaRg0GjLkgEOXxB/ajnZZddZuz6zjjjDPN+8B+YsoYNG8oll1xi1MYwpKiAt23bZphU0hYpUkQaNWokfFpWyldaqqDBDQS069xAUfNwCQFl4FwCUrNRBLIZAVSKb731lsyZM0cK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>
