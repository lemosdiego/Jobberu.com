"use client";

import React from "react";
import "./ProfileCllient.css";

export default function ProfileForm({
  formData,
  handleInputChange,
  handleFileChange, // Nova prop para lidar com a mudança do arquivo
  isEditing,
}) {
  return (
    <div className="profile-client-container">
      {/* Linha 1: Nome e Email */}
      <div className="profile-client-container_grid">
        <div className="profile-client_grid-inputs">
          <label htmlFor="nome" className="profile-client_grid-label">
            Nome Completo
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={formData.nome || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-client_inputs"
          />
        </div>
        <div className="profile-client_grid-inputs">
          <label htmlFor="email" className="profile-client_grid-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-client_inputs"
          />
        </div>
      </div>

      {/* Linha 2: Telefone e CEP */}
      <div className="profile-client-container_grid">
        <div className="profile-client_grid-inputs">
          <label htmlFor="telefone" className="profile-client_grid-label">
            Telefone
          </label>
          <input
            type="text"
            name="telefone"
            id="telefone"
            value={formData.telefone || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-client_inputs"
          />
        </div>
        <div className="profile-client_grid-inputs">
          <label htmlFor="cep" className="profile-client_grid-label">
            CEP
          </label>
          <input
            type="text"
            name="cep"
            id="cep"
            value={formData.cep || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="profile-client_inputs"
          />
        </div>
      </div>

      {/* Campos específicos do Prestador */}
      {formData.is_prestador && (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="titulo_profissional"
              className="block text-sm font-medium text-gray-700"
            >
              Título Profissional
            </label>
            <input
              type="text"
              name="titulo_profissional"
              id="titulo_profissional"
              value={formData.titulo_profissional || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="biografia"
              className="block text-sm font-medium text-gray-700"
            >
              Biografia
            </label>
            <textarea
              name="biografia"
              id="biografia"
              rows="4"
              value={formData.biografia || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
