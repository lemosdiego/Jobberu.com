import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";

const categories = [
  "Jardinagem",
  "Manicure e Pedicure",
  "Barbeiro",
  "Limpeza Residencial",
  "Eletricista",
  "Encanador",
  "Pintor",
  "Montagem de Móveis",
  "Personal Trainer",
  "Manutenção de Piscinas",
  "Aulas Particulares",
  "Motorista",
  "Frete",
  "Obras",
  "Cabeleireira",
  "Dedetização",
  "Chaveiro",
];

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
  // Estado para pré-visualização de novas imagens
  const [newImagePreviews, setNewImagePreviews] = useState([]);

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

    // Cleanup para revogar as URLs de objeto e evitar memory leaks
    return () => {
      newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [service]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imagens: e.target.files }));
    const files = e.target.files;
    setFormData((prev) => ({ ...prev, imagens: files }));

    // Limpa previews antigos
    newImagePreviews.forEach((url) => URL.revokeObjectURL(url));

    // Cria novas URLs de pré-visualização
    const previewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setNewImagePreviews(previewUrls);
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
    <div className="form-service_container">
      <header className="form-service_header">
        <button onClick={onCancel} className=" form-service_header-button">
          <IoArrowBack size={20} />
          Voltar para a lista
        </button>
        <h2 className=" form-service_header-title">
          {service ? "Editar Serviço" : "Adicionar Novo Serviço"}
        </h2>
      </header>

      <form onSubmit={handleSubmit} className="form-service_form">
        {error && <p className=" form-service_form-error">{error}</p>}
        <div className="form-service_form-container">
          <div className="form-service_form-box_inputs">
            <label
              htmlFor="titulo"
              className="form-service_form-box_inputs-label"
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
              className=" form-service_form-box_inputs-input"
            />
          </div>
          <div className="form-service_form-box_inputs">
            <label
              htmlFor="categoria"
              className="form-service_form-box_inputs-label"
            >
              Categoria
            </label>
            <select
              name="categoria"
              id="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              className=" form-service_form-box_inputs-input"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="form-service_form-box_inputs-label"
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
            className="form-service_form-box_inputs-textarea"
          ></textarea>
        </div>
        <div className="form-service_form-container">
          <div>
            <label
              htmlFor="preco"
              className="form-service_form-box_inputs-label"
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
              className=" form-service_form-box_inputs-input "
            />
          </div>

          <div>
            <label
              htmlFor="imagens"
              className=" form-service_form-box_inputs-label"
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

            {/* Pré-visualização das NOVAS imagens selecionadas */}
            {newImagePreviews.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Novas imagens a serem adicionadas:
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {newImagePreviews.map((previewUrl, index) => (
                    <Image
                      key={index}
                      src={previewUrl}
                      alt={`Preview da nova imagem ${index + 1}`}
                      width={150}
                      height={150}
                      className="object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}

            <input
              type="file"
              name="imagens"
              id="imagens"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="form-service_form-box_inputs-input"
            />
            <p className="text-xs text-gray-500 mt-1">
              {service
                ? "Você pode adicionar novas imagens ou remover as existentes."
                : "Você pode selecionar múltiplos arquivos."}
            </p>
          </div>
        </div>

        <footer className=" form-service_form-footer">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="form-service_form-footer-button-cancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="-service_form-footer-button-save"
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
