export interface User {
  id: string
  nom: string
  prenom: string
  email: string
  avatar?: string
}

export interface Compte {
  id: string
  libelle: string
  iban: string
  solde: number
  type: 'courant' | 'epargne' | 'livret'
}

export interface Transaction {
  id: string
  date: string
  libelle: string
  montant: number
  type: 'debit' | 'credit'
  categorie: string
  compteId: string
}

export interface Carte {
  id: string
  titulaire: string
  numero: string
  expiration: string
  type: 'visa' | 'mastercard'
  statut: 'active' | 'bloquee'
  plafond: number
  depensesMois: number
}

export interface Virement {
  beneficiaire: string
  iban: string
  montant: number
  motif: string
  date?: string
}