"use client";
import { useState, useEffect } from "react";

const feedbacks = [
  {
    id: 1,
    text: "O Jobberu facilitou muito minha vida! Consegui contratar profissionais qualificados rapidamente e sem burocracia.",
  },
  {
    id: 2,
    text: "Gosto de poder conversar direto com o prestador e negociar as condições. Transparência total.",
  },
  {
    id: 3,
    text: "Avaliei e fui avaliado após cada serviço, o que traz muita confiança para repetir as contratações.",
  },
  {
    id: 4,
    text: "Adorei poder salvar meus profissionais favoritos, assim fico tranquilo para quando precisar novamente.",
  },
];

export default function Feedbacks() {
  const [currentFeedback, setCurrentFeedback] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedback((prev) =>
        prev === feedbacks.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function handleNext() {
    setCurrentFeedback((prev) =>
      prev === feedbacks.length - 1 ? 0 : prev + 1
    );
  }

  function handlePrev() {
    setCurrentFeedback((prev) =>
      prev === 0 ? feedbacks.length - 1 : prev - 1
    );
  }

  function handleDotClick(index) {
    setCurrentFeedback(index);
  }

  return (
    <section className="border mb-8 w-full flex flex-col items-center relative max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Nossos Feedbacks</h2>
      <div className="mt-4 p-6 w-full text-center rounded-md bg-gray-50 shadow-sm min-h-[120px]">
        <p className="text-gray-700 text-lg">
          {feedbacks[currentFeedback].text}
        </p>
      </div>

      <button
        onClick={handlePrev}
        aria-label="Previous feedback"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        aria-label="Next feedback"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
      >
        &gt;
      </button>

      <div className="flex gap-3 mt-6">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${
              index === currentFeedback ? "bg-blue-600" : "bg-gray-300"
            } focus:outline-none`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to feedback ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
