import { getTranslations, setRequestLocale } from 'next-intl/server'
import RegisterForm from '@/components/ui/RegisterForm'

export default async function RegisterPage({
  params, //It receives the locale as a parameter from the URL, we need to set it for the translations to work
}: {
  params: Promise<{ locale: string }> //We define the type of the params, which is a promise that resolves to an object with a locale string
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('auth')

  return (
    <RegisterForm
      locale={locale}
      labels={{
        title: t('registerTitle'),
        sub: t('registerSub'),
        name: t('name'),
        email: t('email'),
        password: t('password'),
        btn: t('registerBtn'),
        hasAccount: t('hasAccount'),
        login: t('btn'),
        error: t('error')
      }}
    />
  )
}