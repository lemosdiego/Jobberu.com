import FormLogin from "@/components/auth/FormLogin";

export default function LoginPage() {
  return (
    <main className="page-login">
      <div className="bg-[url('https://res.cloudinary.com/dkrpmbjml/image/upload/v1764865632/login_i2eohx.jpg')] bg-contain bg-center bg-no-repeat shadow"></div>
      <div className="p-20">
        <FormLogin />
      </div>
    </main>
  );
}
