'use client'

import { useMemo } from 'react'
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from './validator'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/api/users";
import { useListClassesQuery } from "@/api/classes";

export default function CreateUserPage() {
  const { push } = useRouter();
  const formMethods = useForm({ resolver: zodResolver(schema) });

  const { data } = useListClassesQuery();
  const [createUser, { isLoading }] = useCreateUserMutation()

  const classes = useMemo(() => {
    return (
      data?.map((item) => ({
        value: item.id,
        label: item.name,
      })) || []
    );
  }, [data]);

  const onSubmit = (data) => {
    createUser({ type: 'student', ...data }).unwrap().then(() => {
      push('/professor/alunos')
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-10">
      <h1 className="pb-5 text-3xl font-bold md:text-5xl">Criar Aluno</h1>
      <FormProvider {...formMethods}>
        <form className='flex flex-col gap-5' onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex-1">
              <Input name='name' label="Nome" />
            </div>
            <div className="flex-1">
              <Input name='email' label="E-mail" />
            </div>
          </div>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex-1">
              <Select
                name="classId"
                label="Turma"
                options={classes}
              />
            </div>
            <div className="flex-1">
              <Input name='password' label="Senha" type="password" />
            </div>
          </div>
          <div className="pt-5 flex-1">
            <Button className="w-full" type="submit" disabled={isLoading}>Criar Aluno</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

