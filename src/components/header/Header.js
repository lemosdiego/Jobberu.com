import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-300 sticky top-0 z-50 h-[100px]">
      <Link href={"/register"}>Seja um Profissional</Link>
      <div className="a"></div>
    </header>
  );
}
