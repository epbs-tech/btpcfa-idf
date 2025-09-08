"use client"

import { useAuth } from "@/hooks/use-auth"
import { getAnalyticsForRole, formatNumber, formatPercentage } from "@/lib/analytics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ApprenticesByRegionChart,
  ApprenticeStatusPieChart,
  QuestionnaireResponsesTrendChart,
  EventsCompletionChart,
  UserActivityChart,
  QuestionnaireTypeChart,
} from "@/components/analytics/analytics-charts"
import {
  BarChart3,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function AnalyticsPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Chargement...</div>
  }

  const analyticsData = getAnalyticsForRole(user.role)

  const handleExportReport = () => {
    // TODO: Implement report export
    console.log("Export analytics report")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Analyses et rapports</h1>
            <p className="text-muted-foreground mt-2">Tableaux de bord et métriques de performance</p>
          </div>
          {(user.role === "admin" || user.role === "ssp") && (
            <Button onClick={handleExportReport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter le rapport
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics Cards */}
      {analyticsData.apprentices && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Apprentis</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.apprentices.total)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Apprentis Actifs</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.apprentices.active)}</div>
              <p className="text-xs text-muted-foreground">
                {formatPercentage((analyticsData.apprentices.active / analyticsData.apprentices.total) * 100)} du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">À Risque</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{analyticsData.apprentices.atRisk}</div>
              <p className="text-xs text-muted-foreground">Nécessitent un suivi prioritaire</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations Terminées</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{analyticsData.apprentices.completed}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> ce trimestre
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Questionnaire Metrics */}
      {analyticsData.questionnaires && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réponses Totales</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.questionnaires.totalResponses)}</div>
              <p className="text-xs text-muted-foreground">Questionnaires complétés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Completion</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(analyticsData.questionnaires.completionRate)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3.2%</span> ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.questionnaires.averageScore}/10</div>
              <p className="text-xs text-muted-foreground">Satisfaction générale</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Event Metrics */}
      {analyticsData.events && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Événements Totaux</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.events.totalEvents)}</div>
              <p className="text-xs text-muted-foreground">Cette année</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Événements Terminés</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.events.completedEvents)}</div>
              <p className="text-xs text-muted-foreground">
                {formatPercentage((analyticsData.events.completedEvents / analyticsData.events.totalEvents) * 100)} du
                total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Présence</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(analyticsData.events.attendanceRate)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> ce mois
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      <div className="space-y-8">
        {analyticsData.apprentices && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ApprenticesByRegionChart
                data={analyticsData.apprentices.byRegion}
                title="Répartition par Région"
                description="Distribution géographique des apprentis"
              />
              <ApprenticeStatusPieChart
                data={analyticsData.apprentices.byStatus}
                title="Statuts des Apprentis"
                description="Répartition par statut actuel"
              />
            </div>
          </>
        )}

        {analyticsData.questionnaires && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuestionnaireResponsesTrendChart
              data={analyticsData.questionnaires.responsesTrend}
              title="Évolution des Réponses"
              description="Nombre de questionnaires complétés par mois"
            />
            <QuestionnaireTypeChart
              data={analyticsData.questionnaires.byType}
              title="Réponses par Type"
              description="Distribution des questionnaires par catégorie"
            />
          </div>
        )}

        {analyticsData.events && (
          <EventsCompletionChart
            data={analyticsData.events.monthlyTrend}
            title="Suivi des Événements"
            description="Événements programmés vs terminés par mois"
          />
        )}

        {analyticsData.engagement && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserActivityChart
              data={analyticsData.engagement.userActivityTrend}
              title="Activité des Utilisateurs"
              description="Nombre d'utilisateurs actifs par jour"
            />
            <Card>
              <CardHeader>
                <CardTitle>Métriques d'Engagement</CardTitle>
                <p className="text-sm text-muted-foreground">Statistiques d'utilisation de la plateforme</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Utilisateurs actifs quotidiens</span>
                    <Badge variant="secondary">{formatNumber(analyticsData.engagement.dailyActiveUsers)}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Utilisateurs actifs hebdomadaires</span>
                    <Badge variant="secondary">{formatNumber(analyticsData.engagement.weeklyActiveUsers)}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Utilisateurs actifs mensuels</span>
                    <Badge variant="secondary">{formatNumber(analyticsData.engagement.monthlyActiveUsers)}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Durée moyenne de session</span>
                    <Badge variant="secondary">{analyticsData.engagement.sessionDuration} min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pages vues ce mois</span>
                    <Badge variant="secondary">{formatNumber(analyticsData.engagement.pageViews)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
