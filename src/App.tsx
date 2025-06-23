import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="flex flex-col items-center gap-4">
        <h1 className="p-8 text-center text-4xl font-bold tracking-tighter">
          React Blog
        </h1>
        <ModeToggle />
        <Button className="mx-auto w-fit">Hello Shadcn UI</Button>
      </main>
    </ThemeProvider>
  );
}
