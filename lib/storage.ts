// lib/storage.ts - VERSÃO SUPABASE CORRIGIDA
import { supabase } from '@/utils/supabase'

export type Alimento = {
  alimento: string
  quantidade: string
}

export type Refeicao = {
  id: string
  usuario_id: string
  nome: string
  data: string // timestamp completo (data + hora)
  alimentos: Alimento[]
  created_at?: string
}

export type Perfil = {
  id: string
  nome: string
  email: string
  created_at: string
}

// Salvar refeição no Supabase
export async function salvarRefeicao(refeicao: { nome: string; alimentos: Alimento[] }) {
  // Pegar usuário atual
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Usuário não autenticado')
  }

  // Criar refeição (data já inclui hora automática)
  const { data: novaRefeicao, error: refeicaoError } = await supabase
    .from('refeicoes')
    .insert({
      usuario_id: user.id,
      nome: refeicao.nome,
      data: new Date().toISOString(), // Timestamp completo
    })
    .select()
    .single()

  if (refeicaoError) throw refeicaoError

  // Criar alimentos
  const alimentosParaInserir = refeicao.alimentos.map(item => ({
    refeicao_id: novaRefeicao.id,
    alimento: item.alimento,
    quantidade: item.quantidade,
  }))

  const { error: alimentosError } = await supabase
    .from('alimentos_refeicao')
    .insert(alimentosParaInserir)

  if (alimentosError) throw alimentosError

  return {
    ...novaRefeicao,
    alimentos: refeicao.alimentos,
  }
}

// Obter todas as refeições do usuário
export async function obterRefeicoes(): Promise<Refeicao[]> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  // Buscar refeições (ordenar apenas por data, que já tem hora)
  const { data: refeicoes, error: refeicoesError } = await supabase
    .from('refeicoes')
    .select('*')
    .eq('usuario_id', user.id)
    .order('data', { ascending: false })

  if (refeicoesError) throw refeicoesError
  if (!refeicoes) return []

  // Buscar alimentos de cada refeição
  const refeicoesComAlimentos = await Promise.all(
    refeicoes.map(async (refeicao) => {
      const { data: alimentos, error: alimentosError } = await supabase
        .from('alimentos_refeicao')
        .select('alimento, quantidade')
        .eq('refeicao_id', refeicao.id)

      if (alimentosError) throw alimentosError

      return {
        ...refeicao,
        alimentos: alimentos || [],
      }
    })
  )

  return refeicoesComAlimentos
}

// Deletar refeição
export async function deletarRefeicao(id: string) {
  const { error } = await supabase
    .from('refeicoes')
    .delete()
    .eq('id', id)

  if (error) throw error
}