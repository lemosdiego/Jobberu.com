import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Services.css";

export default function ServiceList({ services, onEdit, onDelete }) {
  if (services.length === 0) {
    return (
      <section className="service-list-empty">
        <h2 className=" service-list-empty_title">Nenhum serviço cadastrado</h2>
        <p className="service-list-empty_description">
          Clique em Adicionar Serviço para começar a divulgar seu trabalho.
        </p>
      </section>
    );
  }

  return (
    <div className="service-list-container">
      {services.map((service) => (
        <div key={service.id} className="service-list_card">
          <div className="service-list_card-image">
            <Image
              src={service.imagens?.[0] || "/placeholder-image.png"}
              alt={`Imagem do serviço ${service.titulo}`}
              layout="fill"
              objectFit="cover"
              className="service-list_card-image-img"
            />
          </div>
          <div className="service-list_card-actions">
            <div className="service-list_card-content">
              <h3 className="service-list_card-content-title">
                {service.titulo}
              </h3>
              <p className="service-list_card-content-subtitle">
                Categoria: {service.categoria}
              </p>
              <p className="service-list_card-content-description">
                {service.descricao.substring(0, 100)}
                {service.descricao.length > 100 && "..."}
              </p>
              {service.preco && (
                <p className="service-list_card-content-price">
                  R$ {parseFloat(service.preco).toFixed(2).replace(".", ",")}
                </p>
              )}
            </div>
            <div className="service-list_card-buttons">
              <button
                onClick={() => onEdit(service)}
                className="service-list_card-button-edit"
              >
                <FaEdit size={25} />
              </button>
              <button
                onClick={() => onDelete(service.id)}
                className="service-list_card-button-delete"
              >
                <FaTrashAlt size={25} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
