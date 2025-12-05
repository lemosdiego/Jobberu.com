"use client";

import FormRegisterPrestador from "@/components/auth/FormRegisterPrestador";

export default function RegisterPrestadorPage() {
  return (
    <main className="page-register">
      <div className="page-register_default  page-register_bg-image"></div>
      <div className="page-register_container-form">
        <FormRegisterPrestador />
      </div>
    </main>
  );
}
