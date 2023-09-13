import 'tailwindcss/tailwind.css'

import { Inter } from 'next/font/google'

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
