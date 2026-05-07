// app/page.tsx
import { ListaRefeicoes } from '@/components/lista-refeicoes'
import { AdicionarRefeicao } from '@/components/adicionar-refeicao'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mb-3">
            Diário Alimentar
          </h1>
          <p className="text-gray-600 text-lg">
            REGISTRE SUAS REFEIÇÕES 🍽️
          </p>
        </div>
        
        {/* Lista de refeições */}
        <ListaRefeicoes />
        
        {/* Botão flutuante de adicionar */}
        <AdicionarRefeicao />
      </div>
    </main>
  )
}