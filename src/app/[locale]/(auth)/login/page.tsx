import { getTranslations, setRequestLocale } from 'next-intl/server'
import LoginForm from '@/components/ui/LoginForm'

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('auth')

  return (
    <LoginForm
      locale={locale}
      labels={{
        title: t('title'),
        sub: t('sub'),
        email: t('email'),
        password: t('password'),
        btn: t('btn'),
        noAccount: t('noAccount'),
        register: t('register'),
        error: t('error'),
        switchLang: t('switchLang'),
      }}
    />
  )
}