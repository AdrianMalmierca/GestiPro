import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import ActivityList from '@/components/ui/dashboard/ActivityList'
import MetricsGrid from '@/components/ui/dashboard/MetricsGrid'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({ params,
}: {
  params: Promise<{ locale: string }>
}) {

  const { locale } = await params
  setRequestLocale(locale)

  const session = await getServerSession(authOptions)
  const t = await getTranslations()

  const totalUsers = await prisma.user.count()
  const totalAdmins = await prisma.user.count({ where: { role: 'ADMIN' } })

  const metrics = [
    {
      label: t('metrics.users'),
      value: totalUsers.toLocaleString(),
      sub: `↑ 12% ${t('metrics.vslast')}`,
      positive: true,
      accent: '#7c6fcd',
      bg: '#f0eeff',
    },
    {
      label: t('metrics.active'),
      value: '843',
      sub: '↑ 7%',
      positive: true,
      accent: '#16a34a',
      bg: '#f0fdf4',
    },
    {
      label: t('metrics.admins'),
      value: totalAdmins.toString(),
      sub: t('metrics.stable'),
      positive: null,
      accent: '#f59e0b',
      bg: '#fffbeb',
    },
    {
      label: t('metrics.sessions'),
      value: '3 891',
      sub: '↓ 2%',
      positive: false,
      accent: '#ef4444',
      bg: '#fff5f5',
    },
  ]

  const bars = [40, 65, 50, 80, 55, 90, 70]
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

  return (
    <div style={{ maxWidth: '1100px' }}>

      {/* Greetings */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontSize: '22px', fontWeight: 600, color: '#0f0f1a',
          letterSpacing: '-0.03em', margin: 0, marginBottom: '4px',
        }}>
          {t('dash.greeting')}, {session?.user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>
          {t('dash.activity')} — {new Date().toLocaleDateString(locale, {
            weekday: 'long', day: 'numeric', month: 'long'
          })}
        </p>
      </div>

      {/* Metrics */}
      Metric

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px',
      }}>

        {/* Recent activity */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid #f0f0f0', padding: '22px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f1a', margin: 0 }}>
              {t('dash.activity')}
            </h3>
            <span style={{
              fontSize: '11px', color: '#7c6fcd', fontWeight: 600,
              background: '#f0eeff', padding: '3px 10px', borderRadius: '999px',
            }}>
              Live
            </span>
          </div>
          <ActivityList />
        </div>

        {/* Sessions chart*/}
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

        {/* Rol card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e, #2d2d5e)',
          borderRadius: '16px',
          border: '1px solid rgba(124,111,205,0.2)',
          padding: '22px',
          gridColumn: 'span 2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0, marginBottom: '6px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
              {t('dash.access')}
            </p>
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              {session?.user?.role === 'ADMIN' ? `🔐 ${t('common.admin')}` : `👤 ${t('common.user')}`}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0, marginTop: '4px' }}>
              {session?.user?.email}
            </p>
          </div>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: session?.user?.role === 'ADMIN'
              ? 'linear-gradient(135deg, #7c6fcd, #4f46e5)'
              : 'linear-gradient(135deg, #4ade80, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px',
          }}>
            {session?.user?.role === 'ADMIN' ? '🔐' : '👤'}
          </div>
        </div>

      </div>
    </div>
  )
}