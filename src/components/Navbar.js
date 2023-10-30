"use client";

import Link from "next/link";
import { Button } from "./Button";
import { useAppDispatch } from "../store";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../store/auth/slice";

export function Navbar({ type }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    replace("/login");
  };

  return (
    <div className="w-full h-16 flex items-center justify-between p-4 border-b border-gray-400">
      <h1 className="text-2xl font-bold">Digital Schedule</h1>
      <div className="flex gap-6">
        <Link
          href={`/${type}/atividades`}
          className={pathname.includes("atividades") ? "text-sky-700" : ""}
        >
          Atividades
        </Link>
        {type === "estudante" && (
          <Link
            href={`/${type}/horarios`}
            className={pathname.includes("horarios") ? "text-sky-700" : ""}
          >
            Horários
          </Link>
        )}
        <Link
          href={`/${type}/eventos`}
          className={pathname.includes("eventos") ? "text-sky-700" : ""}
        >
          Eventos
        </Link>
      </div>
      <Button onClick={handleLogout}>Sair</Button>
    </div>
  );
}
