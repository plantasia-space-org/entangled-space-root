import { VISIBLE_SNAIL_MODEL } from "@/features/snail-synth/snail-synth-data"

type FormulaState = {
  revenue: number
  fixedCosts: number
  salaryRate: number
  investorRate: number
  flexibleCosts: number
  totalCosts: number
  distributable: number
  creators: number
  builders: number
  regeneration: number
}

const TOTAL_STEPS = VISIBLE_SNAIL_MODEL.length
const CYCLE_STEPS = 12

function sCurve(t: number) {
  return 1 / (1 + Math.exp(-10 * (t - 0.48)))
}

function getFormulaState(position: number, factor: number): FormulaState {
  const progressT = TOTAL_STEPS <= 1 ? 0 : position / (TOTAL_STEPS - 1)
  const expenses = 5_000 + progressT * 8_000
  const salaryRate = 9_000 + progressT * 14_000
  const investorRate = 4_000 + progressT * 8_000
  const fixedCosts = expenses + salaryRate
  const flexibleCosts = investorRate * factor
  const totalCosts = fixedCosts + flexibleCosts
  const revenue = 28_000 + sCurve(progressT) * 92_000
  const distributable = revenue - totalCosts

  return {
    revenue,
    fixedCosts,
    salaryRate,
    investorRate,
    flexibleCosts,
    totalCosts,
    distributable,
    creators: distributable * 0.33,
    builders: distributable * 0.33,
    regeneration: distributable * 0.34,
  }
}

function normalize(value: number, min: number, max: number) {
  return max === min ? 0.5 : (value - min) / (max - min)
}

const FORMULA_STATES = VISIBLE_SNAIL_MODEL.map((entry, index) =>
  getFormulaState(index, entry.factor)
)

const revenueValues = FORMULA_STATES.map((formula) => formula.revenue)
const factorValues = VISIBLE_SNAIL_MODEL.map((entry) => entry.factor)
const minRevenue = Math.min(...revenueValues)
const maxRevenue = Math.max(...revenueValues)
const minFactor = Math.min(...factorValues)
const maxFactor = Math.max(...factorValues)

export const VISUALIZATION_MODEL = VISIBLE_SNAIL_MODEL.map((entry, index) => {
  const formula = FORMULA_STATES[index]
  const theta = index / CYCLE_STEPS * Math.PI * 2 - Math.PI / 2
  const normalizedRevenue = normalize(formula.revenue, minRevenue, maxRevenue)
  const normalizedFactor = normalize(entry.factor, minFactor, maxFactor)
  const growthRadius = 34 + Math.pow(normalizedRevenue, 0.85) * 180
  const snailOffset = (normalizedFactor - 0.5) * 34
  const radius = growthRadius + snailOffset

  return {
    ...entry,
    formula,
    index,
    snailFactor: entry.factor,
    revenue: formula.revenue,
    totalCosts: formula.totalCosts,
    distributable: formula.distributable,
    polarX: Math.cos(theta) * radius,
    polarY: Math.sin(theta) * radius,
    radius,
  }
})

export const HARMONIC_SOURCE_CONFIG = {
  snailFactor: {
    label: "Snail Factor",
    color: "var(--chart-2)",
  },
  revenue: {
    label: "Revenue (R)",
    color: "var(--chart-1)",
  },
  totalCosts: {
    label: "Total deductions",
    color: "var(--chart-3)",
  },
  distributable: {
    label: "Remaining value",
    color: "var(--chart-4)",
  },
  polar: {
    label: "Polar Result",
    color: "var(--chart-5)",
  },
} as const

export function getVisualizationEntry(step: number) {
  return VISUALIZATION_MODEL[step] ?? VISUALIZATION_MODEL[0]
}
