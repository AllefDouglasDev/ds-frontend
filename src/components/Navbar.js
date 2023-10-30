"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { useAppDispatch } from "../store";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../store/auth/slice";
import { useDevice } from "@/hooks/useDevice";
import { MdClose, MdMenu } from "react-icons/md";

export function Navbar({ type }) {
  const { isMobile } = useDevice();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    replace("/login");
  };

  const handleToggleMenu = () => {
    setIsOpen((_isOpen) => !_isOpen);
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col">
        <div className="w-full h-16 flex items-center justify-between p-4 border-b border-gray-400">
          <h1 className="font-bold">Digital Schedule</h1>
          <button onClick={handleToggleMenu}>
            {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="flex flex-col gap-4 p-4 border-b border-gray-400">
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
            <Button onClick={handleLogout}>Sair</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-16 flex items-center justify-between p-4 border-b border-gray-400">
      <h1 className="text-sm font-bold">Digital Schedule</h1>
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
