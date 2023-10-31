"use client";

import { useCreateDoubtMutation } from "@/api/tasks";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validator";
import { format } from "date-fns";

export function TaskStudentCard({ taskId, student }) {
  const formMethods = useForm({ resolver: zodResolver(schema) });
  const [createDoubt, { isLoading }] = useCreateDoubtMutation();

  const onSubmit = (data) => {
    createDoubt({ id: taskId, to: student.id, ...data })
      .unwrap()
      .then(() => {
        formMethods.setValue('message', '')
        formMethods.setFocus('message')
      });
  };

  return (
    <div
      key={student.id}
      className={`flex flex-col gap-4 w-full p-4 rounded ${!!student.deliveredAt ? "bg-green-100/30" : "bg-red-100/30"
        }`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xl font-semibold">{student.name}</span>
        {student.deliveredAt && (
          <span>
            Entregue em:{" "}
            {format(new Date(student.deliveredAt), "dd/MM/yyyy 'às' HH:mm")}
          </span>
        )}
      </div>
      {student.content && (
        <div className="w-full rounded p-4 bg-green-200">
          <p className="whitespace-pre-line">{student.content}</p>
        </div>
      )}
      {student.doubts.length > 0 && (
        <details>
          <summary className="pb-2 font-semibold cursor-pointer">
            Dúvidas
          </summary>
          <div className="flex flex-col gap-2">
            {student.doubts.map((doubt) => (
              <div
                key={doubt.id}
                className={`rounded relative w-full p-4 pb-6 ${doubt.type === "student" ? "bg-gray-100" : "bg-sky-100"
                  }`}
              >
                <span className="whitespace-pre-line">{doubt.message}</span>
                <span className="absolute bottom-2 right-2 text-xs">
                  {format(new Date(doubt.createdAt), "dd/MM/yyyy 'às' HH:mm")}
                </span>
              </div>
            ))}
            <FormProvider {...formMethods}>
              <form
                className="w-full flex flex-col gap-4 mt-2"
                onSubmit={formMethods.handleSubmit(onSubmit)}
              >
                <Input
                  name="message"
                  placeholder="Escreva aqui..."
                  asTextarea
                  rows={5}
                />
                <Button type="submit" disabled={isLoading}>
                  Enviar
                </Button>
              </form>
            </FormProvider>
          </div>
        </details>
      )}
    </div>
  );
}
