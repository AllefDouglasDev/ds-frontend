'use client'

import { useCreateEventMutation } from "@/api/events";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from './validator'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const { push } = useRouter();
  const formMethods = useForm({ resolver: zodResolver(schema) });

  const [createEvent, { isLoading }] = useCreateEventMutation()

  const onSubmit = (data) => {
    createEvent(data).unwrap().then(() => {
      push('/professor/eventos')
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-10">
      <h1 className="pb-5 text-3xl font-bold md:text-5xl">Criar Evento</h1>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="pb-5">
            <Input name='title' label='Título' placeholder='Título' />
          </div>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex-1">
              <Input name='start' label="Início" type="datetime-local"/>
            </div>
            <div className="flex-1">
              <Input name='end' label="Fim" type="datetime-local"/>
            </div>
          </div>
          <div className="pt-5 flex-1">
            <Button className="w-full" type="submit" disabled={isLoading}>Criar Evento</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
