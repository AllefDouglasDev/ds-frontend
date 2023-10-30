'use client'

import { useEffect } from 'react'
import { useEditEventMutation, useFetchEventQuery } from "@/api/events";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from './validator'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { Loading } from '@/components/Loading';

export default function EditEventPage() {
  const { id } = useParams()
  const route = '/professor/eventos'
  const { push, replace } = useRouter();

  const formMethods = useForm({ resolver: zodResolver(schema) });
  const { data: theEvent, isLoading: isLoadingEvent } = useFetchEventQuery(id)
  const [editEvent, { isLoading: isLoadingEditEvent }] = useEditEventMutation()

  const onSubmit = (data) => {
    editEvent({ id, ...data }).unwrap().then(() => {
      push(route)
    })
  }

  useEffect(() => {
    if (theEvent) {
      formMethods.reset({
        title: theEvent.title,
        start: new Date(theEvent.start).toISOString().slice(0, 16),
        end: new Date(theEvent.end).toISOString().slice(0, 16),
      })
    }
  }, [id, theEvent])

  if (isLoadingEvent) return <Loading />
  if (!theEvent) return replace(route)

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-10">
      <h1 className="pb-5 text-3xl font-bold md:text-5xl">Editar Evento</h1>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="pb-5">
            <Input name='title' label='Título' placeholder='Título' />
          </div>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex-1">
              <Input name='start' label="Início" type="datetime-local" />
            </div>
            <div className="flex-1">
              <Input name='end' label="Fim" type="datetime-local" />
            </div>
          </div>
          <div className="pt-5 flex-1">
            <Button className="w-full" type="submit" disabled={isLoadingEditEvent}>Editar Evento</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
