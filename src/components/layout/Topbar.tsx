'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Session } from 'next-auth'

const langs = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

const pageNames: Record<string, { fr: string; en: string; es: string }> = {
  dashboard: { fr: 'Tableau de bord', en: 'Dashboard', es: 'Panel principal' },
  users: { fr: 'Utilisateurs', en: 'Users', es: 'Usuarios' },
  admin: { fr: 'Zone Admin', en: 'Admin Zone', es: 'Zona Admin' },
  settings: { fr: 'Paramètres', en: 'Settings', es: 'Ajustes' },
}

export default function Topbar({ session }: { session: Session | null }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const currentLocale = mounted ? pathname.split('/')[1] : 'fr'
  const currentPage = pathname.split('/').pop() || 'dashboard'
  const pageName = pageNames[currentPage]?.[currentLocale as 'fr' | 'en' | 'es'] || currentPage

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    window.location.replace(segments.join('/'))
  }

  return (
    <div style={{
      height: '64px',
      background: '#fff',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: '0 1px 0 #f5f5f5',
    }}>
      {/* Título de página */}
      <div>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#0f0f1a',
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          {mounted ? pageName : ''}
        </h2>
      </div>

      {/* Derecha: idioma + usuario */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* Selector de idioma */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f5f5f7',
          borderRadius: '10px',
          padding: '3px',
          gap: '2px',
        }}>
          {langs.map(lang => {
            const isActive = mounted && currentLocale === lang.code
            return (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '7px',
                  border: 'none',
                  background: isActive ? '#fff' : 'transparent',
                  color: isActive ? '#0f0f1a' : '#999',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {lang.label}
              </button>
            )
          })}
        </div>

        {/* Info usuario */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px',
          background: '#f8f8f8',
          borderRadius: '10px',
          border: '1px solid #efefef',
        }}>
          <div style={{
            width: '28px', height: '28px',
            borderRadius: '50%',
            background: session?.user?.role === 'ADMIN'
              ? 'linear-gradient(135deg, #7c6fcd, #4f46e5)'
              : 'linear-gradient(135deg, #4ade80, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 700, color: '#fff',
            flexShrink: 0,
          }}>
            {session?.user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'}
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#0f0f1a', margin: 0, lineHeight: 1.2 }}>
              {session?.user?.name}
            </p>
            <p style={{ fontSize: '11px', color: '#aaa', margin: 0, lineHeight: 1.2 }}>
              {session?.user?.role === 'ADMIN' ? 'Administrateur' : 'Utilisateur'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}