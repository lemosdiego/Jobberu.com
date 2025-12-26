"use client";

import Link from "next/link";
import "../Auth.css";
import { useRegisterClient } from "@/hooks/useRegisterClient"; // ajuste o path

export default function FormRegisterClient() {
  const {
    formData,
    fotoPerfil,
    loading,
    error,
    success,
    termsAccepted,
    handleChange,
    handleFileChange,
    handleCepBlur,
    handleSubmit,
    setTermsAccepted,
  } = useRegisterClient();

  return (
    <form onSubmit={handleSubmit} className="form-register">
      <div className="form-register_container-title">
        <h2 className="form-register_title">Cadastro de Cliente</h2>
      </div>
      {error && <p className="form-register_error">{error}</p>}
      {success && <p className="form-register_sucess">{success}</p>}

      <div className="form-register_container-box_inputs">
        <div className="form-register_container_inputs">
          <label htmlFor="nome" className="form-register_label">
            Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
        <div className="form-register_container_inputs">
          <label htmlFor="email" className="form-register_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
      </div>
      <div className="form-register_container-box_inputs">
        <div className="form-register_container_inputs">
          <label htmlFor="senha" className="form-register_label">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
        <div className="form-register_container_inputs">
          <label htmlFor="telefone" className="form-register_label">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
            required
            className="form-register_input"
          />
        </div>
      </div>
      <div className="form-register_container-box_inputs">
        <div className="form-register_container_inputs">
          <label htmlFor="foto_perfil" className="form-register_label">
            Foto de Perfil (Opcional)
          </label>
          <input
            type="file"
            id="foto_perfil"
            name="foto_perfil"
            onChange={handleFileChange}
            className="form-register_input"
          />
        </div>
        <div className="form-register_container_inputs">
          <label htmlFor="cep" className="form-register_label">
            CEP
          </label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
            required
            className="form-register_input"
          />
        </div>
      </div>
      <div className="form-register_container-box_inputs">
        <div className="form-register_container_inputs">
          <label htmlFor="logradouro" className="form-register_label">
            Logradouro
          </label>
          <input
            type="text"
            id="logradouro"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
        <div className="form-register_container_inputs">
          <label htmlFor="bairro" className="form-register_label">
            Bairro
          </label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
      </div>
      <div className="form-register_container-box_inputs-clientes">
        <div className="form-register_container_inputs">
          <label htmlFor="cidade" className="form-register_label">
            Cidade
          </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
        <div className="form-register_container_inputs">
          <label htmlFor="estado" className="form-register_label">
            Estado
          </label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
        <div className="form-register_container_inputs">
          <label htmlFor="numero" className="form-register_label">
            Número
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            className="form-register_input"
          />
        </div>
      </div>

      <div className="form-register_container_inputs">
        <label htmlFor="terms" className="form-register_label_checkbox">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
            className="form-register_checkbox"
          />
          Eu li e aceito os
          <Link
            href="/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
            className="form-terms"
          >
            Termos de Uso
          </Link>
          .
        </label>
      </div>
      <button
        type="submit"
        disabled={loading || !termsAccepted}
        className="form-register_button"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
