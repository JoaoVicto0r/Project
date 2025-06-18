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
    <div className="w-full min-h-screen bg-indigo-500/50 flex justify-center items-center py-8 px-4">
      {/*
     </div> <div className="max-w-7xl w-full bg-white rounded-xl shadow-lg mx-auto">
         Faixa superior */}
        
        <div className="p-8">
          {success && <div className="mb-4 text-green-600 font-bold text-center">{success}</div>}
          {error && <div className="mb-4 text-red-600 font-bold text-center">{error}</div>}
          <div className="max-w-7xl w-full mx-auto">
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