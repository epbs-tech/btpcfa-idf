export type UserRole = "apprentice" | "ssp" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  lastLogin?: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication functions - replace with real auth implementation
export const mockUsers: User[] = [
  {
    id: "1",
    email: "apprentice@btpcfa.fr",
    name: "Marie Dubois",
    role: "apprentice",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    email: "ssp@btpcfa.fr",
    name: "Jean Martin",
    role: "ssp",
    createdAt: new Date("2023-09-01"),
    lastLogin: new Date(),
  },
  {
    id: "3",
    email: "admin@btpcfa.fr",
    name: "Sophie Laurent",
    role: "admin",
    createdAt: new Date("2023-06-01"),
    lastLogin: new Date(),
  },
]

export const login = async (email: string, password: string): Promise<User | null> => {
  // Mock login - replace with real authentication
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const user = mockUsers.find((u) => u.email === email)
  return user || null
}

export const logout = async (): Promise<void> => {
  // Mock logout
  await new Promise((resolve) => setTimeout(resolve, 500))
}

export const getCurrentUser = (): User | null => {
  // Mock current user - replace with real session management
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("currentUser")
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export const setCurrentUser = (user: User | null): void => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }
}

export const hasRole = (user: User | null, roles: UserRole[]): boolean => {
  return user ? roles.includes(user.role) : false
}

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case "apprentice":
      return "Apprenti(e)"
    case "ssp":
      return "Service Socio-Pro"
    case "admin":
      return "Administrateur"
    default:
      return role
  }
}
