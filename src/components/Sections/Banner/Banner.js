import "./Banner.css";

export default function Banner({ title, description, searchState }) {
  return (
    <section className="section-banner">
      <div className="section-banner__overlay">
        <div className="section-banner__content">
          <h2 className="section-banner__title">{title}</h2>
          <p className="section-banner__description">{description}</p>
        </div>
      </div>
    </section>
  );
}
