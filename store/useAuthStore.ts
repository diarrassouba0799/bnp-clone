import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  step: 'login' | '2fa' | 'authenticated'
  login: (user: User) => void
  setStep: (step: AuthState['step']) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      step: 'login',
      login: (user) => set({ user, isAuthenticated: true, step: 'authenticated' }),
      setStep: (step) => set({ step }),
      logout: () => set({ user: null, isAuthenticated: false, step: 'login' }),
    }),
    { name: 'bnp-auth' }
  )
)