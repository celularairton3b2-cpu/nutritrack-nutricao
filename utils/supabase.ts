// utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export type Perfil = {
  id: string
  email: string
  nome: string | null
  tipo: 'cliente' | 'profissional'
  created_at: string
  updated_at: string
}

export type Refeicao = {
  id: string
  usuario_id: string
  nome: string
  data: string
  hora: string
  observacoes: string | null
  created_at: string
  updated_at: string
}

export type AlimentoRefeicao = {
  id: string
  refeicao_id: string
  nome: string
  quantidade: string
  created_at: string
}

export type RefeicaoComAlimentos = Refeicao & {
  alimentos: AlimentoRefeicao[]
}
