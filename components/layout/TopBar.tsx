import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-7 md:px-10">
        <Logo />
        <LangToggle />
      </div>
    </header>
  );
}
