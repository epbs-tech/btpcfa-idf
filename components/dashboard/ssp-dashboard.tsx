"use client"

import type { User } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Calendar,
  FileText,
  BarChart3,
  MessageSquare,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  CalendarPlus,
  Send,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SSPDashboardProps {
  user: User
}

export function SSPDashboard({ user }: SSPDashboardProps) {
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
    },
    {
      id: "4",
      name: "Lucas Moreau",
      email: "lucas.moreau@btpcfa.fr",
      program: "CAP Plomberie",
      progress: 30,
      status: "inactive",
      lastContact: "2024-11-15",
      nextAppointment: null,
      riskLevel: "high",
      questionnairesCompleted: 0,
      questionnairesTotal: 4,
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Entretien Marie Dubois",
      date: "2024-12-12",
      time: "14:00",
      type: "interview",
      apprentice: "Marie Dubois",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Entretien Sophie Laurent",
      date: "2024-12-15",
      time: "10:00",
      type: "interview",
      apprentice: "Sophie Laurent",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Atelier orientation groupe A",
      date: "2024-12-18",
      time: "09:00",
      type: "workshop",
      apprentice: "Groupe A",
      status: "pending",
    },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "questionnaire_completed",
      message: "Marie Dubois a complété le questionnaire de pré-orientation",
      time: "Il y a 2 heures",
      apprentice: "Marie Dubois",
    },
    {
      id: "2",
      type: "appointment_scheduled",
      message: "Rendez-vous programmé avec Sophie Laurent",
      time: "Il y a 4 heures",
      apprentice: "Sophie Laurent",
    },
    {
      id: "3",
      type: "risk_alert",
      message: "Thomas Martin n'a pas répondu aux derniers messages",
      time: "Il y a 1 jour",
      apprentice: "Thomas Martin",
    },
  ]

  const stats = {
    totalApprentices: apprentices.length,
    activeApprentices: apprentices.filter((a) => a.status === "active").length,
    atRiskApprentices: apprentices.filter((a) => a.riskLevel === "high").length,
    completedQuestionnaires: apprentices.reduce((sum, a) => sum + a.questionnairesCompleted, 0),
    upcomingAppointments: upcomingEvents.filter((e) => e.status === "confirmed").length,
  }

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord SSP</h1>
          <p className="text-muted-foreground mt-1">Bienvenue {user.name}, gérez vos apprentis et leur suivi</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Nouveau rendez-vous
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Envoyer notification
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total apprentis</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApprentices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeApprentices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">À risque</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.atRiskApprentices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questionnaires</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.completedQuestionnaires}</div>
            <p className="text-xs text-muted-foreground">complétés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RDV prévus</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.upcomingAppointments}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="apprentices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="apprentices">Mes apprentis</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
          <TabsTrigger value="activities">Activités récentes</TabsTrigger>
        </TabsList>

        <TabsContent value="apprentices" className="space-y-4">
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

          {/* Apprentices List */}
          <div className="grid gap-4">
            {apprentices.map((apprentice) => (
              <Card key={apprentice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {apprentice.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{apprentice.name}</h3>
                        <p className="text-sm text-muted-foreground">{apprentice.program}</p>
                        <p className="text-xs text-muted-foreground">{apprentice.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Progress */}
                      <div className="text-center">
                        <p className="text-sm font-medium">{apprentice.progress}%</p>
                        <Progress value={apprentice.progress} className="w-20 h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Progression</p>
                      </div>

                      {/* Questionnaires */}
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {apprentice.questionnairesCompleted}/{apprentice.questionnairesTotal}
                        </p>
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

                      {/* Last Contact */}
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {new Date(apprentice.lastContact).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-xs text-muted-foreground">Dernier contact</p>
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
                            Voir le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Programmer RDV
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Envoyer message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Prochains rendez-vous
              </CardTitle>
              <CardDescription>Gérez vos rendez-vous et événements à venir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("fr-FR")} à {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground">Avec: {event.apprentice}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>
                      {event.status === "confirmed" ? "Confirmé" : "En attente"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un rendez-vous
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Progression moyenne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(apprentices.reduce((sum, a) => sum + a.progress, 0) / apprentices.length)}%
                </div>
                <p className="text-sm text-muted-foreground">Progression moyenne de vos apprentis</p>
                <div className="mt-4">
                  <Progress
                    value={apprentices.reduce((sum, a) => sum + a.progress, 0) / apprentices.length}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Taux de complétion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((stats.completedQuestionnaires / (apprentices.length * 4)) * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">Questionnaires complétés</p>
                <div className="mt-4">
                  <Progress value={(stats.completedQuestionnaires / (apprentices.length * 4)) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Répartition par niveau de risque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Risque faible</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(apprentices.filter((a) => a.riskLevel === "low").length / apprentices.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {apprentices.filter((a) => a.riskLevel === "low").length}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Risque élevé</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${(apprentices.filter((a) => a.riskLevel === "high").length / apprentices.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {apprentices.filter((a) => a.riskLevel === "high").length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Activités récentes
              </CardTitle>
              <CardDescription>Dernières actions et événements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    {activity.type === "questionnaire_completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.type === "appointment_scheduled" && <Calendar className="h-4 w-4 text-blue-600" />}
                    {activity.type === "risk_alert" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.apprentice} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
