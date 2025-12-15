import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";

export default function ServiceForm({ service, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    preco: "",
    imagens: [],
    imagens_a_remover: [], // Novo campo para rastrear exclusões
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  // Estado para exibir as imagens atuais
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    if (service) {
      setFormData({
        titulo: service.titulo || "",
        descricao: service.descricao || "",
        categoria: service.categoria || "",
        preco: service.preco || "",
        imagens: [], // O usuário pode adicionar novas imagens
        imagens_a_remover: [],
      });
      // Armazena as imagens atuais para exibição
      setCurrentImages(service.imagens || []);
    }
  }, [service]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imagens: e.target.files }));
  };

  // Função para marcar uma imagem para remoção
  const handleMarkImageForRemoval = (imageUrl) => {
    // Adiciona a URL à lista de remoção
    setFormData((prev) => ({
      ...prev,
      imagens_a_remover: [...prev.imagens_a_remover, imageUrl],
    }));
    // Remove da lista de exibição visualmente
    setCurrentImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const result = await onSave(formData);
    if (!result.success) {
      setError(result.error);
    }
    // Não precisamos chamar onCancel aqui, pois onSave já faz isso em caso de sucesso.
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-4"
        >
          <IoArrowBack size={20} />
          Voltar para a lista
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {service ? "Editar Serviço" : "Adicionar Novo Serviço"}
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>
        )}

        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-700"
          >
            Título do Serviço
          </label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            name="descricao"
            id="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            rows="4"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria
          </label>
          <input
            type="text"
            name="categoria"
            id="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="preco"
            className="block text-sm font-medium text-gray-700"
          >
            Preço (Opcional)
          </label>
          <input
            type="number"
            name="preco"
            id="preco"
            value={formData.preco}
            onChange={handleInputChange}
            step="0.01"
            placeholder="Ex: 150.00"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="imagens"
            className="block text-sm font-medium text-gray-700"
          >
            Imagens (Opcional)
          </label>

          {/* Exibição das imagens atuais (apenas no modo de edição) */}
          {service && currentImages.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-4">
              {currentImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={imageUrl}
                    alt={`Imagem atual ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleMarkImageForRemoval(imageUrl)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remover imagem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            type="file"
            name="imagens"
            id="imagens"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            {service
              ? "Você pode adicionar novas imagens ou remover as existentes."
              : "Você pode selecionar múltiplos arquivos."}
          </p>
        </div>

        <footer className="pt-4 flex justify-end gap-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Salvando..."
              : service
              ? "Salvar Alterações"
              : "Criar Serviço"}
          </button>
        </footer>
      </form>
    </div>
  );
}
