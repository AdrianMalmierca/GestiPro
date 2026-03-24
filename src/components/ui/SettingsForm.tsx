'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

const langs = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
]

export default function SettingsForm({ session }: { session: Session | null }) {
  const t = useTranslations('settings')
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1]
  const [name, setName] = useState(session?.user?.name || '')
  const [saved, setSaved] = useState(false)

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    window.location.replace(segments.join('/'))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputStyle = {
    width: '100%', height: '44px', padding: '0 14px',
    borderRadius: '10px', border: '1.5px solid #e5e5e5',
    background: '#fff', color: '#0f0f1a', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.15s',
    boxSizing: 'border-box' as const,
    fontFamily: "'Instrument Sans', sans-serif",
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Name */}
      <div>
        <label style={{
          display: 'block', fontSize: '13px', fontWeight: 500,
          color: '#444', marginBottom: '7px',
        }}>
          {t('name')}
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#7c6fcd')}
          onBlur={e => (e.target.style.borderColor = '#e5e5e5')}
        />
      </div>

      {/* Email (disabled) */}
      <div>
        <label style={{
          display: 'block', fontSize: '13px', fontWeight: 500,
          color: '#444', marginBottom: '7px',
        }}>
          {t('email')}
        </label>
        <input
          type="email"
          value={session?.user?.email || ''}
          disabled
          style={{ ...inputStyle, background: '#fafafa', color: '#bbb', cursor: 'not-allowed', border: '1.5px solid #f0f0f0' }}
        />
      </div>

      {/* Idioma */}
      <div>
        <label style={{
          display: 'block', fontSize: '13px', fontWeight: 500,
          color: '#444', marginBottom: '10px',
        }}>
          {t('language')}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {langs.map(lang => {
            const isActive = currentLocale === lang.code
            return (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                style={{
                  flex: 1, padding: '10px 8px',
                  borderRadius: '10px', cursor: 'pointer',
                  border: isActive ? '1.5px solid #7c6fcd' : '1.5px solid #e5e5e5',
                  background: isActive ? '#f0eeff' : '#fff',
                  transition: 'all 0.15s',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '4px',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.borderColor = '#ccc'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.borderColor = '#e5e5e5'
                }}
              >
                <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                <span style={{
                  fontSize: '12px', fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#7c6fcd' : '#666',
                  fontFamily: "'Instrument Sans', sans-serif",
                }}>
                  {lang.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Botón guardar */}
      <button
        onClick={handleSave}
        style={{
          height: '44px', padding: '0 24px',
          background: saved
            ? 'linear-gradient(135deg, #16a34a, #15803d)'
            : 'linear-gradient(135deg, #7c6fcd, #4f46e5)',
          color: '#fff', border: 'none', borderRadius: '10px',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          transition: 'all 0.2s', width: '100%',
          boxShadow: saved
            ? '0 4px 14px rgba(22,163,74,0.3)'
            : '0 4px 14px rgba(124,111,205,0.3)',
          fontFamily: "'Instrument Sans', sans-serif",
          letterSpacing: '0.01em',
        }}
      >
        {saved ? `✓ ${t('saved')}` : t('save')}
      </button>
    </div>
  )
}