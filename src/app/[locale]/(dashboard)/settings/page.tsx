import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import SettingsForm from '@/components/ui/SettingsForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage({ params,
}: {
  params: Promise<{ locale: string }>
}) {

  const { locale } = await params
  setRequestLocale(locale)

  const session = await getServerSession(authOptions)
  const t = await getTranslations()

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontSize: '22px', fontWeight: 600, color: '#0f0f1a',
          letterSpacing: '-0.03em', margin: 0, marginBottom: '4px',
        }}>
          {t('settings.title')}
        </h1>
        <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>
          {t('settings.subtitle')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignItems: 'start' }}>

        {/* Form */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid #f0f0f0', padding: '24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f1a', margin: 0, marginBottom: '20px' }}>
            {t('settings.personal')}
          </h3>
          <SettingsForm session={session} />
        </div>

        {/* Info card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e, #2d2d5e)',
            borderRadius: '16px',
            border: '1px solid rgba(124,111,205,0.2)',
            padding: '24px',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: session?.user?.role === 'ADMIN'
                ? 'linear-gradient(135deg, #7c6fcd, #4f46e5)'
                : 'linear-gradient(135deg, #4ade80, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', fontWeight: 700, color: '#fff',
              marginBottom: '16px',
            }}>
              {session?.user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'}
            </div>
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              {session?.user?.name}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0, marginTop: '4px' }}>
              {session?.user?.email}
            </p>
            <div style={{
              marginTop: '16px', paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{
                fontSize: '11px', fontWeight: 600,
                color: session?.user?.role === 'ADMIN' ? '#a89df0' : '#4ade80',
                background: session?.user?.role === 'ADMIN'
                  ? 'rgba(124,111,205,0.15)' : 'rgba(74,222,128,0.1)',
                padding: '4px 12px', borderRadius: '999px',
                border: session?.user?.role === 'ADMIN'
                  ? '1px solid rgba(124,111,205,0.25)' : '1px solid rgba(74,222,128,0.2)',
              }}>
                {session?.user?.role === 'ADMIN' ? `🔐 ${t('common.admin')}` : `👤 ${t('common.user')}`}
              </span>
            </div>
          </div>

          {/* Technique info */}
          <div style={{
            background: '#fff', borderRadius: '16px',
            border: '1px solid #f0f0f0', padding: '20px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f1a', margin: 0, marginBottom: '14px' }}>
              {t('settings.account')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: t('settings.role'), value: session?.user?.role || '—' },
                { label: 'ID', value: session?.user?.id?.slice(0, 8) + '...' || '—' },
                { label: t('settings.status'), value: t('settings.active') },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none',
                }}>
                  <span style={{ fontSize: '13px', color: '#999' }}>{row.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#333' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}