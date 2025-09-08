"use client"

import React from "react"
import { useAuth } from "@/hooks/use-auth"
import { getRoleDisplayName, hasRole } from "@/lib/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Settings,
  User,
  BookOpen,
  MessageSquare,
} from "lucide-react"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import SidebarLogo from "./sidebar-logo"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

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
      title: "Événements",
      icon: Calendar,
      href: "/events",
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
      title: "Analytiques",
      icon: BarChart3,
      href: "/analytics",
      roles: ["ssp", "admin"] as const,
    },
    {
      title: "Configuration",
      icon: Settings,
      href: "/settings",
      roles: ["admin"] as const,
    },
  ]

  const visibleItems = navigationItems.filter((item) => hasRole(user, [...item.roles]))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={visibleItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{ ...user, role: getRoleDisplayName(user.role) }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
