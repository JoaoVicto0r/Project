"use client";

import { useState } from "react";
import { FornecedorForm } from "@/components/fornecedor/fornecedor-form";
import { useRouter } from 'next/navigation';


export default function CadastroInsumoPage() {
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

const handleCancel = () => {
  router.back(); // volta para a última página acessada
};

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
  
    <div className="max-w-9xl w-full bg-white rounded-xl shadow-lg mx-auto">
      <div className="p-8">
        {success && <div className="mb-4 text-green-600 font-bold text-center">{success}</div>}
        {error && <div className="mb-4 text-red-600 font-bold text-center">{error}</div>}
        {/* Remova o container extra aqui */}
        <FornecedorForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={loading}
            mode="create"
        />
      </div>
    </div>
  
  );
}