"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import { FaWhatsapp, FaSearch, FaUserCheck, FaSpinner } from "react-icons/fa";
import "./ServiceConfirmationRequest.css";

export default function ServiceConfirmationRequest() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [client, setClient] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [requesting, setRequesting] = useState(false);
  const [serviceRecord, setServiceRecord] = useState(null);

  // Função de busca com useCallback para otimização
  const searchClient = useCallback(async (phone) => {
    setLoadingSearch(true);
    setSearchError("");
    setClient(null);
    setServiceRecord(null); // Reseta o fluxo se mudar o número

    try {
      const cleanPhone = phone.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        // Evita buscas com números muito curtos
        setLoadingSearch(false);
        return;
      }
      const response = await api.get(
        `/registro-servico/buscar-cliente?celular=${cleanPhone}`
      );
      setClient(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchError("Cliente não encontrado.");
      } else {
        setSearchError("Erro ao buscar cliente. Tente novamente.");
        console.error("Erro na busca de cliente:", error);
      }
    } finally {
      setLoadingSearch(false);
    }
  }, []);

  // Debounce para a busca do cliente
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (phoneNumber) {
        searchClient(phoneNumber);
      } else {
        setClient(null);
        setSearchError("");
      }
    }, 800); // Atraso de 800ms para a busca

    return () => clearTimeout(delayDebounceFn);
  }, [phoneNumber, searchClient]);

  const handleRequestConfirmation = async () => {
    if (!client) return;

    setRequesting(true);
    try {
      const response = await api.post("/registro-servico/solicitar", {
        clienteId: client.id,
      });
      setServiceRecord(response.data);
    } catch (error) {
      console.error("Erro ao solicitar confirmação:", error);
      alert("Erro ao criar solicitação. Tente novamente.");
    } finally {
      setRequesting(false);
    }
  };

  const openWhatsApp = () => {
    if (!serviceRecord || !client) return;

    const baseUrl = window.location.origin;
    const confirmationLink = `${baseUrl}/confirmar-servico/${serviceRecord.id}`;

    const message = `Olá ${
      client.nome.split(" ")[0]
    }! Por favor, confirme que concluí o serviço para você clicando no link: ${confirmationLink}`;
    const encodedMessage = encodeURIComponent(message);

    // Pega o número e limpa (remove tudo que não for dígito)
    let cleanClientPhone = (client.telefone || phoneNumber).replace(/\D/g, "");

    // Garante que o código do país (55 para o Brasil) está presente
    // e evita adicionar o código duplicado caso já exista.
    if (!cleanClientPhone.startsWith("55")) {
      cleanClientPhone = `55${cleanClientPhone}`;
    }

    window.open(
      `https://wa.me/${cleanClientPhone}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="service-confirmation-card">
      <h3 className="service-confirmation-title">
        <FaUserCheck className="mr-2" />
        Aperto de Mão Digital
      </h3>
      <p className="service-confirmation-subtitle">
        Busque o cliente pelo celular e envie uma solicitação de confirmação.
      </p>

      <div className="service-confirmation-search">
        <div className="input-wrapper">
          <FaSearch className="input-icon" />
          <input
            type="tel"
            placeholder="Celular do Cliente (com DDD)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="service-confirmation-input"
          />
        </div>
        {loadingSearch && <FaSpinner className="animate-spin text-blue-600" />}
      </div>

      {searchError && (
        <p className="service-confirmation-error">{searchError}</p>
      )}

      {client && (
        <div className="client-result fade-in">
          <div className="client-info">
            <span className="client-avatar-placeholder">
              {client.nome.charAt(0)}
            </span>
            <div>
              <p className="client-name">{client.nome}</p>
              <p className="client-phone-display">Cliente encontrado</p>
            </div>
          </div>

          {!serviceRecord ? (
            <button
              onClick={handleRequestConfirmation}
              disabled={requesting}
              className="btn-request"
            >
              {requesting ? "Gerando..." : "Solicitar Confirmação"}
            </button>
          ) : (
            <div className="success-area fade-in">
              <p className="success-text">Solicitação criada com sucesso!</p>
              <button onClick={openWhatsApp} className="btn-whatsapp">
                <FaWhatsapp size={20} />
                Enviar via WhatsApp
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
