import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      <p className="text-3xl font-semibold">React Blog</p>
      <ModeToggle />
    </header>
  );
}
