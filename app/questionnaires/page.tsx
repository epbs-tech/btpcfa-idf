"use client"

import { useAuth } from "@/hooks/use-auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getQuestionnairesForUser, getUserResponses, getResponseByQuestionnaireAndUser } from "@/lib/questionnaires"
import { FileText, Clock, CheckCircle, AlertCircle, Play, Eye, Calendar } from "lucide-react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function QuestionnairesPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const availableQuestionnaires = getQuestionnairesForUser(user.id, user.role)
  const userResponses = getUserResponses(user.id)

  const getQuestionnaireStatus = (questionnaireId: string) => {
    const response = getResponseByQuestionnaireAndUser(questionnaireId, user.id)
    if (!response) return { status: "not-started", progress: 0 }
    return { status: response.status, progress: response.progress }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Terminé
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            En cours
          </Badge>
        )
      case "not-started":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />À faire
          </Badge>
        )
      default:
        return null
    }
  }

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "pre-guidance":
        return "Pré-orientation"
      case "personal-situation":
        return "Situation personnelle"
      case "formation-evaluation":
        return "Évaluation formation"
      case "follow-up":
        return "Suivi"
      case "custom":
        return "Personnalisé"
      default:
        return category
    }
  }

  const notStarted = availableQuestionnaires.filter((q) => getQuestionnaireStatus(q.id).status === "not-started")
  const inProgress = availableQuestionnaires.filter((q) => getQuestionnaireStatus(q.id).status === "in-progress")
  const completed = availableQuestionnaires.filter((q) => getQuestionnaireStatus(q.id).status === "completed")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Questionnaires</h1>
                <p className="text-muted-foreground mt-1">Complétez vos questionnaires pour un meilleur suivi</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{availableQuestionnaires.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">À faire</CardTitle>
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{notStarted.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">En cours</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{inProgress.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Terminés</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{completed.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Questionnaires Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Tous ({availableQuestionnaires.length})</TabsTrigger>
                <TabsTrigger value="todo">À faire ({notStarted.length})</TabsTrigger>
                <TabsTrigger value="progress">En cours ({inProgress.length})</TabsTrigger>
                <TabsTrigger value="completed">Terminés ({completed.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {availableQuestionnaires.map((questionnaire) => {
                    const { status, progress } = getQuestionnaireStatus(questionnaire.id)
                    return (
                      <Card key={questionnaire.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{questionnaire.title}</CardTitle>
                              <CardDescription>{questionnaire.description}</CardDescription>
                            </div>
                            {getStatusBadge(status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {questionnaire.estimatedDuration} min
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {questionnaire.questions.length} questions
                            </div>
                            <Badge variant="outline" size="sm">
                              {getCategoryDisplayName(questionnaire.category)}
                            </Badge>
                          </div>

                          {status !== "not-started" && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progression</span>
                                <span>{progress}%</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          )}

                          <div className="flex gap-2">
                            {status === "not-started" && (
                              <Button asChild className="flex-1">
                                <Link href={`/questionnaires/${questionnaire.id}`}>
                                  <Play className="mr-2 h-4 w-4" />
                                  Commencer
                                </Link>
                              </Button>
                            )}
                            {status === "in-progress" && (
                              <Button asChild className="flex-1">
                                <Link href={`/questionnaires/${questionnaire.id}`}>
                                  <Play className="mr-2 h-4 w-4" />
                                  Continuer
                                </Link>
                              </Button>
                            )}
                            {status === "completed" && (
                              <Button asChild variant="outline" className="flex-1 bg-transparent">
                                <Link href={`/questionnaires/${questionnaire.id}/results`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir les résultats
                                </Link>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="todo" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {notStarted.map((questionnaire) => {
                    const { status, progress } = getQuestionnaireStatus(questionnaire.id)
                    return (
                      <Card key={questionnaire.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{questionnaire.title}</CardTitle>
                              <CardDescription>{questionnaire.description}</CardDescription>
                            </div>
                            {getStatusBadge(status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {questionnaire.estimatedDuration} min
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {questionnaire.questions.length} questions
                            </div>
                            <Badge variant="outline" size="sm">
                              {getCategoryDisplayName(questionnaire.category)}
                            </Badge>
                          </div>

                          <Button asChild className="w-full">
                            <Link href={`/questionnaires/${questionnaire.id}`}>
                              <Play className="mr-2 h-4 w-4" />
                              Commencer
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {inProgress.map((questionnaire) => {
                    const { status, progress } = getQuestionnaireStatus(questionnaire.id)
                    return (
                      <Card key={questionnaire.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{questionnaire.title}</CardTitle>
                              <CardDescription>{questionnaire.description}</CardDescription>
                            </div>
                            {getStatusBadge(status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {questionnaire.estimatedDuration} min
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {questionnaire.questions.length} questions
                            </div>
                            <Badge variant="outline" size="sm">
                              {getCategoryDisplayName(questionnaire.category)}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progression</span>
                              <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <Button asChild className="w-full">
                            <Link href={`/questionnaires/${questionnaire.id}`}>
                              <Play className="mr-2 h-4 w-4" />
                              Continuer
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {completed.map((questionnaire) => {
                    const { status, progress } = getQuestionnaireStatus(questionnaire.id)
                    const response = getResponseByQuestionnaireAndUser(questionnaire.id, user.id)
                    return (
                      <Card key={questionnaire.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{questionnaire.title}</CardTitle>
                              <CardDescription>{questionnaire.description}</CardDescription>
                            </div>
                            {getStatusBadge(status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Terminé le{" "}
                              {response?.completedAt && new Date(response.completedAt).toLocaleDateString("fr-FR")}
                            </div>
                            <Badge variant="outline" size="sm">
                              {getCategoryDisplayName(questionnaire.category)}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progression</span>
                              <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <Button asChild variant="outline" className="w-full bg-transparent">
                            <Link href={`/questionnaires/${questionnaire.id}/results`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir les résultats
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
