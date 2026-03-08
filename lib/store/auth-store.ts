import { create } from "zustand"

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher"
  avatar: string
}

const DUMMY_USER: User = {
  id: "1",
  name: "MosabbiR",
  email: "mosabbir@remnant.org",
  role: "student",
  avatar: "/assets/pngs/Profile.png",
}

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (_email: string, _password: string) => {
    // Dummy login — always succeeds with the dummy user
    set({ user: DUMMY_USER, isLoggedIn: true })
  },
  logout: () => {
    set({ user: null, isLoggedIn: false })
  },
}))
