"use client";

import React from "react";
import "./Prestador.css";

export default function PrestadorForm({
  formData,
  handleInputChange,
  handleCepBlur,
  isEditing,
}) {
  return (
    <div className=" prestador-form_container">
      {/* Linha 1: Nome e Email */}
      <div className="prestador-form_box-grid-1">
        <div>
          <label htmlFor="nome" className="prestador-form_label">
            Nome Completo
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={formData.nome || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="prestador-form_input"
          />
        </div>
        <div>
          <label htmlFor="email" className="prestador-form_label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="prestador-form_input"
          />
        </div>
      </div>

      {/* Linha 2: Telefone e CEP */}
      <div className="prestador-form_box-grid-2">
        <div>
          <label htmlFor="telefone" className="prestador-form_label">
            Telefone
          </label>
          <input
            type="text"
            name="telefone"
            id="telefone"
            value={formData.telefone || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="prestador-form_input"
          />
        </div>
        <div>
          <label htmlFor="cep" className="prestador-form_label">
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
            className="prestador-form_input"
          />
        </div>
        <div>
          <label htmlFor="titulo_profissional" className="prestador-form_label">
            Título Profissional
          </label>
          <input
            type="text"
            name="titulo_profissional"
            id="titulo_profissional"
            value={formData.titulo_profissional || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="prestador-form_input"
          />
        </div>
      </div>
      <div className="prestador-form_box-grid-3">
        <label htmlFor="biografia" className="prestador-form_label">
          Biografia / Sobre seu trabalho
        </label>
        <textarea
          name="biografia"
          id="biografia"
          rows="4"
          value={formData.biografia || ""}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="prestador-form_textarea"
        ></textarea>
      </div>
    </div>
  );
}
