"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./validator";
import { useCreateTaskMutation } from "@/api/tasks";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const router = useRouter();
  const formMethods = useForm({ resolver: zodResolver(schema) });
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onSubmit = (data) => {
    createTask(data)
      .unwrap()
      .then((response) => {
        router.push(`/professor/atividades/${response.id}`);
      });
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <h1 className="text-3xl md:text-5xl font-bold">Criar atividade</h1>
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
        <Button className="mt-4" type="submit" disabled={isLoading}>
          Criar atividade
        </Button>
      </form>
    </FormProvider>
  );
}
