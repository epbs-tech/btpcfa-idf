"use client"

import type { User } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  FileText,
  Bell,
  UserIcon,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Heart,
  Home,
  Briefcase,
  ArrowRight,
} from "lucide-react"

interface ApprenticeDashboardProps {
  user: User
}

export function ApprenticeDashboard({ user }: ApprenticeDashboardProps) {
  // Mock data - replace with real data from API
  const upcomingEvents = [
    {
      id: "1",
      title: "Entretien de suivi",
      date: "2024-12-12",
      time: "14:00",
      type: "interview",
      location: "Bureau SSP - Bâtiment A",
    },
    {
      id: "2",
      title: "Atelier orientation professionnelle",
      date: "2024-12-15",
      time: "10:00",
      type: "workshop",
      location: "Salle de formation 2",
    },
  ]

  const questionnaires = [
    {
      id: "1",
      title: "Questionnaire de pré-orientation",
      status: "pending",
      dueDate: "2024-12-20",
      progress: 0,
    },
    {
      id: "2",
      title: "Évaluation situation personnelle",
      status: "in-progress",
      dueDate: "2024-12-25",
      progress: 60,
    },
    {
      id: "3",
      title: "Bilan de formation",
      status: "completed",
      dueDate: "2024-11-30",
      progress: 100,
    },
  ]

  const notifications = [
    {
      id: "1",
      title: "Nouveau questionnaire disponible",
      message: "Le questionnaire de pré-orientation est maintenant disponible",
      time: "Il y a 2 heures",
      type: "info",
      read: false,
    },
    {
      id: "2",
      title: "Rappel rendez-vous",
      message: "N'oubliez pas votre entretien de suivi demain à 14h",
      time: "Il y a 1 jour",
      type: "reminder",
      read: false,
    },
    {
      id: "3",
      title: "Questionnaire complété",
      message: "Votre bilan de formation a été validé",
      time: "Il y a 3 jours",
      type: "success",
      read: true,
    },
  ]

  const partnerResources = [
    {
      category: "Santé",
      icon: Heart,
      count: 12,
      description: "Centres de santé, médecins, psychologues",
    },
    {
      category: "Logement",
      icon: Home,
      count: 8,
      description: "Aide au logement, résidences étudiantes",
    },
    {
      category: "Emploi",
      icon: Briefcase,
      count: 15,
      description: "Offres d'emploi, conseils carrière",
    },
  ]

  const overallProgress = 75

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bonjour {user.name.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground mt-1">Voici un aperçu de votre progression et de vos prochaines étapes</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="text-lg font-semibold">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Progression générale
          </CardTitle>
          <CardDescription>Votre avancement dans le programme de suivi socio-professionnel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Excellent travail ! Vous avez complété la plupart de vos objectifs.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Events */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Prochains rendez-vous
            </CardTitle>
            <CardDescription>Vos événements à venir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("fr-FR")} à {event.time}
                  </p>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                </div>
                <Badge variant={event.type === "interview" ? "default" : "secondary"}>
                  {event.type === "interview" ? "Entretien" : "Atelier"}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Voir tous les rendez-vous
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {notifications.filter((n) => !n.read).length > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  notification.read ? "bg-muted/30" : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="flex items-start gap-2">
                  {notification.type === "info" && <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />}
                  {notification.type === "reminder" && <Clock className="h-4 w-4 text-orange-500 mt-0.5" />}
                  {notification.type === "success" && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                  <div className="flex-1">
                    <h5 className="text-sm font-medium">{notification.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full">
              Voir toutes les notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Questionnaires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Questionnaires
            </CardTitle>
            <CardDescription>Vos questionnaires en cours et à venir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questionnaires.map((questionnaire) => (
              <div key={questionnaire.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{questionnaire.title}</h4>
                  <Badge
                    variant={
                      questionnaire.status === "completed"
                        ? "default"
                        : questionnaire.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {questionnaire.status === "completed"
                      ? "Terminé"
                      : questionnaire.status === "in-progress"
                        ? "En cours"
                        : "À faire"}
                  </Badge>
                </div>
                {questionnaire.status !== "completed" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progression</span>
                      <span>{questionnaire.progress}%</span>
                    </div>
                    <Progress value={questionnaire.progress} className="h-1" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Échéance: {new Date(questionnaire.dueDate).toLocaleDateString("fr-FR")}
                </p>
              </div>
            ))}
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Accéder aux questionnaires
            </Button>
          </CardContent>
        </Card>

        {/* Partner Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Ressources partenaires
            </CardTitle>
            <CardDescription>Services et partenaires à votre disposition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {partnerResources.map((resource) => (
              <div key={resource.category} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <resource.icon className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{resource.category}</h4>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{resource.count}</p>
                  <p className="text-xs text-muted-foreground">services</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              <BookOpen className="mr-2 h-4 w-4" />
              Explorer les ressources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Accès direct aux fonctionnalités principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <UserIcon className="h-5 w-5" />
              <span className="text-sm">Mon profil</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Questionnaires</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Rendez-vous</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Ressources</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
