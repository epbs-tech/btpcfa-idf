"use client"

import { useAuth } from "@/hooks/use-auth"
import { hasRole } from "@/lib/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ApprenticeDashboard } from "@/components/dashboard/apprentice-dashboard"
import { SSPDashboard } from "@/components/dashboard/ssp-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const renderDashboard = () => {
    if (hasRole(user, ["apprentice"])) {
      return <ApprenticeDashboard user={user} />
    }
    if (hasRole(user, ["ssp"])) {
      return <SSPDashboard user={user} />
    }
    if (hasRole(user, ["admin"])) {
      return <AdminDashboard user={user} />
    }
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">{renderDashboard()}</main>
      </div>
    </SidebarProvider>
  )
}
