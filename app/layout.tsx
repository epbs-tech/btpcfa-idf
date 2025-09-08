import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { League_Spartan } from "next/font/google"
// import { league } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/hooks/use-auth"
import { Suspense } from "react"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-montserrat",
})

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-league-spartan",
})

// const openSans = Open_Sans({
//   subsets: ["latin"],
//   weight: ["400", "600"],
//   variable: "--font-open-sans",
// })

export const metadata: Metadata = {
  title: "BTP CFA IDF - Suivi Socio-Professionnel",
  description: "Application de suivi socio-professionnel pour les apprentis du BTP CFA Île-de-France",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${montserrat.variable} ${leagueSpartan.className} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
