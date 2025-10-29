import Logo from "../common/Logo";
import UserMenu from "./header/UserMenu";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo size="md" />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
