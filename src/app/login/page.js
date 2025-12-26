import FormLogin from "@/components/Auth/Login/FormLogin";

export default function LoginPage() {
  return (
    <main className="page-login">
      <div className="page-login_bg-image page-login_default"></div>
      <div className="page-login_container-form">
        <FormLogin />
      </div>
    </main>
  );
}
