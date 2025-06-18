"use client";

import Link from "next/link";

export default function CadastroPage() {
  return (
    <div className="max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-extrabold text-indigo-700 mb-6 tracking-wider">Cadastro</h1>
      <p className="mb-8 text-neutral-600">Selecione o que deseja cadastrar:</p>
      <div className="space-y-4">
        <Link
          href="/cadastro/fornecedor"
          className="block w-full px-6 py-4 rounded-lg border border-indigo-200 text-indigo-700 font-bold text-lg hover:bg-indigo-50 transition"
        >
          Cadastrar Fornecedor
        </Link>
        <Link
          href="/cadastro/categoria"
          className="block w-full px-6 py-4 rounded-lg border border-indigo-200 text-indigo-700 font-bold text-lg hover:bg-indigo-50 transition"
        >
          Cadastrar Categoria
        </Link>
        <Link
          href="/cadastro/insumo"
          className="block w-full px-6 py-4 rounded-lg border border-indigo-200 text-indigo-700 font-bold text-lg hover:bg-indigo-50 transition"
        >
          Cadastrar Insumo
        </Link>
        {/* Adicione mais opções conforme necessário */}
      </div>
    </div>
  );
}