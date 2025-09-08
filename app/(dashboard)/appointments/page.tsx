"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User, Phone, Plus } from "lucide-react"
import { useState } from "react"

const mockAppointments = [
  {
    id: 1,
    title: "Entretien de suivi",
    date: "2024-01-15",
    time: "14:00",
    duration: "1h",
    location: "Bureau SSP - Salle 201",
    type: "suivi",
    status: "confirmed",
    ssp: "Sophie Martin",
    sspPhone: "+33 1 23 45 67 89",
    description: "Point sur l'évolution en entreprise et difficultés rencontrées",
  },
  {
    id: 2,
    title: "Rendez-vous orientation",
    date: "2024-01-22",
    time: "10:30",
    duration: "45min",
    location: "Visioconférence",
    type: "orientation",
    status: "pending",
    ssp: "Marc Dubois",
    sspPhone: "+33 1 98 76 54 32",
    description: "Discussion sur les perspectives d'évolution professionnelle",
  },
  {
    id: 3,
    title: "Bilan de compétences",
    date: "2024-01-08",
    time: "09:00",
    duration: "2h",
    location: "Centre de formation",
    type: "bilan",
    status: "completed",
    ssp: "Sophie Martin",
    sspPhone: "+33 1 23 45 67 89",
    description: "Évaluation des compétences acquises en entreprise",
  },
]

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [filter, setFilter] = useState("all")

  if (!user) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      case "completed":
        return <Badge variant="outline">Terminé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "suivi":
        return <Badge variant="default">Suivi</Badge>
      case "orientation":
        return <Badge className="bg-blue-100 text-blue-800">Orientation</Badge>
      case "bilan":
        return <Badge className="bg-purple-100 text-purple-800">Bilan</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const filteredAppointments = mockAppointments.filter((apt) => {
    if (filter === "all") return true
    return apt.status === filter
  })

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
          <p className="text-muted-foreground">Gérez vos rendez-vous avec votre SSP</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Demander un RDV
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            Tous
          </TabsTrigger>
          <TabsTrigger value="confirmed" onClick={() => setFilter("confirmed")}>
            Confirmés
          </TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setFilter("pending")}>
            En attente
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setFilter("completed")}>
            Terminés
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {appointment.title}
                        {getTypeBadge(appointment.type)}
                      </CardTitle>
                      <CardDescription className="mt-2">{appointment.description}</CardDescription>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(appointment.date).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {appointment.time} ({appointment.duration})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.ssp}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{appointment.sspPhone}</span>
                    </div>
                    <div className="flex gap-2">
                      {appointment.status === "confirmed" && (
                        <Button variant="outline" size="sm">
                          Reprogrammer
                        </Button>
                      )}
                      {appointment.status === "pending" && (
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      )}
                      <Button size="sm">Voir détails</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
