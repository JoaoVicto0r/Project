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
      // await createInsumo(data);
      setSuccess("Insumo cadastrado com sucesso!");
    } catch (err: any) {
      setError("Erro ao cadastrar insumo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-indigo-500/50">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg mt-8">
        {/* Faixa superior igual à página de insumos */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-extrabold text-white tracking-wider">Novo Insumo</h2>
        </div>
        <div className="p-6">
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