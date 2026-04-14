// Simule une authentification (pas de vraie BDD ici)
export const MOCK_CREDENTIALS = {
  email: 'marie.dupont@email.fr',
  password: 'BNP2025!',
  code2fa: '123456',
}

export function verifierCredentials(email: string, password: string): boolean {
  return (
    email === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  )
}

export function verifier2FA(code: string): boolean {
  return code === MOCK_CREDENTIALS.code2fa
}