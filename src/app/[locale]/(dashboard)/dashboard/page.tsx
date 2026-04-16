import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import ActivityList from '@/components/ui/dashboard/ActivityList'
import MetricsGrid from '@/components/ui/dashboard/MetricsGrid'
import SessionsChart from '@/components/ui/dashboard/SessionsChart'

export const dynamic = 'force-dynamic' //always request fresh data for this page

export default async function DashboardPage({
  params,
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
      {/* header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600 }}>
          {t('dash.greeting')},{' '}
          {session?.user?.name?.split(' ')[0]} 👋
        </h1>

        <p style={{ fontSize: '14px', color: '#999' }}>
          {t('dash.activity')} —{' '}
          {new Date().toLocaleDateString(locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* metrics */}
      <MetricsGrid metrics={metrics} />

      {/* grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px',
        }}
      >
        <div>
          <ActivityList />
        </div>

        <div>
          <SessionsChart bars={bars} days={days} />
        </div>

        {/* role card se queda aquí si quieres, o lo extraemos después */}
      </div>
    </div>
  )
}