'use client'

import { useEffect } from 'react'
import { useEditTaskMutation, useFetchTaskQuery } from "@/api/tasks";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from './validator'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { Loading } from '@/components/Loading';
import Link from 'next/link';

export default function EditTaskPage() {
  const { id } = useParams()
  const route = '/professor/atividades'
  const { push, replace } = useRouter();

  const formMethods = useForm({ resolver: zodResolver(schema) });
  const { data: theTask, isLoading: isLoadingTask } = useFetchTaskQuery(id)
  const [editTask, { isLoading: isLoadingEditTask }] = useEditTaskMutation()

  const onSubmit = (data) => {
    editTask({ id, ...data }).unwrap().then(() => {
      push(route)
    })
  }

  useEffect(() => {
    if (theTask) {
      formMethods.reset({
        title: theTask.title,
        classId: theTask.classId,
        description: theTask.description,
        deadline: new Date(theTask.deadline).toISOString().slice(0, 16),
      })
    }
  }, [id, theTask])

  if (isLoadingTask) return <Loading />
  if (!theTask) return replace(route)

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <h1 className="text-3xl md:text-5xl font-bold">Editar atividade</h1>
        <Input name="title" label="Título" placeholder="Digite o título" />
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Select
            containerClassName="w-full"
            name="classId"
            label="Turma"
            options={[{ value: 1, label: "1 ano" }]}
          />
          <Input
            containerClassName="w-full"
            name="deadline"
            label="Prazo"
            type="datetime-local"
          />
        </div>
        <Input
          name="description"
          label="Descrição"
          placeholder="Digite a descrição"
          asTextarea
        />
        <Button className="mt-4" type="submit" disabled={isLoadingEditTask}>
          Editar atividade
        </Button>
      </form>
    </FormProvider>
  )
}

