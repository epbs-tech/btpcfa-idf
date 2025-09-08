"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import {
  type User,
  type AuthState,
  getCurrentUser,
  setCurrentUser,
  login as authLogin,
  logout as authLogout,
} from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const user = getCurrentUser()
    setAuthState({
      user,
      isLoading: false,
      isAuthenticated: !!user,
    })
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const user = await authLogin(email, password)
      if (user) {
        setCurrentUser(user)
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const logout = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      await authLogout()
      setCurrentUser(null)
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateUser = (user: User): void => {
    setCurrentUser(user)
    setAuthState((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
