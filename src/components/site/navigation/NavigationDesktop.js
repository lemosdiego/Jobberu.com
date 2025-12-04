import Link from "next/link";

export default function NavigationDesktop() {
  return (
    <nav className="flex max-lg:hidden">
      <ul className="flex p-3 gap-10 max-xl:gap-8">
        <li>
          <Link
            href="/connect#be-a-professional"
            className="underline text-blue-800 text-lg font-bold hover:text-blue-500"
          >
            Seja um Profissional
          </Link>
        </li>
        <li>
          <Link href="/connect#how-it-works" className="text-lg underline">
            Como funciona?
          </Link>
        </li>
        <li>
          <Link href="/connect#responsibilities" className="text-lg underline">
            Responsabilidades
          </Link>
        </li>
      </ul>
    </nav>
  );
}
