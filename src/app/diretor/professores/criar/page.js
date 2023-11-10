"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/api/users";

export default function CreateTeacherPage() {
  const { push } = useRouter();
  const formMethods = useForm({ resolver: zodResolver(schema) });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = (data) => {
    createUser({ type: "teacher", ...data })
      .unwrap()
      .then(() => {
        push("/diretor/professores");
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-10">
      <h1 className="pb-5 text-3xl font-bold md:text-5xl">Criar Professor</h1>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-5"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <div className="flex gap-5 flex-col">
            <div className="flex-1">
              <Input name="name" label="Nome" />
            </div>
            <div className="flex-1">
              <Input name="email" label="E-mail" />
            </div>
            <div className="flex-1">
              <Input name="password" label="Senha" type="password" />
            </div>
          </div>
          <div className="pt-5 flex-1">
            <Button className="w-full" type="submit" disabled={isLoading}>
              Criar Professor
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
