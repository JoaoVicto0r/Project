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
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-indigo-700 mb-6 tracking-wider">Cadastrar Insumo</h1>
      {success && <div className="mb-4 text-green-600 font-bold">{success}</div>}
      {error && <div className="mb-4 text-red-600 font-bold">{error}</div>}
      <InsumoForm
        onSubmit={handleSubmit}
        loading={loading}
        categories={categorias}
        suppliers={fornecedores}
      />
    </div>
  );
}