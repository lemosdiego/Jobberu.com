import responsibilities from "@/data/responsibilities";
import "./Responsibilities.css";
import Title from "@/components/Site/Title/Title";

export default function Responsibilities() {
  return (
    <section className="section-responsibilities">
      <div className="section-responsibilities_container">
        <Title>Responsabilidades</Title>
        <div className="section-responsibilities_container-cards">
          {responsibilities.map((item, index) => (
            <div key={index} className="section-responsibilities_card">
              <h3 className="section-responsibilities_card-title">
                {item.title}
              </h3>
              <p className="section-responsibilities_card-description">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
