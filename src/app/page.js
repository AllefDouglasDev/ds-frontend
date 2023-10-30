"use client";

import { useSelector } from "react-redux";
import { selectProfile } from "../store/auth/selectors";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (!profile) {
      router.replace('/login')
    } else if (profile.type === 'student') {
      router.replace('/estudante/atividades')
    } else if (profile.type === 'teacher') {
      router.replace('/professor/atividades')
    } 
  }, [profile, router])

  return (
    <div classNane="flex justify-center items-center w-screen h-screen">
      <span>carregando...</span>
    </div>
  );
}
