import responsibilities from "@/data/responsibilities";
import "./Responsibilities.css";

export default function Responsibilities() {
  return (
    <section className="section-responsibilities">
      <div className="section-responsibilities_container">
        <div className="section-responsibilities_container-title">
          <h2 className="section-responsibilities_title">
            Responsabilidades do Usuário
          </h2>
        </div>
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
