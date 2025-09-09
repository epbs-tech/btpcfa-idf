import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { League_Spartan } from "next/font/google"
import { AuthProvider } from "@/hooks/use-auth"
import { Suspense } from "react"
import "./globals.css"
import { DevicePreviewProvider } from '@/components/device-preview/device-preview-provider'
import { DevicePreviewWrapper } from "@/components/device-preview/device-preview-wrapper"

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

export const metadata: Metadata = {
  title: "BTP CFA IDF - Maquette Démo",
  description: "Application de suivi éducatif et socio-professionnel pour les apprentis du BTP CFA Île-de-France",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${montserrat.variable} ${leagueSpartan.className} antialiased`}>
        <DevicePreviewProvider>
          <DevicePreviewWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              <AuthProvider>{children}</AuthProvider>
            </Suspense>
          </DevicePreviewWrapper>
        </DevicePreviewProvider>
      </body>
    </html>
  )
}
