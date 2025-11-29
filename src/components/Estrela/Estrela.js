// /components/Estrelas.jsx
"use client";
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // FaStarHalfAlt é visualmente melhor

export default function Estrelas({ nota }) {
  const estrelas = [];

  // Loop de 1 a 5 para criar as estrelas
  for (let i = 1; i <= 5; i++) {
    if (nota >= i) {
      // Estrela cheia
      estrelas.push(<FaStar key={i} color="#ffc107" />);
    } else if (nota >= i - 0.5) {
      // Meia estrela
      estrelas.push(<FaStarHalfAlt key={i} color="#ffc107" />);
    } else {
      // Estrela vazia
      estrelas.push(<FaRegStar key={i} color="#ffc107" />);
    }
  }

  return <div style={{ display: "flex" }}>{estrelas}</div>;
}
