"use client"

import { useAuth } from "@/hooks/use-auth"
import { getRoleDisplayName, hasRole } from "@/lib/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Building2,
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronUp,
  User,
  BookOpen,
  MessageSquare,
} from "lucide-react"

export function AppSidebar() {
  const { user, logout } = useAuth()

  if (!user) return null

  const navigationItems = [
    // Common items for all roles
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      href: "/dashboard",
      roles: ["apprentice", "ssp", "admin"] as const,
    },

    // Apprentice specific
    {
      title: "Mon profil",
      icon: User,
      href: "/profile",
      roles: ["apprentice"] as const,
    },
    {
      title: "Questionnaires",
      icon: FileText,
      href: "/questionnaires",
      roles: ["apprentice"] as const,
    },
    {
      title: "Mes rendez-vous",
      icon: Calendar,
      href: "/appointments",
      roles: ["apprentice"] as const,
    },
    {
      title: "Ressources",
      icon: BookOpen,
      href: "/resources",
      roles: ["apprentice"] as const,
    },

    // SSP specific
    {
      title: "Mes apprentis",
      icon: Users,
      href: "/apprentices",
      roles: ["ssp"] as const,
    },
    {
      title: "Suivi individuel",
      icon: MessageSquare,
      href: "/tracking",
      roles: ["ssp"] as const,
    },
    {
      title: "Planification",
      icon: Calendar,
      href: "/planning",
      roles: ["ssp", "admin"] as const,
    },

    // Admin specific
    {
      title: "Gestion utilisateurs",
      icon: Users,
      href: "/users",
      roles: ["admin"] as const,
    },
    {
      title: "Rapports",
      icon: BarChart3,
      href: "/reports",
      roles: ["ssp", "admin"] as const,
    },
    {
      title: "Configuration",
      icon: Settings,
      href: "/settings",
      roles: ["admin"] as const,
    },
  ]

  const visibleItems = navigationItems.filter((item) => hasRole(user, item.roles))

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="p-2 bg-primary rounded-lg">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">BTP CFA IDF</h2>
            <p className="text-xs text-muted-foreground">Suivi Socio-Pro</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {visibleItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <a href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{getRoleDisplayName(user.role)}</p>
                  </div>
                  <ChevronUp className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
