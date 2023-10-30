"use client";

import { useMemo } from "react";
import { useListSchedulesQuery } from "../../../api/schedules";
import { Loading } from "../../../components/Loading";

const defaultSchedule = {
  id: "times",
  day: "Horário",
  times: [
    {
      time: "7:30",
      subject: "7:30",
    },
    {
      time: "8:20",
      subject: "8:20",
    },
    {
      time: "9:10",
      subject: "9:10",
    },
    {
      time: "9:30",
      subject: "9:30",
    },
    {
      time: "10:20",
      subject: "10:20",
    },
    {
      time: "11:10",
      subject: "11:10",
    },
    {
      time: "12:00",
      subject: "12:00",
    },
    {
      time: "13:20",
      subject: "13:20",
    },
    {
      time: "14:10",
      subject: "14:10",
    },
    {
      time: "15:00",
      subject: "15:00",
    },
    {
      time: "15:20",
      subject: "15:20",
    },
    {
      time: "16:10",
      subject: "16:10",
    },
  ],
};

export default function SchedulesPage() {
  const { data, isLoading } = useListSchedulesQuery();

  const schedules = useMemo(() => {
    if (!data) return [];
    return [defaultSchedule, ...data];
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      {!schedules.length === 0 ? (
        <div className="w-full text-center font-bold font-lg">
          Nenhum horário..
        </div>
      ) : (
        <div className="w-full overflow-x-auto max-w-7xl mx-auto">
          <div className="w-full flex">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex flex-col flex-1 border border-gray-200"
              >
                <span className="text-center p-4 bg-gray-200">
                  {schedule.day}
                </span>
                {schedule.times.map((item) => (
                  <span
                    key={item.time}
                    className={`text-center border-b border-gray-200 px-4 py-2 ${schedule.day === "Intervalo" ? "text-red-400" : ""
                      }`}
                  >
                    {item.subject}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
