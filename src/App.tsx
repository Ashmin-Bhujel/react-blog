import { Button } from "./components/ui/button";

export default function App() {
  return (
    <main className="flex flex-col">
      <h1 className="p-8 text-center text-4xl font-bold tracking-tighter">
        React Blog
      </h1>
      <Button className="mx-auto w-fit">Hello Shadcn UI</Button>
    </main>
  );
}
