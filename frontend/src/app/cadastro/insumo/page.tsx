"use client";

import { useState } from "react";
import { InsumoForm } from "@/components/insumos/insumos-form";

export default function CadastroInsumoPage() {
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(data: any) {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      setSuccess("Insumo cadastrado com sucesso!");
    } catch (err: any) {
      setError("Erro ao cadastrar insumo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-indigo-500/50 flex justify-center items-start py-8 px-4">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg">
        {/* Faixa superior igual à página de insumos */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-5 rounded-t-xl">
          <h2 className="text-2xl font-extrabold text-white tracking-wider">Novo Insumo</h2>
        </div>
        <div className="p-8">
          {success && <div className="mb-4 text-green-600 font-bold text-center">{success}</div>}
          {error && <div className="mb-4 text-red-600 font-bold text-center">{error}</div>}
          <InsumoForm
            onSubmit={handleSubmit}
            loading={loading}
            categories={categorias}
            suppliers={fornecedores}
          />
        </div>
      </div>
    </div>
  );
}