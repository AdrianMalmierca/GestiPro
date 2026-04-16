import { getTranslations } from 'next-intl/server'

type Metric = {
  label: string
  value: string
  sub: string
  positive: boolean | null
  accent: string
  bg: string
}

export default async function MetricsGrid({ metrics }: { metrics: Metric[] }) {
  const t = await getTranslations()

  return (
    <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '24px',
          }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #f0f0f0',
                padding: '20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <p style={{ fontSize: '13px', color: '#999', margin: 0, fontWeight: 500 }}>{m.label}</p>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '9px',
                    background: m.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: m.accent,
                    }} />
                  </div>
                </div>
                <p style={{
                  fontSize: '30px', fontWeight: 700, color: '#0f0f1a',
                  letterSpacing: '-0.04em', margin: 0, marginBottom: '6px',
                  lineHeight: 1,
                }}>
                  {m.value}
                </p>
                <p style={{
                  fontSize: '12px', margin: 0, fontWeight: 500,
                  color: m.positive === true ? '#16a34a' : m.positive === false ? '#ef4444' : '#999',
                }}>
                  {m.sub}
                </p>
              </div>
            ))}
    </div>
    )
}