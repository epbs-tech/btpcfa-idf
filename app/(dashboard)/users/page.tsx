"use client"

import { useAuth } from "@/hooks/use-auth"
import { hasRole } from "@/lib/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Users, Eye, Edit, Trash2, MoreHorizontal, UserPlus, Download, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"

export default function UsersPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || !hasRole(user, ["admin"])) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Accès non autorisé. Cette page est réservée aux administrateurs.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mock data - replace with real data from API
  const allUsers = [
    {
      id: "1",
      name: "Marie Dubois",
      email: "marie.dubois@btpcfa.fr",
      role: "apprentice",
      status: "active",
      lastLogin: "2024-12-11T10:30:00Z",
      createdAt: "2024-09-15T08:00:00Z",
      program: "CAP Maçonnerie",
    },
    {
      id: "2",
      name: "Jean Martin",
      email: "jean.martin@btpcfa.fr",
      role: "ssp",
      status: "active",
      lastLogin: "2024-12-11T09:15:00Z",
      createdAt: "2024-08-01T14:30:00Z",
      department: "Service Socio-Pro",
    },
    {
      id: "3",
      name: "Sophie Laurent",
      email: "sophie.laurent@btpcfa.fr",
      role: "apprentice",
      status: "inactive",
      lastLogin: "2024-12-05T16:45:00Z",
      createdAt: "2024-10-20T11:00:00Z",
      program: "BTS Bâtiment",
    },
    {
      id: "4",
      name: "Pierre Durand",
      email: "pierre.durand@btpcfa.fr",
      role: "admin",
      status: "active",
      lastLogin: "2024-12-11T08:00:00Z",
      createdAt: "2024-06-01T10:00:00Z",
      department: "Administration",
    },
  ]

  const apprentices = allUsers.filter((u) => u.role === "apprentice")
  const ssps = allUsers.filter((u) => u.role === "ssp")
  const admins = allUsers.filter((u) => u.role === "admin")

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "ssp":
        return "default"
      case "apprentice":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrateur"
      case "ssp":
        return "SSP"
      case "apprentice":
        return "Apprenti"
      default:
        return role
    }
  }

  const UserCard = ({ user }: { user: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">{user.program || user.department}</p>
              <p className="text-xs text-muted-foreground">
                Créé le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant={getRoleBadgeVariant(user.role)}>{getRoleDisplayName(user.role)}</Badge>

            <Badge variant={user.status === "active" ? "default" : "secondary"}>
              {user.status === "active" ? "Actif" : "Inactif"}
            </Badge>

            <div className="text-right">
              <p className="text-sm font-medium">Dernière connexion</p>
              <p className="text-xs text-muted-foreground">{new Date(user.lastLogin).toLocaleDateString("fr-FR")}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Voir le profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gestion des utilisateurs</h1>
                <p className="text-muted-foreground mt-1">Administrez tous les utilisateurs de la plateforme</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nouvel utilisateur
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allUsers.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Apprentis</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{apprentices.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SSP</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{ssps.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
                  <Users className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{admins.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Actions */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un utilisateur..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualiser
              </Button>
            </div>

            {/* Users Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Tous ({allUsers.length})</TabsTrigger>
                <TabsTrigger value="apprentices">Apprentis ({apprentices.length})</TabsTrigger>
                <TabsTrigger value="ssps">SSP ({ssps.length})</TabsTrigger>
                <TabsTrigger value="admins">Administrateurs ({admins.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-4">
                  {allUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="apprentices" className="space-y-4">
                <div className="grid gap-4">
                  {apprentices.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ssps" className="space-y-4">
                <div className="grid gap-4">
                  {ssps.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="admins" className="space-y-4">
                <div className="grid gap-4">
                  {admins.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
