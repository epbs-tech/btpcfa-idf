"use client"

import { useAuth } from "@/hooks/use-auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { QuestionnaireForm } from "@/components/questionnaires/questionnaire-form"
import { getQuestionnaireById, getResponseByQuestionnaireAndUser } from "@/lib/questionnaires"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function QuestionnairePage() {
  const { user, isLoading } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const questionnaireId = params.id as string
  const questionnaire = getQuestionnaireById(questionnaireId)
  const existingResponse = user ? getResponseByQuestionnaireAndUser(questionnaireId, user.id) : undefined

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

  if (!questionnaire) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <h1 className="text-2xl font-bold mb-2">Questionnaire introuvable</h1>
                  <p className="text-muted-foreground mb-4">
                    Le questionnaire demandé n'existe pas ou n'est plus disponible.
                  </p>
                  <Button asChild>
                    <Link href="/questionnaires">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour aux questionnaires
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    )
  }

  const handleSave = async (responses: Record<string, any>, status: "draft" | "in-progress" | "completed") => {
    setSaving(true)
    try {
      // Mock save - replace with real API call
      console.log("Saving questionnaire response:", { questionnaireId, userId: user.id, responses, status })
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (responses: Record<string, any>) => {
    try {
      // Mock submit - replace with real API call
      console.log("Submitting questionnaire response:", { questionnaireId, userId: user.id, responses })
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/questionnaires?submitted=true")
    } catch (error) {
      console.error("Error submitting questionnaire:", error)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Back Button */}
            <Button variant="ghost" asChild>
              <Link href="/questionnaires">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux questionnaires
              </Link>
            </Button>

            {/* Questionnaire Form */}
            <QuestionnaireForm
              questionnaire={questionnaire}
              existingResponse={existingResponse}
              onSave={handleSave}
              onSubmit={handleSubmit}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
