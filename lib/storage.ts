// lib/storage.ts

// Tipo para representar um alimento
export type Alimento = {
  nome: string
  quantidade: string
}

// Tipo para representar uma refeição completa
export type Refeicao = {
  id: string
  data: string
  hora: string
  nome: string
  alimentos: Alimento[]
}

// Função para salvar uma nova refeição
export function salvarRefeicao(refeicao: Omit<Refeicao, 'id'>) {
  // Pega refeições existentes
  const refeicoes = obterRefeicoes()
  
  // Cria nova refeição com ID único
  const novaRefeicao: Refeicao = {
    ...refeicao,
    id: Date.now().toString()
  }
  
  // Adiciona à lista
  refeicoes.push(novaRefeicao)
  
  // Salva no localStorage
  localStorage.setItem('refeicoes', JSON.stringify(refeicoes))
  
  return novaRefeicao
}

// Função para obter todas as refeições
export function obterRefeicoes(): Refeicao[] {
  // Verifica se está no navegador
  if (typeof window === 'undefined') return []
  
  // Busca do localStorage
  const dados = localStorage.getItem('refeicoes')
  
  // Retorna array vazio se não tiver nada, ou os dados salvos
  return dados ? JSON.parse(dados) : []
}

// Função para deletar uma refeição
export function deletarRefeicao(id: string) {
  // Filtra removendo a refeição com esse ID
  const refeicoes = obterRefeicoes().filter(r => r.id !== id)
  
  // Salva de volta
  localStorage.setItem('refeicoes', JSON.stringify(refeicoes))
}