import { getTranslations } from 'next-intl/server'

export default async function SessionsChart({
  bars,
  days,
}: {
  bars: number[]
  days: string[]
}) {
  const t = await getTranslations()

  return (
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid #f0f0f0', padding: '22px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f1a', margin: 0 }}>
              {t('dash.sessions')}
            </h3>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f0f1a' }}>
              3 891 <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 500 }}>↓ 2%</span>
            </span>
          </div>

          {/* Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px', marginBottom: '8px' }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{
                  width: '100%',
                  height: `${h}%`,
                  borderRadius: '4px 4px 0 0',
                  background: i === 5
                    ? 'linear-gradient(180deg, #7c6fcd, #4f46e5)'
                    : i === bars.length - 1
                      ? '#ede9fe'
                      : '#f0f0f0',
                  transition: 'background 0.2s',
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {days.map((d, i) => (
              <div key={i} style={{
                flex: 1, textAlign: 'center',
                fontSize: '10px', color: i === 5 ? '#7c6fcd' : '#ccc',
                fontWeight: i === 5 ? 600 : 400,
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            marginTop: '16px', paddingTop: '16px',
            borderTop: '1px solid #f5f5f5',
            display: 'flex', gap: '16px',
          }}>
            {[
              { label: t('dash.peak'), color: '#7c6fcd' },
              { label: t('dash.normal'), color: '#e5e5e5' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} />
                <span style={{ fontSize: '11px', color: '#bbb' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

  )
}