import Link from "next/link";
import { FaCar, FaDumbbell, FaLeaf } from "react-icons/fa";
import { GiNails } from "react-icons/gi";
import "./FeaturedCategories.css";
import Title from "@/components/Site/Title/Title";

const categories = [
  {
    name: "Jardinagem",
    icon: <FaLeaf size={32} />,
    href: "/servicos/categoria/Jardinagem",
  },
  {
    name: "Personal Trainer",
    icon: <FaDumbbell size={32} />,
    href: "/servicos/categoria/Personal%20Trainer",
  },
  {
    name: "Manicure e Pedicure",
    icon: <GiNails size={32} />,
    href: "/servicos/categoria/Manicure%20e%20Pedicure",
  },
  {
    name: "Motorista",
    icon: <FaCar size={32} />,
    href: "/servicos/categoria/Motorista",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="section-featured-categories">
      <div className="section-featured-categories_container">
        <Title>Categorias em destaque</Title>
        <div className="section-featured-categories_grid">
          {categories.map((category) => (
            <div
              key={category.name}
              className="section-featured-categories_card"
            >
              <div className="section-featured-categories_icon">
                {category.icon}
              </div>
              <span className="section-featured-categories_name">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
