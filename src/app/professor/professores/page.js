"use client";

import Link from "next/link";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import { useDeleteUserMutation, useListUsersQuery } from "@/api/users";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectProfile } from "@/store/auth/selectors";

export default function TeachersPage() {
  const profile = useSelector(selectProfile)
  const [deleteUser] = useDeleteUserMutation()

  const { data, isLoading } = useListUsersQuery({ type: 'teacher' });

  const handleDeleteUser = (id) => deleteUser(id)

  if (isLoading) <Loading />

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full p-4 flex justify-end">
        <Link href="/professor/professores/criar">
          <Button as="a">Criar professor</Button>
        </Link>
      </div>
      {!data || data.length === 0 ? (
        <div className="w-full text-center font-bold font-lg">
          Nenhum aluno.
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {data.map((teacher) => {
            if (profile.id === teacher.id) return
            return (
              <div
                key={teacher.id}
                className="w-full bg-gray-200 gap-3 rounded grid grid-cols-1 md:grid-cols-3 items-center p-4"
              >
                <span className="truncate font-semibold">{teacher.name}</span>
                <span className="truncate">{teacher.email}</span>
                <MdDelete className="ml-auto opacity-60" onClick={() => handleDeleteUser(teacher.id)} color='red' size={24} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

