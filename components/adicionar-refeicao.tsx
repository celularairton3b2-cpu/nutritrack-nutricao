// components/adicionar-refeicao.tsx
'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { salvarRefeicao } from '@/lib/storage'
import { format } from 'date-fns'

type Alimento = {
  nome: string
  quantidade: string
}

export function AdicionarRefeicao() {
  // Estado para controlar se o modal está aberto
  const [aberto, setAberto] = useState(false)
  
  // Estado do formulário
  const [nome, setNome] = useState('')
  const [alimentos, setAlimentos] = useState<Alimento[]>([])
  
  // Estado para adicionar alimento
  const [alimentoNome, setAlimentoNome] = useState('')
  const [alimentoQtd, setAlimentoQtd] = useState('')
  
  // Adiciona um alimento à lista
  function adicionarAlimento() {
    if (!alimentoNome.trim() || !alimentoQtd.trim()) {
      alert('Preencha o nome e a quantidade do alimento')
      return
    }
    
    setAlimentos([...alimentos, {
      nome: alimentoNome.trim(),
      quantidade: alimentoQtd.trim()
    }])
    
    // Limpa os campos
    setAlimentoNome('')
    setAlimentoQtd('')
  }
  
  // Remove um alimento da lista
  function removerAlimento(index: number) {
    setAlimentos(alimentos.filter((_, i) => i !== index))
  }
  
  // Salva a refeição
  function salvar() {
    if (!nome.trim()) {
      alert('Preencha o nome da refeição')
      return
    }
    
    if (alimentos.length === 0) {
      alert('Adicione pelo menos um alimento')
      return
    }
    
    const agora = new Date()
    
    salvarRefeicao({
      nome: nome.trim(),
      data: format(agora, 'dd/MM/yyyy'),
      hora: format(agora, 'HH:mm'),
      alimentos
    })
    
    // Limpa o formulário
    setNome('')
    setAlimentos([])
    setAberto(false)
    
    // Recarrega a página para atualizar a lista
    window.location.reload()
  }
  
  // Se não está aberto, mostra apenas o botão flutuante
  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 hover:scale-110 transition-all"
        title="Adicionar refeição"
      >
        <Plus size={28} />
      </button>
    )
  }
  
  // Modal aberto
  return (
    <>
      {/* Fundo escuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setAberto(false)}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Nova Refeição
            </h2>
            <button 
              onClick={() => setAberto(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Nome da refeição */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Refeição *
            </label>
            <input
              type="text"
              placeholder="Ex: Café da manhã, Almoço, Jantar..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {/* Seção de adicionar alimento */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">
              Adicionar Alimento
            </h3>
            
            <input
              type="text"
              placeholder="Nome do alimento (ex: Arroz integral)"
              value={alimentoNome}
              onChange={(e) => setAlimentoNome(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && document.getElementById('qtd-input')?.focus()}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            <input
              id="qtd-input"
              type="text"
              placeholder="Quantidade (ex: 100g, 2 unidades, 1 xícara)"
              value={alimentoQtd}
              onChange={(e) => setAlimentoQtd(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && adicionarAlimento()}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            <button
              onClick={adicionarAlimento}
              className="w-full bg-gray-600 text-white rounded-lg py-2 font-medium hover:bg-gray-700 transition-colors"
            >
              + Adicionar
            </button>
          </div>
          
          {/* Lista de alimentos adicionados */}
          {alimentos.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Alimentos ({alimentos.length}):
              </h3>
              <div className="space-y-2">
                {alimentos.map((alimento, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center bg-purple-50 p-3 rounded-lg border border-purple-100"
                  >
                    <span className="text-sm text-gray-700">
                      <strong>{alimento.nome}</strong>
                      <span className="text-gray-500"> — {alimento.quantidade}</span>
                    </span>
                    <button
                      onClick={() => removerAlimento(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remover"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Botão de salvar */}
          <button
            onClick={salvar}
            className="w-full bg-purple-600 text-white rounded-lg py-3 font-semibold text-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
          >
            Salvar Refeição
          </button>
        </div>
      </div>
    </>
  )
}