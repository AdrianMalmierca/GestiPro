import { getTranslations } from 'next-intl/server'

export type Metric = {
  label: string
  value: string
  sub: string
  positive: boolean | null
  accent: string
  bg: string
}

export default async function MetricsGrid({
  metrics,
}: {
  metrics: Metric[]
}) {
  const t = await getTranslations()

  return (

  )
}