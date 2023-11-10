"use client";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useLoginMutation } from "../../api/auth";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validator";

export default function Login() {
  const { replace } = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");

  const formMethods = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    login(data)
      .unwrap()
      .then((response) => {
        if (response.user.type === "student") {
          replace("/estudante/atividades");
        } else if (response.user.type === 'teacher') {
          replace("/professor/atividades");
        } else {
          replace("/diretor/eventos");
        }
      })
      .catch((error) => {
        setError(error.data.message);
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-4 p-4 w-full max-w-lg"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-center text-4xl mb-5 text-black">
            Digital Schedule
          </h1>
          <Input
            autoFocus
            placeholder="nome@email.com"
            label="E-mail"
            name="email"
          />
          <Input
            id="password"
            label="Senha"
            placeholder="*******"
            type="password"
            name="password"
          />
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
          {error && <span className="text-red-500 font-bold">{error}</span>}
        </form>
      </FormProvider>
    </div>
  );
}
