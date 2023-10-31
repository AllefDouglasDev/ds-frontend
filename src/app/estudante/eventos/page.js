"use client";

import { format } from "date-fns";
import { useListEventsQuery } from "../../../api/events";
import { Loading } from "../../../components/Loading";

export default function EventsPage() {
  const { data, isLoading } = useListEventsQuery();
  if (isLoading) return <Loading />;
  return (
    <div>
      {!data || data.length === 0 ? (
        <div className="w-full text-center font-bold font-lg mt-12">
          Nenhum evento.
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap p-4">
          {data.map((theEvent) => (
            <div
              key={theEvent.id}
              className="flex flex-col gap-4 p-4 rounded bg-gray-200 w-80 max-w-80"
            >
              <span className="font-bold text-xl">{theEvent.title}</span>
              <div>
                <div>
                  <span>Início:</span>{" "}
                  <span className="font-semibold">
                    {format(new Date(theEvent.start), "dd/MM/yyyy 'às' HH:mm")}
                  </span>
                </div>
                {theEvent.end && (
                  <div>
                    <span>Fim:</span>{" "}
                    <span className="font-semibold">
                      {format(new Date(theEvent.end), "dd/MM/yyyy 'às' HH:mm")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
