import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const locale = await getLocale()

  if (!session) redirect(`/${locale}/login`)

  return (
    <div className="flex min-h-screen" style={{ background: '#fafafa' }}>
      <Sidebar session={session} />
      <div className="flex flex-col flex-1" style={{ marginLeft: '224px' }}>
        <Topbar session={session} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}