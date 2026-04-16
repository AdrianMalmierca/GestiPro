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
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #f0f0f0',
        padding: '22px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '18px',
        }}
      >
        <h3 style={{ fontSize: '14px', margin: 0 }}>
          {t('dash.sessions')}
        </h3>

        <span style={{ fontSize: '13px', fontWeight: 700 }}>
          3 891{' '}
          <span style={{ fontSize: '11px', color: '#ef4444' }}>↓ 2%</span>
        </span>
      </div>

      {/* bars */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '6px',
          height: '80px',
          marginBottom: '8px',
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                width: '100%',
                height: `${h}%`,
                borderRadius: '4px 4px 0 0',
                background:
                  i === 5
                    ? 'linear-gradient(180deg, #7c6fcd, #4f46e5)'
                    : i === bars.length - 1
                    ? '#ede9fe'
                    : '#f0f0f0',
              }}
            />
          </div>
        ))}
      </div>

      {/* days */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '10px',
              color: i === 5 ? '#7c6fcd' : '#ccc',
              fontWeight: i === 5 ? 600 : 400,
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}