'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

const navIcons: Record<string, string> = {
  dashboard: '▪',
  users: '▪',
  admin: '▪',
  settings: '▪',
}

export default function Sidebar({ session }: { session: Session | null }) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const currentPage = pathname.split('/').pop() || ''

  const navItems = [
    { href: `/${locale}/dashboard`, label: t('dashboard'), key: 'dashboard' },
    { href: `/${locale}/users`, label: t('users'), key: 'users' },
    ...(session?.user?.role === 'ADMIN'
      ? [{ href: `/${locale}/admin`, label: t('admin'), key: 'admin', adminOnly: true }]
      : []),
    { href: `/${locale}/settings`, label: t('settings'), key: 'settings' },
  ]

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      height: '100vh', width: '224px',
      background: '#1a1a2e',
      display: 'flex', flexDirection: 'column',
      zIndex: 20,
      borderRight: '1px solid rgba(255,255,255,0.06)',
    }}>

      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '9px',
            background: 'linear-gradient(135deg, #7c6fcd, #4f46e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>G</div>
          <span style={{
            fontSize: '16px', fontWeight: 600, color: '#fff',
            letterSpacing: '-0.02em',
          }}>GestiPro</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 10px', overflowY: 'auto' }}>
        <p style={{
          fontSize: '10px', color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          fontWeight: 600, padding: '0 10px', marginBottom: '8px',
        }}>
          Menu
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(item => {
            const isActive = currentPage === item.key
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '10px',
                  textDecoration: 'none', transition: 'all 0.15s',
                  background: isActive ? 'rgba(124,111,205,0.2)' : 'transparent',
                  color: isActive ? '#c4b8f8' : 'rgba(255,255,255,0.45)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '14px',
                  border: isActive ? '1px solid rgba(124,111,205,0.3)' : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                  }
                }}
              >
                {/* Icono según sección */}
                <div style={{
                  width: '28px', height: '28px', borderRadius: '7px',
                  background: isActive ? 'rgba(124,111,205,0.3)' : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '13px',
                }}>
                  {item.key === 'dashboard' && '⊞'}
                  {item.key === 'users' && '⊙'}
                  {item.key === 'admin' && '⬡'}
                  {item.key === 'settings' && '⊛'}
                </div>
                <span>{item.label}</span>
                {item.adminOnly && (
                  <div style={{
                    marginLeft: 'auto', width: '6px', height: '6px',
                    borderRadius: '50%', background: '#7c6fcd',
                    boxShadow: '0 0 6px rgba(124,111,205,0.6)',
                  }} />
                )}
              </Link>
            )
          })}
        </div>

        {/* Separador */}
        <div style={{
          margin: '16px 10px',
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
        }} />

        {/* Badge de rol */}
        <div style={{
          margin: '0 4px',
          padding: '10px 12px',
          borderRadius: '10px',
          background: session?.user?.role === 'ADMIN'
            ? 'rgba(124,111,205,0.12)'
            : 'rgba(74,222,128,0.08)',
          border: session?.user?.role === 'ADMIN'
            ? '1px solid rgba(124,111,205,0.2)'
            : '1px solid rgba(74,222,128,0.15)',
        }}>
          <p style={{
            fontSize: '11px', margin: 0,
            color: session?.user?.role === 'ADMIN' ? '#a89df0' : '#4ade80',
            fontWeight: 600, letterSpacing: '0.04em',
          }}>
            {session?.user?.role === 'ADMIN' ? '🔐 Administrateur' : '👤 Utilisateur'}
          </p>
          <p style={{
            fontSize: '11px', margin: 0, marginTop: '2px',
            color: 'rgba(255,255,255,0.25)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {session?.user?.email}
          </p>
        </div>
      </nav>

      {/* User footer */}
      <div style={{
        padding: '14px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: session?.user?.role === 'ADMIN'
              ? 'linear-gradient(135deg, #7c6fcd, #4f46e5)'
              : 'linear-gradient(135deg, #4ade80, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '13px', fontWeight: 600, color: '#fff',
              margin: 0, lineHeight: 1.2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {session?.user?.name}
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0, lineHeight: 1.3 }}>
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
            style={{
              width: '30px', height: '30px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.35)',
              cursor: 'pointer', fontSize: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
              e.currentTarget.style.color = '#ef4444'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}
            title={t('logout')}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}