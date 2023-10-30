"use client";

import {
  useCreateDoubtMutation,
  useDeliveryTaskMutation,
  useFetchTaskQuery,
} from "@/api/tasks";
import { Loading } from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryTaskSchema, doubtSchema } from "./validator";

export default function TaskDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const taskFormMethods = useForm({
    resolver: zodResolver(deliveryTaskSchema),
  });
  const doubtFormMethods = useForm({ resolver: zodResolver(doubtSchema) });

  const { data, isLoading } = useFetchTaskQuery(id);
  const [deliveryTask, { isLoading: isDelivering }] = useDeliveryTaskMutation();
  const [createDoubt, { isLoading: isCreatingDoubt }] =
    useCreateDoubtMutation();

  const onTaskSubmit = (data) => {
    deliveryTask({ id, ...data })
      .unwrap()
      .then(() => {
        router.push(`/estudante/atividades`);
      });
  };

  const onDoubtSubmit = (data) => {
    createDoubt({ id, to: data.teacherId, ...data })
      .unwrap()
      .then(() => {
        doubtFormMethods.setValue("message", "");
        doubtFormMethods.setFocus("message");
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <header className="flex flex-col gap-2 p-4 bg-gray-100 rounded">
        <h1 className="font-bold text-3xl md:text-5xl">{data.title}</h1>
        <p className="font-semibold">
          Prazo: {format(new Date(data.deadline), "dd/MM/yyyy 'às' HH:mm")}
        </p>
      </header>
      <div className="p-4">
        <p className="whitespace-pre-line">{data.description}</p>
      </div>
      {data.content ? (
        <div className="p-4 bg-sky-50 rounded mb-4 flex flex-col gap-4">
          <span className="text-lg font-semibold">Resposta:</span>
          <p className="whitespace-pre-line">{data.content}</p>
        </div>
      ) : (
        <FormProvider {...taskFormMethods}>
          <form
            className="w-full p-4 flex flex-col gap-4"
            onSubmit={taskFormMethods.handleSubmit(onTaskSubmit)}
          >
            <Input
              name="content"
              label="Resposta:"
              placeholder="Responda ao exercício aqui"
              asTextarea
              rows={5}
            />
            <Button type="submit" disabled={isDelivering}>
              Enviar
            </Button>
          </form>
        </FormProvider>
      )}

      <hr />

      <div className="w-full flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded">
          <h2 className="font-bold text-2xl md:text-3xl">Dúvidas</h2>
        </div>
        {data && data.doubts.length > 0 && (
          <div className="w-full p-4 flex flex-col gap-4">
            {data.doubts.map((doubt) => (
              <div
                key={doubt.id}
                className={`rounded relative w-full p-4 pb-6 ${doubt.type === "student" ? "bg-green-50" : "bg-sky-50"
                  }`}
              >
                <span>{doubt.message}</span>
                <span className="absolute bottom-2 right-2 text-xs">
                  {format(new Date(doubt.createdAt), "dd/MM/yyyy 'às' HH:mm")}
                </span>
              </div>
            ))}
          </div>
        )}
        <FormProvider {...doubtFormMethods}>
          <form
            className="w-full p-4 flex flex-col gap-4"
            onSubmit={doubtFormMethods.handleSubmit(onDoubtSubmit)}
          >
            <Input
              name="message"
              label="Dúvida:"
              placeholder="Escreva aqui..."
              asTextarea
              rows={5}
            />
            <Button type="submit" disabled={isCreatingDoubt}>
              Enviar
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
