'use client'

import { useParams } from "next/navigation";

export default function EditEventPage() {
  const { id }= useParams()
  return <div>Editar evento {id}</div>;
}
