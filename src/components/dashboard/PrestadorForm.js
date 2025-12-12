"use client";

import React from "react";

export default function PrestadorForm({
  formData,
  handleInputChange,
  handleCepBlur,
  isEditing,
}) {
  return (
    <div className="space-y-6">
      {/* Linha 1: Nome e Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome Completo
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={formData.nome || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Linha 2: Telefone e CEP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefone
          </label>
          <input
            type="text"
            name="telefone"
            id="telefone"
            value={formData.telefone || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="cep"
            className="block text-sm font-medium text-gray-700"
          >
            CEP
          </label>
          <input
            type="text"
            name="cep"
            id="cep"
            value={formData.cep || ""}
            onChange={handleInputChange}
            onBlur={handleCepBlur}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Linha 3: Título Profissional */}
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

      {/* Linha 4: Biografia */}
      <div>
        <label
          htmlFor="biografia"
          className="block text-sm font-medium text-gray-700"
        >
          Biografia / Sobre seu trabalho
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
  );
}
