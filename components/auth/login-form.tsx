"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    const success = await login(email, password)
    if (!success) {
      setError("Email ou mot de passe incorrect")
    }
  }

  const demoAccounts = [
    { email: "apprentice@btpcfa.fr", role: "Apprenti(e)", password: "demo" },
    { email: "ssp@btpcfa.fr", role: "Service Socio-Pro", password: "demo" },
    { email: "admin@btpcfa.fr", role: "Administrateur", password: "demo" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 rounded-lg">
              <Image
                src="/logo-btp-cfa.png"
                alt="Logo BTP CFA"
                width={48}
                height={48}
                className="h-12 w-full"
              />
            </div>
          </div>
          {/* <h1 className="text-2xl font-bold text-foreground">BTP CFA IDF</h1> */}
          <p className="text-muted-foreground">Suivi Educatif et Socio-Professionnel</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>Connectez-vous à votre espace personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@btpcfa.fr"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-sm">Comptes de démonstration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs bg-transparent"
                onClick={() => {
                  setEmail(account.email)
                  setPassword(account.password)
                }}
              >
                <span className="font-medium">{account.role}</span>
                <span className="ml-auto text-muted-foreground">{account.email}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
