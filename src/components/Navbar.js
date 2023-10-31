"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { useAppDispatch } from "../store";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../store/auth/slice";
import { useDevice } from "@/hooks/useDevice";
import { MdClose, MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectProfile } from "@/store/auth/selectors";

export function Navbar({ type }) {
  const { isMobile } = useDevice();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const profile = useSelector(selectProfile);

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
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">{profile?.name}</span>
            <button onClick={handleToggleMenu}>
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
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
            {type === "professor" && (
              <Fragment>
                <Link
                  href={`/${type}/alunos`}
                  className={pathname.includes("alunos") ? "text-sky-700" : ""}
                >
                  Alunos
                </Link>
                <Link
                  href={`/${type}/professores`}
                  className={
                    pathname.includes("professores") ? "text-sky-700" : ""
                  }
                >
                  Professores
                </Link>
              </Fragment>
            )}
            <Button onClick={handleLogout}>Sair</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full border-b border-gray-400">
      <div className="w-full max-w-7xl mx-auto h-16 flex items-center justify-between p-4">
        <h1 className="font-bold">Digital Schedule</h1>
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
          {type === "professor" && (
            <Fragment>
              <Link
                href={`/${type}/alunos`}
                className={pathname.includes("alunos") ? "text-sky-700" : ""}
              >
                Alunos
              </Link>
              <Link
                href={`/${type}/professores`}
                className={
                  pathname.includes("professores") ? "text-sky-700" : ""
                }
              >
                Professores
              </Link>
            </Fragment>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">{profile?.name}</span>
          <Button onClick={handleLogout}>Sair</Button>
        </div>
      </div>
    </div>
  );
}
