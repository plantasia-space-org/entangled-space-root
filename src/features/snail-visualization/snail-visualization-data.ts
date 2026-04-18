import { VISIBLE_SNAIL_MODEL } from "@/features/snail-synth/snail-synth-data"

type FormulaState = {
  revenue: number
  expenseLoad: number
  salaryRate: number
  investorRate: number
  snailsCost: number
  totalCosts: number
  distributable: number
  creators: number
  builders: number
  regeneration: number
}

const TOTAL_STEPS = VISIBLE_SNAIL_MODEL.length
const CYCLE_STEPS = 12

function getFormulaState(position: number, factor: number): FormulaState {
  const progressT = TOTAL_STEPS <= 1 ? 0 : position / (TOTAL_STEPS - 1)
  const expenses = 0.22 + progressT * 0.56
  const salaryRate = 0.16 + progressT * 0.32
  const investorRate = 0.07 + progressT * 0.18
  const snailsCost = (salaryRate + investorRate) * factor
  const totalCosts = expenses + snailsCost
  const distributable = 0.34 + progressT * 0.96 + factor * 0.06
  const revenue = totalCosts + distributable

  return {
    revenue,
    expenseLoad: expenses,
    salaryRate,
    investorRate,
    snailsCost,
    totalCosts,
    distributable,
    creators: distributable * 0.33,
    builders: distributable * 0.33,
    regeneration: distributable * 0.34,
  }
}

export const VISUALIZATION_MODEL = VISIBLE_SNAIL_MODEL.map((entry, index) => {
  const formula = getFormulaState(index, entry.factor)
  const theta = index / CYCLE_STEPS * Math.PI * 2 - Math.PI / 2
  const growthRadius = 10 + Math.pow(index / Math.max(TOTAL_STEPS - 1, 1), 1.18) * formula.revenue * 128
  const qOffset = ((entry.factor - 0.46667) / 0.36666) * 20
  const radius = growthRadius + qOffset

  return {
    ...entry,
    formula,
    index,
    qFactor: entry.factor,
    revenue: formula.revenue,
    totalCosts: formula.totalCosts,
    distributable: formula.distributable,
    polarX: Math.cos(theta) * radius,
    polarY: Math.sin(theta) * radius,
    radius,
  }
})

export const HARMONIC_SOURCE_CONFIG = {
  qFactor: {
    label: "Q-Factor",
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
