export interface Event {
  id: string
  title: string
  description?: string
  type: "interview" | "follow-up" | "meeting" | "workshop" | "assessment" | "other"
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  startDate: Date
  endDate: Date
  location?: string
  isVirtual: boolean
  meetingLink?: string
  attendees: {
    apprenticeId?: string
    sspId?: string
    adminId?: string
    externalAttendees?: string[]
  }
  createdBy: string
  createdAt: Date
  updatedAt: Date
  reminders: {
    email: boolean
    sms: boolean
    push: boolean
    reminderTime: number // minutes before event
  }
  notes?: string
}

export const eventTypes = [
  { value: "interview", label: "Entretien", color: "bg-blue-500" },
  { value: "follow-up", label: "Suivi", color: "bg-green-500" },
  { value: "meeting", label: "Réunion", color: "bg-purple-500" },
  { value: "workshop", label: "Atelier", color: "bg-orange-500" },
  { value: "assessment", label: "Évaluation", color: "bg-red-500" },
  { value: "other", label: "Autre", color: "bg-gray-500" },
]

export const eventStatuses = [
  { value: "scheduled", label: "Programmé", color: "text-blue-600" },
  { value: "completed", label: "Terminé", color: "text-green-600" },
  { value: "cancelled", label: "Annulé", color: "text-red-600" },
  { value: "rescheduled", label: "Reporté", color: "text-orange-600" },
]

// Mock data for demonstration
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Entretien initial - Marie Dubois",
    description: "Premier entretien de suivi socio-professionnel",
    type: "interview",
    status: "scheduled",
    startDate: new Date(2024, 11, 15, 10, 0),
    endDate: new Date(2024, 11, 15, 11, 0),
    location: "Bureau 201",
    isVirtual: false,
    attendees: {
      apprenticeId: "1",
      sspId: "1",
    },
    createdBy: "ssp-1",
    createdAt: new Date(2024, 11, 10),
    updatedAt: new Date(2024, 11, 10),
    reminders: {
      email: true,
      sms: true,
      push: true,
      reminderTime: 60,
    },
  },
  {
    id: "2",
    title: "Suivi mensuel - Jean Martin",
    description: "Point mensuel sur la progression",
    type: "follow-up",
    status: "completed",
    startDate: new Date(2024, 11, 12, 14, 0),
    endDate: new Date(2024, 11, 12, 15, 0),
    location: "Visioconférence",
    isVirtual: true,
    meetingLink: "https://meet.example.com/abc123",
    attendees: {
      apprenticeId: "2",
      sspId: "1",
    },
    createdBy: "ssp-1",
    createdAt: new Date(2024, 11, 5),
    updatedAt: new Date(2024, 11, 12),
    reminders: {
      email: true,
      sms: false,
      push: true,
      reminderTime: 30,
    },
    notes: "Progression satisfaisante, objectifs atteints",
  },
  {
    id: "3",
    title: "Atelier CV et Lettre de Motivation",
    description: "Atelier collectif pour améliorer les candidatures",
    type: "workshop",
    status: "scheduled",
    startDate: new Date(2024, 11, 20, 9, 0),
    endDate: new Date(2024, 11, 20, 12, 0),
    location: "Salle de formation A",
    isVirtual: false,
    attendees: {
      sspId: "1",
      externalAttendees: ["Groupe apprentis - Promotion 2024"],
    },
    createdBy: "admin-1",
    createdAt: new Date(2024, 11, 8),
    updatedAt: new Date(2024, 11, 8),
    reminders: {
      email: true,
      sms: true,
      push: true,
      reminderTime: 120,
    },
  },
]

export function getEventsByUser(userId: string, userRole: string): Event[] {
  return mockEvents.filter((event) => {
    switch (userRole) {
      case "apprentice":
        return event.attendees.apprenticeId === userId
      case "ssp":
        return event.attendees.sspId === userId || event.createdBy === userId
      case "admin":
        return true // Admins can see all events
      default:
        return false
    }
  })
}

export function getUpcomingEvents(userId: string, userRole: string, limit = 5): Event[] {
  const userEvents = getEventsByUser(userId, userRole)
  const now = new Date()

  return userEvents
    .filter((event) => event.startDate > now && event.status === "scheduled")
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, limit)
}

export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function formatEventTime(startDate: Date, endDate: Date): string {
  const timeFormat = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return `${timeFormat.format(startDate)} - ${timeFormat.format(endDate)}`
}
