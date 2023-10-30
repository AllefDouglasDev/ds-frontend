"use client";

import { useListTasksQuery } from "../../../api/tasks";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "../../../components/Button";
import { Loading } from "../../../components/Loading";

export default function TasksPage() {
  const { data, isLoading } = useListTasksQuery();

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full overflow-y-auto">
      {!data || data.length === 0 ? (
        <div className="w-full text-center font-bold font-lg">
          Nenhuma atividade.
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {data.map((task) => (
            <div
              key={task.id}
              className={`w-full gap-3 rounded grid grid-cols-1 md:grid-cols-4 items-center p-4 ${!!task.deliveredAt ? "bg-green-100" : "bg-gray-200"
                }`}
            >
              <span className="truncate font-semibold">{task.title}</span>
              <span className="truncate">{task.description}</span>
              <div className="flex flex-col gap-2">
                <div className="truncate">
                  <span>Prazo:</span>{" "}
                  <span className="font-semibold">
                    {format(new Date(task.deadline), "dd/MM/yyyy 'às' HH:mm")}
                  </span>
                </div>
                {task.deliveredAt && (
                  <div className="truncate">
                    <span>Entregue:</span>{" "}
                    <span className="font-semibold">
                      {format(
                        new Date(task.deliveredAt),
                        "dd/MM/yyyy 'às' HH:mm"
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Link href={`/estudante/atividades/${task.id}`}>
                  <Button>Ver</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
