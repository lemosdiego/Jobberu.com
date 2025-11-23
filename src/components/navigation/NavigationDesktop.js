import Link from "next/link";

export default function NavigationDesktop() {
  return (
    <nav className="flex max-md:hidden">
      <ul className="border flex p-4 gap-10">
        <li>
          <Link href="/register">Seja um Profissional</Link>
        </li>
        <li>
          <Link href="/about">Como funciona?</Link>
        </li>
        <li>
          <Link href="/contact">Responsabilidades</Link>
        </li>
      </ul>
    </nav>
  );
}
