// components/card-refeicao.tsx
import { Trash2 } from 'lucide-react'
import type { Refeicao } from '@/lib/storage'

type Props = {
  refeicao: Refeicao
  onDeletar: (id: string) => void
}

export function CardRefeicao({ refeicao, onDeletar }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Cabeçalho com nome e botão deletar */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {refeicao.nome}
          </h3>
          <p className="text-sm text-gray-500">
            {refeicao.data} às {refeicao.hora}
          </p>
        </div>
        
        <button
          onClick={() => onDeletar(refeicao.id)}
          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
          title="Deletar refeição"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      {/* Lista de alimentos */}
      <div className="space-y-1 border-t pt-2">
        {refeicao.alimentos.map((alimento, idx) => (
          <div key={idx} className="text-sm text-gray-700 flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <span>
              <strong>{alimento.nome}</strong> - {alimento.quantidade}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}