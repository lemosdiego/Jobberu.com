import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-[40vh] bg-blue-700 text-white py-8">
      <Link href={"/terms-of-use"}>Termos de uso</Link>
    </footer>
  );
}
