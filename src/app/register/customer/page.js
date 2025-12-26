"use client";
import FormRegisterClient from "@/components/Auth/RegisterClient/FormRegisterClient";

export default function RegisterPage() {
  return (
    <main className="page-register">
      <div className="page-register_default  page-register_bg-image"></div>
      <div className="page-register_container-form">
        <FormRegisterClient />
      </div>
    </main>
  );
}
