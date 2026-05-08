// app/dashboard/page.tsx
'use client'

import { ListaRefeicoes } from '@/components/lista-refeicoes'
import { AdicionarRefeicao } from '@/components/adicionar-refeicao'

export default function DashboardPage() {
  return (
    <>
      <ListaRefeicoes />
      <AdicionarRefeicao />
    </>
  )
}
