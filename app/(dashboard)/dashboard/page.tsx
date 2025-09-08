"use client"

import { useAuth } from "@/hooks/use-auth"
import { hasRole } from "@/lib/auth"
import { ApprenticeDashboard } from "@/components/dashboard/apprentice-dashboard"
import { SSPDashboard } from "@/components/dashboard/ssp-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

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

  return renderDashboard()
}
