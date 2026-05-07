// components/lista-refeicoes.tsx
'use client'

import { useEffect, useState } from 'react'
import { obterRefeicoes, deletarRefeicao, type Refeicao } from '@/lib/storage'
import { CardRefeicao } from './card-refeicao'

export function ListaRefeicoes() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([])
  
  // Carrega refeições quando o componente monta
  useEffect(() => {
    setRefeicoes(obterRefeicoes())
  }, [])
  
  // Função para deletar e atualizar lista
  function handleDeletar(id: string) {
    if (confirm('Tem certeza que deseja deletar esta refeição?')) {
      deletarRefeicao(id)
      setRefeicoes(obterRefeicoes())
    }
  }
  
  // Agrupa refeições por data
  const refeicoesAgrupadas = refeicoes.reduce((acc, refeicao) => {
    if (!acc[refeicao.data]) {
      acc[refeicao.data] = []
    }
    acc[refeicao.data].push(refeicao)
    return acc
  }, {} as Record<string, Refeicao[]>)
  
  // Se não tem refeições, mostra mensagem
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
  
  // Mostra refeições agrupadas por data
  return (
    <div className="space-y-6">
      {Object.entries(refeicoesAgrupadas)
        .sort(([dataA], [dataB]) => {
          // Ordena do mais recente para o mais antigo
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
                .sort((a, b) => a.hora.localeCompare(b.hora))
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