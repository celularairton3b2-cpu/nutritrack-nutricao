// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { obterRefeicoes } from '@/lib/storage'
import { ListaRefeicoes } from '@/components/lista-refeicoes'
import { AdicionarRefeicao } from '@/components/adicionar-refeicao'
import { Plus } from 'lucide-react'
import type { Refeicao } from '@/lib/storage'

export default function DashboardPage() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([])
  const [modalAberto, setModalAberto] = useState(false)
  const [loading, setLoading] = useState(true)

  async function carregarRefeicoes() {
    try {
      const dados = await obterRefeicoes()
      setRefeicoes(dados)
    } catch (error) {
      console.error('Erro ao carregar refeições:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarRefeicoes()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <>
      <ListaRefeicoes refeicoes={refeicoes} onAtualizar={carregarRefeicoes} />

      {/* Botão Flutuante */}
      <button
        onClick={() => setModalAberto(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Adicionar refeição"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {modalAberto && (
        <AdicionarRefeicao
          aberto={modalAberto}
          onFechar={() => setModalAberto(false)}
          onSalvar={() => {
            setModalAberto(false)
            carregarRefeicoes()
          }}
        />
      )}
    </>
  )
}