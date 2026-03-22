'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

type User = {
  id: string
  name: string | null
  email: string 
  role: string
  createdAt: Date
}

export default function UsersTable({ users, isAdmin, currentUserId, countLabel}: {  users: User[],
  isAdmin: boolean,
  currentUserId?: string,
  countLabel: { one: string; other: string }
}) {

  console.log('currentUserId recibido:', currentUserId)
  const t = useTranslations('users')
  const [filter, setFilter] = useState('all')
  const [list, setList] = useState(users)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const filtered = filter === 'all' ? list : list.filter(u => u.role === filter.toUpperCase())

  async function toggleRole(id: string, currentRole: string) {
    setLoadingId(id)
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN'
    const res = await fetch('/api/users/role', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role: newRole }),
    })
    if (res.ok) {
      setList(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u))
    }
    setLoadingId(null)
  }

  return (
    <div>
      {/*Header*/}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '2px',
          background: '#f5f5f7', borderRadius: '10px', padding: '3px',
        }}>
          {[
            { key: 'all', label: t('all') },
            { key: 'admin', label: 'Admin' },
            { key: 'user', label: 'User' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '6px 16px', borderRadius: '8px', border: 'none',
                background: filter === f.key ? '#fff' : 'transparent',
                color: filter === f.key ? '#0f0f1a' : '#999',
                fontSize: '13px', fontWeight: filter === f.key ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: filter === f.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                fontFamily: "'Instrument Sans', sans-serif",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '13px', color: '#bbb', fontWeight: 500 }}>
           {filtered.length} {filtered.length === 1 ? countLabel.one : countLabel.other}
        </span>
      </div>

      {/* Tabla */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              {[t('name'), t('email'), t('role'), t('joined'), t('status'), ...(isAdmin ? [t('actions')] : [])].map((col, i) => (
                <th key={i} style={{
                  textAlign: 'left', padding: '12px 16px',
                  fontSize: '11px', color: '#bbb', fontWeight: 600,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr
                key={user.id}
                style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8f8f8' : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Nombre + avatar */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                      background: user.role === 'ADMIN'
                        ? 'linear-gradient(135deg, #7c6fcd, #4f46e5)'
                        : 'linear-gradient(135deg, #4ade80, #16a34a)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, color: '#fff',
                    }}>
                      {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f1a' }}>
                      {user.name || '—'}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '13px', color: '#888' }}>{user.email}</span>
                </td>

                {/* Rol */}
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    fontSize: '12px', fontWeight: 600, padding: '4px 12px',
                    borderRadius: '999px',
                    background: user.role === 'ADMIN' ? '#f0eeff' : '#f0fdf4',
                    color: user.role === 'ADMIN' ? '#7c6fcd' : '#16a34a',
                  }}>
                    {user.role === 'ADMIN' ? 'Admin' : 'User'}
                  </span>
                </td>

                {/* Fecha */}
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '13px', color: '#bbb' }}>
                    {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </span>
                </td>

                {/* Status */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#4ade80',
                      boxShadow: '0 0 4px rgba(74,222,128,0.5)',
                    }} />
                    <span style={{ fontSize: '13px', color: '#888' }}>{t('active')}</span>
                  </div>
                </td>

                {/* Acciones */}
                {isAdmin && (
                  <td style={{ padding: '14px 16px' }}>
                      {user.id === currentUserId ? (
                      <span style={{
                        fontSize: '12px', color: '#ddd',
                        padding: '6px 14px', borderRadius: '8px',
                        border: '1.5px solid #f0f0f0',
                        background: '#fafafa',
                      }}>
                        —
                      </span>
                    ) : (
                      <button
                        onClick={() => toggleRole(user.id, user.role)}
                        disabled={loadingId === user.id}
                        style={{
                          fontSize: '12px', fontWeight: 500,
                          padding: '6px 14px', borderRadius: '8px',
                          border: '1.5px solid #e5e5e5',
                          background: 'transparent', color: '#666',
                          cursor: loadingId === user.id ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s',
                          fontFamily: "'Instrument Sans', sans-serif",
                          opacity: loadingId === user.id ? 0.5 : 1,
                        }}
                        onMouseEnter={e => {
                          if (loadingId !== user.id) {
                            e.currentTarget.style.background = '#7c6fcd'
                            e.currentTarget.style.color = '#fff'
                            e.currentTarget.style.borderColor = '#7c6fcd'
                          }
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#666'
                          e.currentTarget.style.borderColor = '#e5e5e5'
                        }}
                      >
                        {loadingId === user.id ? '...' : t('changeRole')}
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#ccc' }}>
            <p style={{ fontSize: '14px', margin: 0 }}>Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}