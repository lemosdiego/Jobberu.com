import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function ServiceList({ services, onEdit, onDelete }) {
  if (services.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">
          Nenhum serviço cadastrado
        </h2>
        <p className="text-gray-500 mt-2">
          Clique em Adicionar Serviço para começar a divulgar seu trabalho.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col"
        >
          <div className="relative h-48 w-full border-10">
            <Image
              src={service.imagens?.[0] || "/placeholder-image.png"}
              alt={`Imagem do serviço ${service.titulo}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-lg font-bold text-gray-800">
              {service.titulo}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Categoria: {service.categoria}
            </p>
            <p className="text-gray-500 text-sm mt-2 flex-grow">
              {service.descricao.substring(0, 100)}
              {service.descricao.length > 100 && "..."}
            </p>
            {service.preco && (
              <p className="text-lg font-semibold text-green-600 mt-3">
                R$ {parseFloat(service.preco).toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
            <button
              onClick={() => onEdit(service)}
              className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-blue-100"
            >
              <FaEdit size={20} />
            </button>
            <button
              onClick={() => onDelete(service.id)}
              className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-100"
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
