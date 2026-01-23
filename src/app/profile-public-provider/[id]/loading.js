"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full max-w-5xl space-y-6">
        {/* Card do Perfil (Simulando o Header) */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Skeleton circle width={160} height={160} />
            </div>

            {/* Informações do Profissional */}
            <div className="flex-grow w-full space-y-4 text-center md:text-left">
              <div className="space-y-2">
                <Skeleton width="70%" height={40} />
                <Skeleton width="40%" height={24} />
              </div>

              <div className="flex justify-center md:justify-start gap-3">
                <Skeleton width={100} height={32} borderRadius={20} />
                <Skeleton width={100} height={32} borderRadius={20} />
              </div>

              <div className="pt-2">
                <Skeleton count={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Serviços / Galeria */}
        <div className="space-y-4">
          <Skeleton width="30%" height={32} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden h-80"
                >
                  <div className="h-48">
                    <Skeleton height="100%" />
                  </div>
                  <div className="p-4 space-y-3">
                    <Skeleton width="80%" height={24} />
                    <Skeleton width="50%" height={20} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
