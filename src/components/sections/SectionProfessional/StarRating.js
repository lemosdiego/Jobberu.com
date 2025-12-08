"use client";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ soma, total, showTotal = true }) => {
  if (total === 0) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        {[...Array(5)].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-400" />
        ))}
        {showTotal && <span className="ml-2">0 avaliações</span>}
      </div>
    );
  }

  const media = soma / total;
  const estrelas = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= media) {
      estrelas.push(<FaStar size={18} key={i} className="text-yellow-400" />);
    } else if (i === Math.ceil(media) && !Number.isInteger(media)) {
      estrelas.push(
        <FaStarHalfAlt size={18} key={i} className="text-yellow-400" />
      );
    } else {
      estrelas.push(
        <FaRegStar size={18} key={i} className="text-yellow-400" />
      );
    }
  }

  return (
    <div className="flex items-center  text-gray-500">
      {estrelas}
      {showTotal && (
        <span className="ml-1">
          {total} {total === 1 ? "avaliação" : "avaliações"}
        </span>
      )}
    </div>
  );
};

export default StarRating;
