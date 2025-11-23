import NavigationDesktop from "../navigation/NavigationDesktop";
import Profile from "../profile/Profile";

export default function Header() {
  return (
    <header className="w-full bg-blue-50 sticky top-0  z-50 flex items-center justify-center p-9 max-md:p-5">
      <div className="w-[1200px] border flex items-center justify-between">
        <span className="logo">Jobberu.com</span>
        <NavigationDesktop />
        <Profile />
      </div>
    </header>
  );
}
