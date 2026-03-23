'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Labels = {
  title: string
  sub: string
  name: string
  email: string
  password: string
  btn: string
  hasAccount: string
  register: string
  error: string
  quote: string
  features: string[]
}

export default function RegisterForm({locale, labels}: { locale: string; labels: Labels}) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentLocale, setCurrentLocale] = useState(locale)

  useEffect(() => {
    setCurrentLocale(window.location.pathname.split('/')[1] || locale)
  }, [locale])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Error')
      setLoading(false)
      return
    }
    router.push(`/${currentLocale}/login`)
  }

  const inputStyle = {
    width: '100%', height: '44px', padding: '0 14px',
    borderRadius: '10px', border: '1.5px solid #e5e5e5',
    background: '#fff', color: '#0f0f1a', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.15s',
    boxSizing: 'border-box' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    fontFamily: "'Instrument Sans', sans-serif",
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8f7f4', fontFamily: "'Instrument Sans', sans-serif" }}>
      {/*Left dashboard*/}
      <div style={{
        width: '420px',
        background: '#1a1a2e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
        className="hidden lg:flex"
      >
        {/*Circles*/}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(124, 111, 205, 0.15)',
        }} />
        <div style={{
          position: 'absolute', bottom: '80px', left: '-40px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(74, 222, 128, 0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', right: '40px',
          width: '150px', height: '150px', borderRadius: '50%',
          background: 'rgba(124, 111, 205, 0.1)',
        }} />

        {/* Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c6fcd, #4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 700, color: '#fff',
            }}>G</div>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>
              GestiPro
            </span>
          </div>
        </div>

        {/* Quote */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '40px', height: '3px', borderRadius: '2px',
            background: 'linear-gradient(90deg, #7c6fcd, #4ade80)',
            marginBottom: '24px',
          }} />
          <p style={{
            fontSize: '22px', fontWeight: 500, color: '#fff',
            lineHeight: 1.4, letterSpacing: '-0.02em', marginBottom: '20px',
          }}>
            Gérez votre équipe avec clarté et efficacité.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '✦', text: 'Gestion des rôles Admin / User' },
              { icon: '✦', text: 'Interface FR · EN · ES' },
              { icon: '✦', text: 'Données en temps réel' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#7c6fcd', fontSize: '10px' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          <div className="lg:hidden" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c6fcd, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fff' }}>G</div>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', letterSpacing: '-0.02em' }}>GestiPro</span>
            </div>
          </div>

          {/* Language switcher */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#f0f0f0', borderRadius: '10px', padding: '3px' }}>
              {[
                { code: 'fr', label: 'FR' },
                { code: 'en', label: 'EN' },
                { code: 'es', label: 'ES' },
              ].map(lang => {
                const isActive = currentLocale === lang.code
                return (
                  <button
                    key={lang.code}
                    onClick={() => window.location.replace(`/${lang.code}/register`)}
                    style={{
                      padding: '5px 12px', borderRadius: '7px', border: 'none',
                      background: isActive ? '#fff' : 'transparent',
                      color: isActive ? '#0f0f1a' : '#999',
                      fontSize: '12px', fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer', transition: 'all 0.15s',
                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      fontFamily: "'Instrument Sans', sans-serif",
                    }}
                  >
                    {lang.label}
                  </button>
                )
              })}
            </div>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#0f0f1a', letterSpacing: '-0.03em', marginBottom: '6px' }}>
            {labels.title}
          </h1>
          <p style={{ fontSize: '15px', color: '#888', marginBottom: '32px' }}>
            {labels.sub}
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              {[
                { label: labels.name, value: name, setter: setName, type: 'text', placeholder: 'Alice Dupont' },
                { label: labels.email, value: email, setter: setEmail, type: 'email', placeholder: 'vous@exemple.com' },
                { label: labels.password, value: password, setter: setPassword, type: 'password', placeholder: '••••••••' },
              ].map(field => (
                <div key={field.type}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#444', marginBottom: '7px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#7c6fcd')}
                    onBlur={e => (e.target.style.borderColor = '#e5e5e5')}
                  />
                </div>
              ))}
            </div>

            {error && (
              <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}>
                <p style={{ fontSize: '13px', color: '#dc2626', margin: 0 }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: '46px',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #7c6fcd, #4f46e5)',
                color: '#fff', border: 'none', borderRadius: '10px',
                fontSize: '14px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.01em', transition: 'opacity 0.15s',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(124, 111, 205, 0.4)',
                fontFamily: "'Instrument Sans', sans-serif",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {loading ? '...' : labels.btn}
            </button>
          </form>

          <p style={{ fontSize: '13px', color: '#aaa', textAlign: 'center', marginTop: '24px' }}>
            {labels.hasAccount}{' '}
            <Link href={`/${currentLocale}/login`} style={{ color: '#7c6fcd', fontWeight: 500, textDecoration: 'none' }}>
              {labels.register}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}