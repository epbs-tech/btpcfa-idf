"use client"

import type { User } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Settings,
  Shield,
  Activity,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  UserPlus,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Server,
  Lock,
  Mail,
  Calendar,
  FileText,
  Globe,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  // Mock data - replace with real data from API
  const systemStats = {
    totalUsers: 156,
    activeUsers: 142,
    totalApprentices: 98,
    totalSSPs: 12,
    totalAdmins: 3,
    questionnairesCompleted: 287,
    eventsScheduled: 45,
    systemUptime: 99.8,
    storageUsed: 67,
  }

  const recentUsers = [
    {
      id: "1",
      name: "Marie Dubois",
      email: "marie.dubois@btpcfa.fr",
      role: "apprentice",
      status: "active",
      lastLogin: "2024-12-11T10:30:00Z",
      createdAt: "2024-09-15T08:00:00Z",
    },
    {
      id: "2",
      name: "Jean Martin",
      email: "jean.martin@btpcfa.fr",
      role: "ssp",
      status: "active",
      lastLogin: "2024-12-11T09:15:00Z",
      createdAt: "2024-08-01T14:30:00Z",
    },
    {
      id: "3",
      name: "Sophie Laurent",
      email: "sophie.laurent@btpcfa.fr",
      role: "apprentice",
      status: "inactive",
      lastLogin: "2024-12-05T16:45:00Z",
      createdAt: "2024-10-20T11:00:00Z",
    },
  ]

  const systemLogs = [
    {
      id: "1",
      type: "security",
      message: "Tentative de connexion échouée pour admin@btpcfa.fr",
      timestamp: "2024-12-11T11:30:00Z",
      severity: "warning",
    },
    {
      id: "2",
      type: "system",
      message: "Sauvegarde automatique effectuée avec succès",
      timestamp: "2024-12-11T06:00:00Z",
      severity: "info",
    },
    {
      id: "3",
      type: "user",
      message: "Nouvel utilisateur créé: marie.dubois@btpcfa.fr",
      timestamp: "2024-12-10T14:22:00Z",
      severity: "info",
    },
    {
      id: "4",
      type: "error",
      message: "Erreur de synchronisation avec Yparéo",
      timestamp: "2024-12-10T09:15:00Z",
      severity: "error",
    },
  ]

  const integrationStatus = [
    { name: "Yparéo/NetYparéo", status: "connected", lastSync: "2024-12-11T10:00:00Z" },
    { name: "BTP CFA IDF", status: "connected", lastSync: "2024-12-11T09:30:00Z" },
    { name: "Datalumni", status: "error", lastSync: "2024-12-10T15:45:00Z" },
    { name: "Email Service", status: "connected", lastSync: "2024-12-11T11:00:00Z" },
  ]

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "connected":
        return "default"
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administration</h1>
          <p className="text-muted-foreground mt-1">Bienvenue {user.name}, gérez la plateforme BTP CFA IDF</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export données
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">91% du total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Apprentis</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemStats.totalApprentices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SSP</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemStats.totalSSPs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime système</CardTitle>
            <Server className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockage</CardTitle>
            <Database className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{systemStats.storageUsed}%</div>
            <Progress value={systemStats.storageUsed} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* User Management */}
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

          <div className="grid gap-4">
            {recentUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Créé le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role === "admin" ? "Administrateur" : user.role === "ssp" ? "SSP" : "Apprenti"}
                      </Badge>

                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Actif" : "Inactif"}
                      </Badge>

                      <div className="text-right">
                        <p className="text-sm font-medium">Dernière connexion</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(user.lastLogin).toLocaleDateString("fr-FR")}
                        </p>
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
                          <DropdownMenuItem>
                            <Lock className="mr-2 h-4 w-4" />
                            Réinitialiser mot de passe
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
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Croissance utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">+12%</div>
                <p className="text-sm text-muted-foreground">Ce mois vs mois précédent</p>
                <Progress value={75} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Questionnaires complétés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{systemStats.questionnairesCompleted}</div>
                <p className="text-sm text-muted-foreground">Total depuis le début</p>
                <Progress value={85} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Événements programmés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">{systemStats.eventsScheduled}</div>
                <p className="text-sm text-muted-foreground">Ce mois</p>
                <Progress value={60} className="h-2 mt-4" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des utilisateurs par rôle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Apprentis</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(systemStats.totalApprentices / systemStats.totalUsers) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{systemStats.totalApprentices}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SSP</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(systemStats.totalSSPs / systemStats.totalUsers) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{systemStats.totalSSPs}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Administrateurs</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(systemStats.totalAdmins / systemStats.totalUsers) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{systemStats.totalAdmins}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  État des intégrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationStatus.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Dernière sync: {new Date(integration.lastSync).toLocaleString("fr-FR")}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(integration.status)}>
                      {integration.status === "connected" ? "Connecté" : "Erreur"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Journaux système
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-2 bg-muted/50 rounded-lg">
                    {getSeverityIcon(log.severity)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString("fr-FR")}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Voir tous les journaux
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Paramètres de sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">Obligatoire pour tous les administrateurs</p>
                  </div>
                  <Switch id="2fa" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout">Expiration de session</Label>
                    <p className="text-sm text-muted-foreground">Déconnexion automatique après inactivité</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logs">Journaux d'audit</Label>
                    <p className="text-sm text-muted-foreground">Enregistrer toutes les actions administratives</p>
                  </div>
                  <Switch id="audit-logs" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Conformité RGPD
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-retention">Rétention des données</Label>
                    <p className="text-sm text-muted-foreground">Suppression automatique après 7 ans</p>
                  </div>
                  <Switch id="data-retention" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="consent-tracking">Suivi des consentements</Label>
                    <p className="text-sm text-muted-foreground">Traçabilité des acceptations RGPD</p>
                  </div>
                  <Switch id="consent-tracking" defaultChecked />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter rapport RGPD
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuration générale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Nom de l'application</Label>
                  <Input id="app-name" defaultValue="BTP CFA IDF - Suivi Socio-Pro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Email de support</Label>
                  <Input id="support-email" defaultValue="support@btpcfa.fr" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                    <p className="text-sm text-muted-foreground">Désactiver l'accès utilisateur</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Configuration email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">Serveur SMTP</Label>
                  <Input id="smtp-server" defaultValue="smtp.btpcfa.fr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">Email expéditeur</Label>
                  <Input id="from-email" defaultValue="noreply@btpcfa.fr" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notifications email</Label>
                    <p className="text-sm text-muted-foreground">Activer les notifications automatiques</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button>Sauvegarder les modifications</Button>
            <Button variant="outline">Annuler</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
