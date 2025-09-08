"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, GraduationCap, Save } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (!user) return null

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          {isEditing ? "Annuler" : "Modifier"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>
                <Badge variant="secondary">{user.role === "apprentice" ? "Apprenti(e)" : user.role}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+33 6 12 34 56 78</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Paris, Île-de-France</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personnel</TabsTrigger>
              <TabsTrigger value="professional">Professionnel</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" defaultValue="Marie" disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" defaultValue="Dupont" disabled={!isEditing} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} disabled={!isEditing} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue="+33 6 12 34 56 78" disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">Date de naissance</Label>
                      <Input id="birthDate" type="date" defaultValue="2000-05-15" disabled={!isEditing} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea id="address" defaultValue="123 Rue de la Paix, 75001 Paris" disabled={!isEditing} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Formation et entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="formation">Formation</Label>
                    <Input id="formation" defaultValue="CAP Maçon" disabled={!isEditing} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Date de début</Label>
                      <Input id="startDate" type="date" defaultValue="2023-09-01" disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Date de fin prévue</Label>
                      <Input id="endDate" type="date" defaultValue="2025-06-30" disabled={!isEditing} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Entreprise d'accueil</Label>
                    <Input id="company" defaultValue="Entreprise Martin & Fils" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="tutor">Maître d'apprentissage</Label>
                    <Input id="tutor" defaultValue="Jean Martin" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="tutorPhone">Téléphone du maître d'apprentissage</Label>
                    <Input id="tutorPhone" defaultValue="+33 1 23 45 67 89" disabled={!isEditing} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>Choisissez comment vous souhaitez être contacté</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les notifications importantes par email</p>
                    </div>
                    <input type="checkbox" defaultChecked disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications SMS</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les rappels de rendez-vous par SMS</p>
                    </div>
                    <input type="checkbox" defaultChecked disabled={!isEditing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications push</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les notifications dans l'application</p>
                    </div>
                    <input type="checkbox" defaultChecked disabled={!isEditing} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {isEditing && (
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
