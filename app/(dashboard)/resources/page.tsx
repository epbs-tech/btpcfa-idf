"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Home, Briefcase, GraduationCap, Phone, MapPin, ExternalLink, Search, Filter, Star } from "lucide-react"
import { useState } from "react"

const mockResources = {
  health: [
    {
      id: 1,
      name: "Centre Médical Jeunes",
      category: "Santé générale",
      description: "Consultations médicales gratuites pour les jeunes de 16-25 ans",
      address: "15 Rue de la Santé, 75014 Paris",
      phone: "01 42 34 56 78",
      website: "www.centre-medical-jeunes.fr",
      rating: 4.5,
      featured: true,
    },
    {
      id: 2,
      name: "Espace Santé Jeunes",
      category: "Prévention",
      description: "Information, prévention et accompagnement en santé",
      address: "8 Avenue des Jeunes, 75011 Paris",
      phone: "01 43 21 87 65",
      website: "www.espace-sante-jeunes.org",
      rating: 4.2,
      featured: false,
    },
  ],
  housing: [
    {
      id: 3,
      name: "CROUS Île-de-France",
      category: "Logement étudiant",
      description: "Résidences universitaires et aides au logement",
      address: "39 Avenue Georges Bernanos, 75005 Paris",
      phone: "01 40 51 36 00",
      website: "www.crous-paris.fr",
      rating: 3.8,
      featured: true,
    },
    {
      id: 4,
      name: "Foyer Jeunes Travailleurs",
      category: "Logement temporaire",
      description: "Hébergement temporaire pour jeunes en formation",
      address: "25 Rue du Travail, 75012 Paris",
      phone: "01 44 75 32 10",
      website: "www.fjt-paris.org",
      rating: 4.0,
      featured: false,
    },
  ],
  employment: [
    {
      id: 5,
      name: "Mission Locale Paris",
      category: "Insertion professionnelle",
      description: "Accompagnement vers l'emploi et la formation",
      address: "12 Boulevard de l'Emploi, 75010 Paris",
      phone: "01 42 85 96 30",
      website: "www.missionlocale-paris.fr",
      rating: 4.3,
      featured: true,
    },
    {
      id: 6,
      name: "Pôle Emploi Jeunes",
      category: "Recherche d'emploi",
      description: "Services spécialisés pour les jeunes demandeurs d'emploi",
      address: "45 Rue de l'Avenir, 75018 Paris",
      phone: "39 49",
      website: "www.pole-emploi.fr",
      rating: 3.5,
      featured: false,
    },
  ],
}

export default function ResourcesPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("health")

  if (!user) return null

  const getIcon = (category: string) => {
    switch (category) {
      case "health":
        return <Heart className="h-5 w-5" />
      case "housing":
        return <Home className="h-5 w-5" />
      case "employment":
        return <Briefcase className="h-5 w-5" />
      default:
        return <GraduationCap className="h-5 w-5" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const ResourceCard = ({ resource }: { resource: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {resource.name}
              {resource.featured && <Badge variant="secondary">Recommandé</Badge>}
            </CardTitle>
            <CardDescription>{resource.category}</CardDescription>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(resource.rating)}
            <span className="text-sm text-muted-foreground ml-1">({resource.rating})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{resource.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{resource.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{resource.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <a
              href={`https://${resource.website}`}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource.website}
            </a>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm">Contacter</Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            Site web
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Ressources Partenaires</h1>
          <p className="text-muted-foreground">Trouvez l'aide dont vous avez besoin</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une ressource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Santé
          </TabsTrigger>
          <TabsTrigger value="housing" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Logement
          </TabsTrigger>
          <TabsTrigger value="employment" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Emploi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockResources.health.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="housing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockResources.housing.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockResources.employment.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
