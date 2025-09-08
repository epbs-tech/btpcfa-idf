"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Event, eventTypes, eventStatuses, formatEventTime } from "@/lib/events"

interface EventCalendarProps {
  events: Event[]
  onEventClick?: (event: Event) => void
  onCreateEvent?: () => void
  canCreateEvents?: boolean
}

export function EventCalendar({ events, onEventClick, onCreateEvent, canCreateEvents = false }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Adjust for Monday start

  // Generate calendar days
  const calendarDays = []

  // Previous month days
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()

  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(prevYear, prevMonth, daysInPrevMonth - i),
      isCurrentMonth: false,
    })
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth, day),
      isCurrentMonth: true,
    })
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      date: new Date(nextYear, nextMonth, day),
      isCurrentMonth: false,
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const getEventTypeColor = (type: string) => {
    return eventTypes.find((t) => t.value === type)?.color || "bg-gray-500"
  }

  const getEventStatusColor = (status: string) => {
    return eventStatuses.find((s) => s.value === status)?.color || "text-gray-600"
  }

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendrier des événements
          </CardTitle>
          <div className="flex items-center gap-2">
            {canCreateEvents && (
              <Button onClick={onCreateEvent} size="sm">
                Nouvel événement
              </Button>
            )}
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-[140px] text-center font-medium">
                {monthNames[currentMonth]} {currentYear}
              </div>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDate(day.date)
            const isToday = day.date.toDateString() === today.toDateString()

            return (
              <div
                key={index}
                className={`min-h-[100px] p-1 border rounded-lg ${
                  day.isCurrentMonth ? "bg-background" : "bg-muted/30"
                } ${isToday ? "ring-2 ring-primary" : ""}`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    day.isCurrentMonth ? (isToday ? "text-primary" : "text-foreground") : "text-muted-foreground"
                  }`}
                >
                  {day.date.getDate()}
                </div>

                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)} text-white`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="flex items-center gap-1 opacity-90">
                        <Clock className="h-3 w-3" />
                        {formatEventTime(event.startDate, event.endDate)}
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">+{dayEvents.length - 2} autres</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Upcoming Events List */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Événements à venir</h3>
          <div className="space-y-2">
            {events
              .filter((event) => event.startDate > today && event.status === "scheduled")
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatEventTime(event.startDate, event.endDate)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          {event.isVirtual ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={getEventStatusColor(event.status)}>
                    {eventStatuses.find((s) => s.value === event.status)?.label}
                  </Badge>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
