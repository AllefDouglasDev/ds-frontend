'use client'

import { useFetchTaskQuery } from "@/api/tasks";
import { useRouter, useParams } from "next/navigation";
import { Loading } from '@/components/Loading';

export default function EditTaskPage() {
  const { id } = useParams()
  const route = '/professor/atividades'
  const { replace } = useRouter();

  const { data: theTask, isLoading: isLoadingTask } = useFetchTaskQuery(id)

  if (isLoadingTask) return <Loading />
  if (!theTask) return replace(route)

  console.log(theTask)

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold">Atividade {id}</h1>
    </div>
  )
}
