"use client";

import FormRegisterPrestador from "@/components/auth/FormRegisterPrestador";

export default function RegisterPrestadorPage() {
  return (
    <main className="page-register">
      <div className="bg-[url('https://res.cloudinary.com/dkrpmbjml/image/upload/v1764865625/cadastro_qeaoh1.jpg')] bg-contain bg-center bg-no-repeat shadow"></div>
      <div className="p-20">
        <FormRegisterPrestador />
      </div>
    </main>
  );
}
