import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import ActivityList from '@/components/ui/dashboard/ActivityList'
import MetricsGrid from '@/components/ui/dashboard/MetricsGrid'
import SessionsChart from '@/components/ui/dashboard/SessionsChart'

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
      <MetricsGrid metrics={metrics} />

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
        <SessionsChart bars={bars} days={days} />

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