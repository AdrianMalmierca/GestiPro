import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminPage({ params,
}: {
  params: Promise<{ locale: string }>
}) {

  const { locale } = await params
  setRequestLocale(locale)
  
  const session = await getServerSession(authOptions)
  const t = await getTranslations()

  if (session?.user?.role !== 'ADMIN') redirect(`/${locale}/dashboard`)

  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  const admins = users.filter((u: { role: string }) => u.role === 'ADMIN')
  const regular = users.filter((u: { role: string }) => u.role === 'USER')

  const logs = [
    { text: t('admin.log1'), time: t('admin.logtime1'), color: '#7c6fcd', bg: '#f0eeff', icon: '⚙' },
    { text: t('admin.log2'), time: t('admin.logtime2'), color: '#16a34a', bg: '#f0fdf4', icon: '+' },
    { text: t('admin.log3'), time: t('admin.logtime3'), color: '#3b82f6', bg: '#eff6ff', icon: '↓' },
    { text: t('admin.log4'), time: t('admin.logtime4'), color: '#f59e0b', bg: '#fffbeb', icon: '✎' },
  ]

  return (
    <div style={{ maxWidth: '1100px' }}>

      {/* Banner admin */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #2d2d5e)',
        borderRadius: '16px',
        border: '1px solid rgba(124,111,205,0.25)',
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              fontSize: '11px', fontWeight: 600, color: '#7c6fcd',
              background: 'rgba(124,111,205,0.15)', padding: '3px 10px',
              borderRadius: '999px', letterSpacing: '0.06em', textTransform: 'uppercase',
              border: '1px solid rgba(124,111,205,0.25)',
            }}>
              {t('common.restricted')}
            </span>
          </div>
          <h1 style={{
            fontSize: '22px', fontWeight: 700, color: '#fff',
            letterSpacing: '-0.03em', margin: 0, marginBottom: '6px',
          }}>
            {t('admin.bannerTitle')}
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            {t('admin.bannerSub')}
          </p>
        </div>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #7c6fcd, #4f46e5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', flexShrink: 0,
        }}>
          🔐
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px', marginBottom: '24px',
      }}>
        {[{ label: t('admin.total'), value: users.length, color: '#7c6fcd', bg: '#f0eeff' },
          { label: t('admin.admins'), value: admins.length, color: '#4f46e5', bg: '#eef2ff' },
          { label: t('admin.users'), value: regular.length, color: '#16a34a', bg: '#f0fdf4' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '16px',
            border: '1px solid #f0f0f0', padding: '20px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', color: '#999', margin: 0, fontWeight: 500 }}>{stat.label}</p>
              <div style={{
                width: '32px', height: '32px', borderRadius: '9px', background: stat.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: stat.color }} />
              </div>
            </div>
            <p style={{
              fontSize: '36px', fontWeight: 700, color: '#0f0f1a',
              letterSpacing: '-0.04em', margin: 0, lineHeight: 1,
            }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Dos columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* Log */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid #f0f0f0', padding: '22px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f1a', margin: 0, marginBottom: '16px' }}>
            {t('admin.log')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {logs.map((log, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '9px 10px', borderRadius: '10px',
                background: i % 2 === 0 ? '#fafafa' : 'transparent',
              }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '8px',
                  background: log.bg, color: log.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, flexShrink: 0,
                }}>
                  {log.icon}
                </div>
                <span style={{ fontSize: '13px', color: '#333', flex: 1 }}>{log.text}</span>
                <span style={{ fontSize: '11px', color: '#ccc', whiteSpace: 'nowrap' }}>{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid #f0f0f0', padding: '22px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f1a', margin: 0, marginBottom: '16px' }}>
            {t('admin.stats')}
          </h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              height: '8px', borderRadius: '999px',
              background: '#f0f0f0', overflow: 'hidden', marginBottom: '8px',
            }}>
              <div style={{
                height: '100%',
                width: `${Math.round((admins.length / users.length) * 100)}%`,
                background: 'linear-gradient(90deg, #7c6fcd, #4f46e5)',
                borderRadius: '999px',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#7c6fcd', fontWeight: 600 }}>
                {Math.round((admins.length / users.length) * 100)}% Admins
              </span>
              <span style={{ fontSize: '12px', color: '#999' }}>
                {Math.round((regular.length / users.length) * 100)}% Users
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Total', value: users.length, color: '#0f0f1a', bg: '#f5f5f5' },
              { label: t('admin.admins'), value: admins.length, color: '#7c6fcd', bg: '#f0eeff' },
              { label: 'Utilisateurs', value: regular.length, color: '#16a34a', bg: '#f0fdf4' },
              { label: t('admin.rate'), value: `${Math.round((admins.length / users.length) * 100)}%`, color: '#f59e0b', bg: '#fffbeb' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 12px', borderRadius: '10px', background: '#fafafa',
              }}>
                <span style={{ fontSize: '13px', color: '#666' }}>{row.label}</span>
                <span style={{
                  fontSize: '13px', fontWeight: 700, color: row.color,
                  background: row.bg, padding: '2px 10px', borderRadius: '999px',
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}