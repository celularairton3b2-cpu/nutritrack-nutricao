// components/lista-refeicoes.tsx
'use client'

import { useEffect, useState } from 'react'
import { obterRefeicoes, deletarRefeicao, type Refeicao } from '@/lib/storage'
import { CardRefeicao } from './card-refeicao'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function ListaRefeicoes() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([])
  
  useEffect(() => {
    carregarRefeicoes()
  }, [])

  async function carregarRefeicoes() {
    try {
      const dados = await obterRefeicoes()
      setRefeicoes(dados)
    } catch (error) {
      console.error('Erro ao carregar refeições:', error)
    }
  }
  
  async function handleDeletar(id: string) {
    if (confirm('Tem certeza que deseja deletar esta refeição?')) {
      try {
        await deletarRefeicao(id)
        await carregarRefeicoes()
      } catch (error) {
        console.error('Erro ao deletar refeição:', error)
        alert('Erro ao deletar refeição. Tente novamente.')
      }
    }
  }
  
  // Agrupa refeições por data (formato dd/MM/yyyy)
  const refeicoesAgrupadas = refeicoes.reduce((acc, refeicao) => {
    const dataFormatada = format(new Date(refeicao.data), 'dd/MM/yyyy', { locale: ptBR })
    if (!acc[dataFormatada]) {
      acc[dataFormatada] = []
    }
    acc[dataFormatada].push(refeicao)
    return acc
  }, {} as Record<string, Refeicao[]>)
  
  if (refeicoes.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-lg font-medium mb-2">
          Nenhuma refeição registrada ainda
        </p>
        <p className="text-sm">
          Clique no botão <span className="text-purple-600 font-semibold">+</span> para adicionar sua primeira refeição
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {Object.entries(refeicoesAgrupadas)
        .sort(([dataA], [dataB]) => {
          // Converter para timestamp e ordenar do mais recente pro mais antigo
          const [diaA, mesA, anoA] = dataA.split('/').map(Number)
          const [diaB, mesB, anoB] = dataB.split('/').map(Number)
          const timestampA = new Date(anoA, mesA - 1, diaA).getTime()
          const timestampB = new Date(anoB, mesB - 1, diaB).getTime()
          return timestampB - timestampA
        })
        .map(([data, refeicoesData]) => (
          <div key={data}>
            <h2 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
              📅 {data}
            </h2>
            <div className="space-y-3">
              {refeicoesData
                .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                .map(refeicao => (
                  <CardRefeicao
                    key={refeicao.id}
                    refeicao={refeicao}
                    onDeletar={handleDeletar}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  )
}