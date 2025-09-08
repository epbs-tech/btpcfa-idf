"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
} from "lucide-react"

export default function TrackingPage() {
  const { user } = useAuth()

  if (!user || user.role !== "ssp") {
    return <div>Accès non autorisé</div>
  }

  // Mock data for individual tracking
  const apprentices = [
    {
      id: 1,
      name: "Marie Dubois",
      avatar: "/avatars/marie.jpg",
      status: "at_risk",
      progress: 65,
      lastContact: "2024-01-15",
      nextAppointment: "2024-01-22",
      issues: ["Logement", "Transport"],
      questionnaires: { completed: 3, pending: 1 },
      notes: "Difficultés de transport récurrentes. Besoin d'accompagnement pour trouver une solution.",
    },
    {
      id: 2,
      name: "Thomas Martin",
      avatar: "/avatars/thomas.jpg",
      status: "on_track",
      progress: 85,
      lastContact: "2024-01-18",
      nextAppointment: "2024-01-25",
      issues: [],
      questionnaires: { completed: 4, pending: 0 },
      notes: "Excellent suivi, très motivé. Progression constante.",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      status: "needs_attention",
      progress: 45,
      lastContact: "2024-01-10",
      nextAppointment: "2024-01-20",
      issues: ["Santé", "Motivation"],
      questionnaires: { completed: 2, pending: 2 },
      notes: "Absences répétées. Rendez-vous médical programmé.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "bg-green-100 text-green-800"
      case "needs_attention":
        return "bg-yellow-100 text-yellow-800"
      case "at_risk":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "on_track":
        return "Sur la bonne voie"
      case "needs_attention":
        return "Attention requise"
      case "at_risk":
        return "À risque"
      default:
        return "Inconnu"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Suivi individuel</h1>
        <p className="text-muted-foreground">Suivi détaillé et personnalisé de vos apprentis</p>
      </div>

      <div className="grid gap-6">
        {apprentices.map((apprentice) => (
          <Card key={apprentice.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={apprentice.avatar || "/placeholder.svg"} alt={apprentice.name} />
                    <AvatarFallback>
                      {apprentice.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{apprentice.name}</CardTitle>
                    <CardDescription>
                      Dernier contact: {new Date(apprentice.lastContact).toLocaleDateString("fr-FR")}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(apprentice.status)}>{getStatusLabel(apprentice.status)}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="progress">Progression</TabsTrigger>
                  <TabsTrigger value="issues">Problématiques</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Progression</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-2xl font-bold">{apprentice.progress}%</div>
                          <Progress value={apprentice.progress} className="mt-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Questionnaires</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-2xl font-bold">
                            {apprentice.questionnaires.completed}/
                            {apprentice.questionnaires.completed + apprentice.questionnaires.pending}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {apprentice.questionnaires.pending} en attente
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Prochain RDV</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm font-bold">
                            {new Date(apprentice.nextAppointment).toLocaleDateString("fr-FR")}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Dans{" "}
                            {Math.ceil(
                              (new Date(apprentice.nextAppointment).getTime() - new Date().getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}{" "}
                            jours
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Notes de suivi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{apprentice.notes}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Progression générale</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Formation technique</span>
                              <span>80%</span>
                            </div>
                            <Progress value={80} className="mt-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Compétences sociales</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="mt-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Autonomie</span>
                              <span>50%</span>
                            </div>
                            <Progress value={50} className="mt-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Objectifs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Obtenir le permis de conduire</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">Trouver un logement stable</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">Améliorer la ponctualité</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="issues" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <span>Problématiques identifiées</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {apprentice.issues.length > 0 ? (
                            apprentice.issues.map((issue, index) => (
                              <Badge key={index} variant="destructive" className="mr-2">
                                {issue}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucune problématique identifiée</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Solutions proposées</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <strong>Logement:</strong> Mise en relation avec le CROUS
                          </div>
                          <div className="text-sm">
                            <strong>Transport:</strong> Information sur les aides à la mobilité
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Envoyer un message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Programmer un appel
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer un email
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Planifier un RDV
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Historique des actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Entretien téléphonique</p>
                            <p className="text-xs text-muted-foreground">
                              15 janvier 2024 - Discussion sur les difficultés de transport
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Questionnaire complété</p>
                            <p className="text-xs text-muted-foreground">
                              12 janvier 2024 - Évaluation de la situation personnelle
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Rendez-vous en présentiel</p>
                            <p className="text-xs text-muted-foreground">8 janvier 2024 - Bilan de mi-parcours</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
