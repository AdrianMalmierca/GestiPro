import { getTranslations } from 'next-intl/server'

export default async function ActivityList() {
  const t = await getTranslations()

  const activities = [
    { key: 'login', time: 'time1', color: '#4ade80', bg: '#f0fdf4', icon: '→' },
    { key: 'profile', time: 'time2', color: '#7c6fcd', bg: '#f0eeff', icon: '✎' },
    { key: 'newuser', time: 'time3', color: '#f59e0b', bg: '#fffbeb', icon: '+' },
    { key: 'export', time: 'time4', color: '#3b82f6', bg: '#eff6ff', icon: '↓' },
    { key: 'perms', time: 'time5', color: '#ef4444', bg: '#fff5f5', icon: '⚙' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {activities.map((item) => (
        <div key={item.key} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '9px 10px', borderRadius: '10px',
        }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: item.bg, color: item.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700, flexShrink: 0,
          }}>
            {item.icon}
          </div>
          <span style={{ fontSize: '13px', color: '#333', flex: 1 }}>
            {t(`activity.${item.key}`)}
          </span>
          <span style={{ fontSize: '11px', color: '#ccc', whiteSpace: 'nowrap' }}>
            {t(`activity.${item.time}`)}
          </span>
        </div>
      ))}
    </div>
  )
}