import { getTranslations, setRequestLocale } from 'next-intl/server'
import RegisterForm from '@/components/ui/RegisterForm'

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>
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
        error: t('error'),
        quote: t('registerQuote'),
        features: [
          t('registerFeature1'),
          t('registerFeature2'),
          t('registerFeature3'),
        ],
      }}
    />
  )
}