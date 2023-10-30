"use client";

import { Button } from "../../../components/Button";
import { format } from "date-fns";
import {
  useDeleteEventMutation,
  useListEventsQuery,
} from "../../../api/events";
import { Loading } from "../../../components/Loading";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

export default function EventsPage() {
  const { data, isLoading } = useListEventsQuery();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const handleDelete = (id) => {
    deleteEvent({ id });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full p-4 flex justify-end">
        <Link href="/professor/eventos/criar">
          <Button as="a">Criar evento</Button>
        </Link>
      </div>
      {!data || data.length === 0 ? (
        <div className="w-full text-center font-bold font-lg">
          Nenhum evento.
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap p-4">
          {data.map((theEvent) => (
            <div
              key={theEvent.id}
              className="flex flex-col gap-4 p-4 rounded bg-gray-200 w-80 max-w-80"
            >
              <div className="w-full flex items-center justify-between gap-2">
                <span className="truncate font-bold text-xl">
                  {theEvent.title}
                </span>
                <button
                  className="opacity-60"
                  onClick={() => handleDelete(theEvent.id)}
                  disabled={isDeleting}
                >
                  <MdDelete color="red" size={25} />
                </button>
              </div>
              <div>
                <div>
                  <span>Início:</span>{" "}
                  <span className="font-semibold">
                    {format(new Date(theEvent.start), "dd/MM/yyyy 'às' HH:mm")}
                  </span>
                </div>
                <div>
                  <span>Fim:</span>{" "}
                  <span className="font-semibold">
                    {format(new Date(theEvent.end), "dd/MM/yyyy 'às' HH:mm")}
                  </span>
                </div>
                <div className="flex-1 mt-6">
                  <Link href={`/professor/eventos/${theEvent.id}`}>
                    <Button as="a">Ver</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
