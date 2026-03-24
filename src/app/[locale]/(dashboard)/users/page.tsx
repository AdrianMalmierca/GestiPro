import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTranslations, getLocale, setRequestLocale} from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import UsersTable from '@/components/ui/UsersTable'

export const dynamic = 'force-dynamic'

export default async function UsersPage({ params,
}: {
  params: Promise<{ locale: string }>
}) {

  const { locale } = await params
  setRequestLocale(locale)

  const session = await getServerSession(authOptions)

  //console.log('👤 SESSION USER:', session?.user)

  const t = await getTranslations('users')
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })

  //console.log('👥 USERS PAGE LOCALE:', await getLocale())

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-semibold" style={{ fontSize: '22px', letterSpacing: '-0.02em', color: '#0f0f0f' }}>
          {t('title')}
        </h1>
        <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>
          {t('subtitle')}
        </p>
      </div>

      <div className="rounded-xl p-6" style={{ background: '#fff', border: '1px solid #ebebeb' }}>
        <UsersTable
          users={users}
          isAdmin={session?.user?.role === 'ADMIN'}
          currentUserId={session?.user?.id}
          countLabel={{ one: t('count_one'), other: t('count_other') }}
        />
      </div>
    </div>
  )
}