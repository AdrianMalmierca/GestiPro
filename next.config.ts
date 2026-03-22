//This file enable internationalization in the Next.js and configure the routes by language.
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
}

export default withNextIntl(nextConfig)