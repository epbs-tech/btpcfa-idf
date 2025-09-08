"use client"

import React from "react"
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronsUpDown,
  User,
  BookOpen,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function AppSidebar() {
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const pathname = usePathname()
  const { isMobile } = useSidebar()

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
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="p-0 rounded-lg">
            <Image
              src="/icon-btp-cfa.png"
              alt="BTP CFA IDF"
              width={32}
              height={32}
              className="h-18 w-18 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-sm">BTP CFA IDF</h2>
            <p className="text-xs text-muted-foreground">Suivi Educatif et Socio-Pro</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full">
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{getRoleDisplayName(user.role)}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User />
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    setIsLoggingOut(true)
                    await logout()
                    setIsLoggingOut(false)
                  }}
                  disabled={isLoggingOut}
                >
                  <LogOut />
                  {isLoggingOut ? (
                    <span className="ml-2 flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
                      Déconnexion...
                    </span>
                  ) : (
                    "Se déconnecter"
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
