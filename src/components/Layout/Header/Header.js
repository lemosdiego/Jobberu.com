import NavigationDesktop from "@/components/Site/Navigation/NavigationDesktop";
import NavigationMobile from "@/components/Site/Navigation/NavigationMobile";
import Profile from "@/components/Site/Profile/Profile";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-400 text-white shadow-lg sticky top-0  z-50 flex items-center justify-center p-9 max-lg:p-5">
      <div className="w-[1200px] flex items-center justify-between">
        <Link href={"/"} className="logo">
          Jobberu.com
        </Link>
        <div className="flex items-center gap-5">
          <NavigationDesktop />
          <Profile />
          <NavigationMobile />
        </div>
      </div>
    </header>
  );
}
