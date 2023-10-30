"use client";

import Link from "next/link";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import { useDeleteUserMutation, useListUsersQuery } from "@/api/users";
import { MdDelete } from "react-icons/md";

export default function StudentsPage() {
  const { data, isLoading: isLoadingClasses } = useListUsersQuery({ type: 'student' });

  const [deleteUser] = useDeleteUserMutation()
  const handleDeleteUser = (id) => deleteUser(id)

  if (isLoadingClasses) return <Loading />;

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full p-4 flex justify-end">
        <Link href="/professor/alunos/criar">
          <Button as="a">Criar aluno</Button>
        </Link>
      </div>
      {!data || data.length === 0 ? (
        <div className="w-full text-center font-bold font-lg">
          Nenhum aluno.
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {data.map((student) => (
            <div
              key={student.id}
              className="w-full bg-gray-200 gap-3 rounded grid grid-cols-1 md:grid-cols-4 items-center p-4"
            >
              <span className="truncate font-semibold">{student.name}</span>
              <span className="truncate">{student.class.name}</span>
              <span className="truncate">{student.email}</span>
              <MdDelete className="ml-auto opacity-60" onClick={() => handleDeleteUser(student.id)} color='red' size={24} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
