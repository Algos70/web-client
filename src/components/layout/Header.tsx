import Logo from "./header/Logo";
import UserMenu from "./header/UserMenu";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
