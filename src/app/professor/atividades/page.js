"use client";

import { Button } from "../../../components/Button";
import { useListTasksQuery } from "../../../api/tasks";
import Link from "next/link";
import { format } from "date-fns";
import { Loading } from "../../../components/Loading";

export default function TasksPage() {
  const { data, isLoading } = useListTasksQuery();
  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full p-4 flex justify-end">
        <Link href="/professor/atividades/criar">
          <Button as="a">Criar atividade</Button>
        </Link>
      </div>
      {!data || data.length === 0 ? (
        <div className="w-full text-center font-bold font-lg">
          Nenhuma atividade.
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {data.map((task) => (
            <div
              key={task.id}
              className="w-full bg-gray-200 gap-3 rounded grid grid-cols-1 md:grid-cols-4 items-center p-4"
            >
              <span className="truncate font-semibold">{task.title}</span>
              <span className="truncate">{task.description}</span>
              <div className="truncate">
                <span>Prazo:</span>{" "}
                <span className="font-semibold">
                  {format(new Date(task.deadline), "dd/MM/yyyy 'às' HH:mm")}
                </span>
              </div>
              <div className="flex gap-2 justify-end">
                <Link href={`/professor/atividades/${task.id}/editar`}>
                  <Button as="a">Editar</Button>
                </Link>
                <Link href={`/professor/atividades/${task.id}`}>
                  <Button as="a">Ver</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
