import "./Title.css";

export default function Title({ children, className, classNameTitle }) {
  return (
    <div className={`container-title ${className}}`}>
      <h2 className={`title ${classNameTitle}`}>{children}</h2>
    </div>
  );
}
