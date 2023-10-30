'use client'

import { useParams } from "next/navigation";
import { Loading } from '@/components/Loading';

export default function EditTaskPage() {
  const { id } = useParams()
  const route = '/professor/atividades'

  if (isLoadingTask) return <Loading />
  if (!theTask) return replace(route)

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold">Atividade {id}</h1>
    </div>
  )
}
