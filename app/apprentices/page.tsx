"use client"

import { useAuth } from "@/hooks/use-auth"
import { hasRole } from "@/lib/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Plus, Users, Eye, Calendar, MessageSquare, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"

export default function ApprenticesPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || !hasRole(user, ["ssp", "admin"])) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Accès non autorisé. Cette page est réservée aux SSP et administrateurs.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mock data - replace with real data from API
  const apprentices = [
    {
      id: "1",
      name: "Marie Dubois",
      email: "marie.dubois@btpcfa.fr",
      program: "CAP Maçonnerie",
      progress: 85,
      status: "active",
      lastContact: "2024-12-10",
      nextAppointment: "2024-12-12",
      riskLevel: "low",
      questionnairesCompleted: 3,
      questionnairesTotal: 4,
      phone: "06 12 34 56 78",
      company: "Entreprise Martin BTP",
    },
    {
      id: "2",
      name: "Thomas Martin",
      email: "thomas.martin@btpcfa.fr",
      program: "BAC PRO Électricité",
      progress: 45,
      status: "at-risk",
      lastContact: "2024-11-28",
      nextAppointment: null,
      riskLevel: "high",
      questionnairesCompleted: 1,
      questionnairesTotal: 4,
      phone: "06 98 76 54 32",
      company: "Électricité Moderne SARL",
    },
    {
      id: "3",
      name: "Sophie Laurent",
      email: "sophie.laurent@btpcfa.fr",
      program: "BTS Bâtiment",
      progress: 92,
      status: "active",
      lastContact: "2024-12-09",
      nextAppointment: "2024-12-15",
      riskLevel: "low",
      questionnairesCompleted: 4,
      questionnairesTotal: 4,
      phone: "06 11 22 33 44",
      company: "Construction Durable SA",
    },
  ]

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "at-risk":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Mes apprentis</h1>
                <p className="text-muted-foreground mt-1">Gérez et suivez vos apprentis</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un apprenti
              </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{apprentices.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Actifs</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {apprentices.filter((a) => a.status === "active").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">À risque</CardTitle>
                  <Users className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {apprentices.filter((a) => a.riskLevel === "high").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Progression moy.</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(apprentices.reduce((sum, a) => sum + a.progress, 0) / apprentices.length)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un apprenti..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
            </div>

            {/* Apprentices Grid */}
            <div className="grid gap-6">
              {apprentices.map((apprentice) => (
                <Card key={apprentice.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-lg">
                            {apprentice.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold">{apprentice.name}</h3>
                          <p className="text-muted-foreground">{apprentice.program}</p>
                          <p className="text-sm text-muted-foreground">{apprentice.email}</p>
                          <p className="text-sm text-muted-foreground">{apprentice.phone}</p>
                          <p className="text-sm text-muted-foreground font-medium">{apprentice.company}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-8">
                        {/* Progress */}
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">{apprentice.progress}%</div>
                          <Progress value={apprentice.progress} className="w-24 h-2 mb-2" />
                          <p className="text-xs text-muted-foreground">Progression</p>
                        </div>

                        {/* Questionnaires */}
                        <div className="text-center">
                          <div className="text-lg font-semibold mb-1">
                            {apprentice.questionnairesCompleted}/{apprentice.questionnairesTotal}
                          </div>
                          <p className="text-xs text-muted-foreground">Questionnaires</p>
                        </div>

                        {/* Status and Risk */}
                        <div className="flex flex-col gap-2">
                          <Badge variant={getStatusBadgeVariant(apprentice.status)}>
                            {apprentice.status === "active"
                              ? "Actif"
                              : apprentice.status === "at-risk"
                                ? "À risque"
                                : "Inactif"}
                          </Badge>
                          <Badge variant={getRiskBadgeVariant(apprentice.riskLevel)} size="sm">
                            Risque{" "}
                            {apprentice.riskLevel === "high"
                              ? "élevé"
                              : apprentice.riskLevel === "medium"
                                ? "moyen"
                                : "faible"}
                          </Badge>
                        </div>

                        {/* Contact Info */}
                        <div className="text-right">
                          <p className="text-sm font-medium">Dernier contact</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(apprentice.lastContact).toLocaleDateString("fr-FR")}
                          </p>
                          {apprentice.nextAppointment && (
                            <>
                              <p className="text-sm font-medium mt-2">Prochain RDV</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(apprentice.nextAppointment).toLocaleDateString("fr-FR")}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir le profil complet
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Programmer un rendez-vous
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Envoyer un message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier les informations
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
