"use client";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({ soma, total, showTotal = true }) => {
  if (total === 0) {
    return (
      <div className=" star-rating_empty">
        {[...Array(5)].map((_, i) => (
          <FaRegStar key={i} className="star-rating_empty-icon" />
        ))}
        {showTotal && (
          <span className="star-rating_empty-total">0 avaliações</span>
        )}
      </div>
    );
  }

  const media = soma / total;
  const estrelas = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= media) {
      estrelas.push(
        <FaStar size={18} key={i} className="star-rating_full-icon" />
      );
    } else if (i === Math.ceil(media) && !Number.isInteger(media)) {
      estrelas.push(
        <FaStarHalfAlt
          size={18}
          key={i}
          className="text-yellow-400 star-rating_half-icon"
        />
      );
    } else {
      estrelas.push(
        <FaRegStar
          size={18}
          key={i}
          className="text-yellow-400 star-rating_empty-icon"
        />
      );
    }
  }

  return (
    <div className="star-rating_full">
      {estrelas}
      {showTotal && (
        <span className="star-rating_full-total">
          {total} {total === 1 ? "avaliação" : "avaliações"}
        </span>
      )}
    </div>
  );
};

export default StarRating;
