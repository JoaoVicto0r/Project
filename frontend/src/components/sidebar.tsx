"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openCadastro, setOpenCadastro] = useState(false);

  const navItems = [
    { href: "/receitas", label: "Receitas" },
    { href: "/insumos", label: "Insumos" },
    { href: "/financeiro", label: "Financeiro" },
    { href: "/suporte", label: "Suporte" },
  ];

  const cadastroItems = [
    { href: "/cadastro/fornecedor", label: "Fornecedor" },
    { href: "/cadastro/categoria", label: "Categoria" },
    { href: "/cadastro/insumo", label: "Insumo" },
    // Adicione mais se quiser
  ];

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-lg ${
                  pathname.startsWith(item.href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setOpenCadastro((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <span>Cadastro</span>
              {openCadastro ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openCadastro && (
              <ul className="ml-4 mt-2 space-y-1">
                {cadastroItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 rounded-lg ${
                        pathname.startsWith(item.href)
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}