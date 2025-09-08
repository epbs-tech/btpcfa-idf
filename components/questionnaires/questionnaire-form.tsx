"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import {
  type Questionnaire,
  type Question,
  type QuestionnaireResponse,
  validateResponse,
  calculateProgress,
} from "@/lib/questionnaires"
import { Save, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface QuestionnaireFormProps {
  questionnaire: Questionnaire
  existingResponse?: QuestionnaireResponse
  onSave: (responses: Record<string, any>, status: "draft" | "in-progress" | "completed") => void
  onSubmit: (responses: Record<string, any>) => void
}

export function QuestionnaireForm({ questionnaire, existingResponse, onSave, onSubmit }: QuestionnaireFormProps) {
  const [responses, setResponses] = useState<Record<string, any>>(existingResponse?.responses || {})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = calculateProgress(responses, questionnaire.questions)
  const questionsPerStep = 3
  const totalSteps = Math.ceil(questionnaire.questions.length / questionsPerStep)
  const currentQuestions = questionnaire.questions.slice(
    currentStep * questionsPerStep,
    (currentStep + 1) * questionsPerStep,
  )

  const shouldShowQuestion = (question: Question): boolean => {
    if (!question.conditionalLogic) return true

    const { dependsOn, showWhen } = question.conditionalLogic
    const dependentValue = responses[dependsOn]

    if (Array.isArray(showWhen)) {
      return showWhen.includes(dependentValue)
    }
    return dependentValue === showWhen
  }

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[questionId]
        return newErrors
      })
    }
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    currentQuestions.forEach((question) => {
      if (shouldShowQuestion(question)) {
        const error = validateResponse(question, responses[question.id])
        if (error) {
          newErrors[question.id] = error
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      handleSave("in-progress")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = (status: "draft" | "in-progress" | "completed" = "draft") => {
    onSave(responses, status)
  }

  const handleSubmit = async () => {
    // Validate all questions
    const allErrors: Record<string, string> = {}
    let isValid = true

    questionnaire.questions.forEach((question) => {
      if (shouldShowQuestion(question)) {
        const error = validateResponse(question, responses[question.id])
        if (error) {
          allErrors[question.id] = error
          isValid = false
        }
      }
    })

    if (!isValid) {
      setErrors(allErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(responses)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (question: Question) => {
    if (!shouldShowQuestion(question)) return null

    const value = responses[question.id]
    const error = errors[question.id]

    return (
      <div key={question.id} className="space-y-3">
        <div>
          <Label className="text-base font-medium">
            {question.title}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {question.description && <p className="text-sm text-muted-foreground mt-1">{question.description}</p>}
        </div>

        {question.type === "text" && (
          <Input
            value={value || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Votre réponse..."
            className={error ? "border-red-500" : ""}
          />
        )}

        {question.type === "textarea" && (
          <Textarea
            value={value || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Votre réponse..."
            rows={4}
            className={error ? "border-red-500" : ""}
          />
        )}

        {question.type === "number" && (
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => handleResponseChange(question.id, Number(e.target.value))}
            min={question.validation?.min}
            max={question.validation?.max}
            className={error ? "border-red-500" : ""}
          />
        )}

        {question.type === "date" && (
          <Input
            type="date"
            value={value || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={error ? "border-red-500" : ""}
          />
        )}

        {question.type === "select" && (
          <Select value={value || ""} onValueChange={(val) => handleResponseChange(question.id, val)}>
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionnez une option..." />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {question.type === "radio" && (
          <RadioGroup value={value || ""} onValueChange={(val) => handleResponseChange(question.id, val)}>
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "checkbox" && (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={(value || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = value || []
                    if (checked) {
                      handleResponseChange(question.id, [...currentValues, option.value])
                    } else {
                      handleResponseChange(
                        question.id,
                        currentValues.filter((v: string) => v !== option.value),
                      )
                    }
                  }}
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        )}

        {question.type === "scale" && (
          <div className="space-y-4">
            <Slider
              value={[value || question.validation?.min || 1]}
              onValueChange={(vals) => handleResponseChange(question.id, vals[0])}
              min={question.validation?.min || 1}
              max={question.validation?.max || 10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.validation?.min || 1}</span>
              <span className="font-medium">Valeur: {value || question.validation?.min || 1}</span>
              <span>{question.validation?.max || 10}</span>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{questionnaire.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{questionnaire.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {questionnaire.estimatedDuration} min
              </Badge>
              {existingResponse?.status === "completed" && (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Terminé
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Étape {currentStep + 1} sur {totalSteps}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-8">{currentQuestions.map((question) => renderQuestion(question))}</div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                Précédent
              </Button>
              {currentStep < totalSteps - 1 ? (
                <Button onClick={handleNext}>Suivant</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting || progress < 100}>
                  {isSubmitting ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Soumettre
                    </>
                  )}
                </Button>
              )}
            </div>

            <Button variant="ghost" onClick={() => handleSave("draft")}>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
