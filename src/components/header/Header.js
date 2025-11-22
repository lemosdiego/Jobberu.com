import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white sticky top-0  z-50 flex items-center justify-center p-9 max-md:p-5">
      <div className="w-[1200px]">
        <span>Jobberu.com</span>
      </div>
    </header>
  );
}
