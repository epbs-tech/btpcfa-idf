export type QuestionType = "text" | "textarea" | "select" | "radio" | "checkbox" | "number" | "date" | "scale"

export interface QuestionOption {
  id: string
  label: string
  value: string
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  conditionalLogic?: {
    dependsOn: string
    showWhen: string | string[]
  }
}

export interface Questionnaire {
  id: string
  title: string
  description: string
  category: "pre-guidance" | "personal-situation" | "formation-evaluation" | "follow-up" | "custom"
  status: "draft" | "active" | "archived"
  questions: Question[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
  targetRole: "apprentice" | "ssp" | "all"
  estimatedDuration: number // in minutes
}

export interface QuestionnaireResponse {
  id: string
  questionnaireId: string
  userId: string
  responses: Record<string, any>
  status: "draft" | "in-progress" | "completed" | "submitted"
  progress: number
  startedAt: Date
  completedAt?: Date
  lastSavedAt: Date
}

// Mock questionnaires data
export const mockQuestionnaires: Questionnaire[] = [
  {
    id: "1",
    title: "Questionnaire de pré-orientation",
    description: "Évaluation initiale pour mieux comprendre vos objectifs et besoins",
    category: "pre-guidance",
    status: "active",
    targetRole: "apprentice",
    estimatedDuration: 15,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    createdBy: "admin",
    questions: [
      {
        id: "q1",
        type: "text",
        title: "Quel est votre objectif principal pour cette formation ?",
        description: "Décrivez en quelques mots ce que vous espérez accomplir",
        required: true,
      },
      {
        id: "q2",
        type: "select",
        title: "Dans quel domaine souhaitez-vous vous spécialiser ?",
        required: true,
        options: [
          { id: "masonry", label: "Maçonnerie", value: "masonry" },
          { id: "electricity", label: "Électricité", value: "electricity" },
          { id: "plumbing", label: "Plomberie", value: "plumbing" },
          { id: "carpentry", label: "Charpenterie", value: "carpentry" },
          { id: "other", label: "Autre", value: "other" },
        ],
      },
      {
        id: "q3",
        type: "textarea",
        title: "Si vous avez choisi 'Autre', précisez :",
        required: false,
        conditionalLogic: {
          dependsOn: "q2",
          showWhen: "other",
        },
      },
      {
        id: "q4",
        type: "scale",
        title: "Sur une échelle de 1 à 10, comment évaluez-vous votre motivation ?",
        required: true,
        validation: {
          min: 1,
          max: 10,
        },
      },
      {
        id: "q5",
        type: "checkbox",
        title: "Quels sont vos centres d'intérêt ? (plusieurs choix possibles)",
        required: false,
        options: [
          { id: "manual", label: "Travail manuel", value: "manual" },
          { id: "technical", label: "Aspects techniques", value: "technical" },
          { id: "team", label: "Travail en équipe", value: "team" },
          { id: "innovation", label: "Innovation et nouvelles technologies", value: "innovation" },
          { id: "management", label: "Management et encadrement", value: "management" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Évaluation de situation personnelle",
    description: "Questionnaire pour évaluer votre situation personnelle et identifier les besoins d'accompagnement",
    category: "personal-situation",
    status: "active",
    targetRole: "apprentice",
    estimatedDuration: 20,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    createdBy: "ssp",
    questions: [
      {
        id: "p1",
        type: "radio",
        title: "Quelle est votre situation de logement actuelle ?",
        required: true,
        options: [
          { id: "family", label: "Chez mes parents/famille", value: "family" },
          { id: "student", label: "Résidence étudiante", value: "student" },
          { id: "rental", label: "Location privée", value: "rental" },
          { id: "other", label: "Autre", value: "other" },
        ],
      },
      {
        id: "p2",
        type: "radio",
        title: "Avez-vous des difficultés financières ?",
        required: true,
        options: [
          { id: "none", label: "Aucune difficulté", value: "none" },
          { id: "minor", label: "Difficultés mineures", value: "minor" },
          { id: "moderate", label: "Difficultés modérées", value: "moderate" },
          { id: "major", label: "Difficultés importantes", value: "major" },
        ],
      },
      {
        id: "p3",
        type: "checkbox",
        title: "Dans quels domaines avez-vous besoin d'aide ? (plusieurs choix possibles)",
        required: false,
        options: [
          { id: "housing", label: "Logement", value: "housing" },
          { id: "transport", label: "Transport", value: "transport" },
          { id: "health", label: "Santé", value: "health" },
          { id: "finance", label: "Gestion financière", value: "finance" },
          { id: "admin", label: "Démarches administratives", value: "admin" },
        ],
      },
    ],
  },
]

// Mock responses data
export const mockResponses: QuestionnaireResponse[] = [
  {
    id: "r1",
    questionnaireId: "1",
    userId: "1",
    status: "completed",
    progress: 100,
    startedAt: new Date("2024-12-01T10:00:00Z"),
    completedAt: new Date("2024-12-01T10:15:00Z"),
    lastSavedAt: new Date("2024-12-01T10:15:00Z"),
    responses: {
      q1: "Obtenir un diplôme reconnu et trouver un emploi stable dans le BTP",
      q2: "masonry",
      q4: 8,
      q5: ["manual", "technical", "team"],
    },
  },
  {
    id: "r2",
    questionnaireId: "2",
    userId: "1",
    status: "in-progress",
    progress: 60,
    startedAt: new Date("2024-12-05T14:00:00Z"),
    lastSavedAt: new Date("2024-12-05T14:10:00Z"),
    responses: {
      p1: "family",
      p2: "minor",
    },
  },
]

export const getQuestionnairesForUser = (userId: string, role: string): Questionnaire[] => {
  return mockQuestionnaires.filter((q) => q.targetRole === role || q.targetRole === "all")
}

export const getUserResponses = (userId: string): QuestionnaireResponse[] => {
  return mockResponses.filter((r) => r.userId === userId)
}

export const getQuestionnaireById = (id: string): Questionnaire | undefined => {
  return mockQuestionnaires.find((q) => q.id === id)
}

export const getResponseByQuestionnaireAndUser = (
  questionnaireId: string,
  userId: string,
): QuestionnaireResponse | undefined => {
  return mockResponses.find((r) => r.questionnaireId === questionnaireId && r.userId === userId)
}

export const calculateProgress = (responses: Record<string, any>, questions: Question[]): number => {
  const requiredQuestions = questions.filter((q) => q.required)
  const answeredRequired = requiredQuestions.filter((q) => responses[q.id] !== undefined && responses[q.id] !== "")
  return requiredQuestions.length > 0 ? Math.round((answeredRequired.length / requiredQuestions.length) * 100) : 0
}

export const validateResponse = (question: Question, value: any): string | null => {
  if (question.required && (value === undefined || value === "" || value === null)) {
    return "Cette question est obligatoire"
  }

  if (question.validation) {
    const { min, max, pattern, message } = question.validation

    if (question.type === "number" || question.type === "scale") {
      const numValue = Number(value)
      if (min !== undefined && numValue < min) {
        return message || `La valeur doit être supérieure ou égale à ${min}`
      }
      if (max !== undefined && numValue > max) {
        return message || `La valeur doit être inférieure ou égale à ${max}`
      }
    }

    if (question.type === "text" && pattern && value) {
      const regex = new RegExp(pattern)
      if (!regex.test(value)) {
        return message || "Format invalide"
      }
    }
  }

  return null
}
