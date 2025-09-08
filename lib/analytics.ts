export interface AnalyticsData {
  apprentices: {
    total: number
    active: number
    atRisk: number
    completed: number
    byRegion: { region: string; count: number }[]
    byStatus: { status: string; count: number }[]
    progressDistribution: { range: string; count: number }[]
  }
  questionnaires: {
    totalResponses: number
    completionRate: number
    averageScore: number
    byType: { type: string; responses: number; avgScore: number }[]
    responsesTrend: { month: string; responses: number }[]
  }
  events: {
    totalEvents: number
    completedEvents: number
    attendanceRate: number
    byType: { type: string; count: number; attendance: number }[]
    monthlyTrend: { month: string; scheduled: number; completed: number }[]
  }
  engagement: {
    dailyActiveUsers: number
    weeklyActiveUsers: number
    monthlyActiveUsers: number
    sessionDuration: number
    pageViews: number
    userActivityTrend: { date: string; users: number }[]
  }
}

// Mock analytics data
export const mockAnalyticsData: AnalyticsData = {
  apprentices: {
    total: 1247,
    active: 1089,
    atRisk: 89,
    completed: 69,
    byRegion: [
      { region: "Île-de-France", count: 456 },
      { region: "Auvergne-Rhône-Alpes", count: 234 },
      { region: "Nouvelle-Aquitaine", count: 189 },
      { region: "Occitanie", count: 156 },
      { region: "Hauts-de-France", count: 134 },
      { region: "Autres", count: 78 },
    ],
    byStatus: [
      { status: "En formation", count: 789 },
      { status: "En recherche", count: 234 },
      { status: "En emploi", count: 156 },
      { status: "À risque", count: 68 },
    ],
    progressDistribution: [
      { range: "0-25%", count: 123 },
      { range: "26-50%", count: 234 },
      { range: "51-75%", count: 456 },
      { range: "76-100%", count: 434 },
    ],
  },
  questionnaires: {
    totalResponses: 3456,
    completionRate: 87.3,
    averageScore: 7.2,
    byType: [
      { type: "Pré-orientation", responses: 1234, avgScore: 7.8 },
      { type: "Situation personnelle", responses: 987, avgScore: 6.9 },
      { type: "Compétences", responses: 756, avgScore: 7.5 },
      { type: "Motivation", responses: 479, avgScore: 8.1 },
    ],
    responsesTrend: [
      { month: "Jan", responses: 234 },
      { month: "Fév", responses: 267 },
      { month: "Mar", responses: 298 },
      { month: "Avr", responses: 312 },
      { month: "Mai", responses: 345 },
      { month: "Jun", responses: 389 },
      { month: "Jul", responses: 423 },
      { month: "Aoû", responses: 398 },
      { month: "Sep", responses: 456 },
      { month: "Oct", responses: 478 },
      { month: "Nov", responses: 512 },
      { month: "Déc", responses: 534 },
    ],
  },
  events: {
    totalEvents: 2345,
    completedEvents: 1987,
    attendanceRate: 84.7,
    byType: [
      { type: "Entretiens", count: 789, attendance: 92.3 },
      { type: "Suivis", count: 654, attendance: 88.7 },
      { type: "Ateliers", count: 432, attendance: 76.2 },
      { type: "Réunions", count: 298, attendance: 81.4 },
      { type: "Évaluations", count: 172, attendance: 95.1 },
    ],
    monthlyTrend: [
      { month: "Jan", scheduled: 156, completed: 134 },
      { month: "Fév", scheduled: 178, completed: 152 },
      { month: "Mar", scheduled: 203, completed: 176 },
      { month: "Avr", scheduled: 189, completed: 161 },
      { month: "Mai", scheduled: 234, completed: 198 },
      { month: "Jun", scheduled: 267, completed: 223 },
      { month: "Jul", scheduled: 198, completed: 167 },
      { month: "Aoû", scheduled: 145, completed: 123 },
      { month: "Sep", scheduled: 289, completed: 245 },
      { month: "Oct", scheduled: 312, completed: 267 },
      { month: "Nov", scheduled: 298, completed: 254 },
      { month: "Déc", scheduled: 276, completed: 234 },
    ],
  },
  engagement: {
    dailyActiveUsers: 456,
    weeklyActiveUsers: 1234,
    monthlyActiveUsers: 3456,
    sessionDuration: 18.5,
    pageViews: 12456,
    userActivityTrend: [
      { date: "01/12", users: 234 },
      { date: "02/12", users: 267 },
      { date: "03/12", users: 298 },
      { date: "04/12", users: 312 },
      { date: "05/12", users: 345 },
      { date: "06/12", users: 389 },
      { date: "07/12", users: 423 },
      { date: "08/12", users: 398 },
      { date: "09/12", users: 456 },
      { date: "10/12", users: 478 },
      { date: "11/12", users: 512 },
      { date: "12/12", users: 534 },
    ],
  },
}

export function getAnalyticsForRole(role: string): Partial<AnalyticsData> {
  switch (role) {
    case "admin":
      return mockAnalyticsData // Full access
    case "ssp":
      return {
        apprentices: mockAnalyticsData.apprentices,
        questionnaires: mockAnalyticsData.questionnaires,
        events: mockAnalyticsData.events,
      }
    case "apprentice":
      return {
        engagement: mockAnalyticsData.engagement,
      }
    default:
      return {}
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"
  }
  return num.toString()
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`
}

export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}
