"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { EventCalendar } from "@/components/events/event-calendar"
import { type Event, getEventsByUser } from "@/lib/events"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Video, Edit, Trash2 } from "lucide-react"

export default function EventsPage() {
  const { user } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventDialog, setShowEventDialog] = useState(false)

  if (!user) {
    return <div>Chargement...</div>
  }

  const userEvents = getEventsByUser(user.id, user.role)
  const canCreateEvents = user.role === "ssp" || user.role === "admin"
  const canEditEvents = user.role === "ssp" || user.role === "admin"

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setShowEventDialog(true)
  }

  const handleCreateEvent = () => {
    // TODO: Implement event creation
    console.log("Create new event")
  }

  const formatEventDate = (date: Date): string => {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getEventTypeLabel = (type: string) => {
    const eventType = {
      interview: "Entretien",
      "follow-up": "Suivi",
      meeting: "Réunion",
      workshop: "Atelier",
      assessment: "Évaluation",
      other: "Autre",
    }[type]
    return eventType || type
  }

  const getEventStatusLabel = (status: string) => {
    const eventStatus = {
      scheduled: "Programmé",
      completed: "Terminé",
      cancelled: "Annulé",
      rescheduled: "Reporté",
    }[status]
    return eventStatus || status
  }

  const getEventStatusColor = (status: string) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      rescheduled: "bg-orange-100 text-orange-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-balance">Gestion des événements</h1>
        <p className="text-muted-foreground mt-2">Planifiez et suivez vos rendez-vous, entretiens et ateliers</p>
      </div>

      <EventCalendar
        events={userEvents}
        onEventClick={handleEventClick}
        onCreateEvent={handleCreateEvent}
        canCreateEvents={canCreateEvents}
      />

      {/* Event Details Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Détails de l'événement
            </DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedEvent.title}</h3>
                {selectedEvent.description && <p className="text-muted-foreground">{selectedEvent.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Date et heure</div>
                      <div className="text-sm text-muted-foreground">{formatEventDate(selectedEvent.startDate)}</div>
                      <div className="text-sm text-muted-foreground">
                        Durée:{" "}
                        {Math.round(
                          (selectedEvent.endDate.getTime() - selectedEvent.startDate.getTime()) / (1000 * 60),
                        )}{" "}
                        minutes
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedEvent.isVirtual ? (
                      <Video className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <div className="font-medium">Lieu</div>
                      <div className="text-sm text-muted-foreground">{selectedEvent.location || "Non spécifié"}</div>
                      {selectedEvent.meetingLink && (
                        <a
                          href={selectedEvent.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Rejoindre la réunion
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Participants</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedEvent.attendees.apprenticeId && "Apprenti • "}
                        {selectedEvent.attendees.sspId && "SSP • "}
                        {selectedEvent.attendees.adminId && "Admin • "}
                        {selectedEvent.attendees.externalAttendees?.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="font-medium mb-2">Type d'événement</div>
                    <Badge variant="secondary">{getEventTypeLabel(selectedEvent.type)}</Badge>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Statut</div>
                    <Badge className={getEventStatusColor(selectedEvent.status)}>
                      {getEventStatusLabel(selectedEvent.status)}
                    </Badge>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Rappels</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {selectedEvent.reminders.email && <div>• Email</div>}
                      {selectedEvent.reminders.sms && <div>• SMS</div>}
                      {selectedEvent.reminders.push && <div>• Notification push</div>}
                      <div>• {selectedEvent.reminders.reminderTime} minutes avant</div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent.notes && (
                <div>
                  <div className="font-medium mb-2">Notes</div>
                  <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">{selectedEvent.notes}</div>
                </div>
              )}

              {canEditEvents && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Edit className="h-4 w-4" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
