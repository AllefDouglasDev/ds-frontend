'use client'

import { useParams } from "next/navigation";

export default function EditTaskPage() {
  const { id }= useParams()
  return <div>Editar atividade {id}</div>;
}
