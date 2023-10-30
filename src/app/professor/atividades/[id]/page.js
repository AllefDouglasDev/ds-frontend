"use client";

import { useFetchTaskQuery } from "@/api/tasks";
import { useParams } from "next/navigation";
import { Loading } from "@/components/Loading";
import { format } from "date-fns";
import { TaskStudentCard } from "@/components/TaskStudentCard";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useFetchTaskQuery(id);

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
      <hr />
      <div className="w-full my-4 flex flex-col gap-4">
        {data?.students?.map((student) => (
          <TaskStudentCard key={student.id} taskId={id} student={student} />
        ))}
      </div>
    </div>
  );
}
