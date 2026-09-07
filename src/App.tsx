import { FileInput } from "@/components/FileInput";
import "./App.css";
import ExternalLink from "@/components/ExternalLink";

function App() {
  return (
    <main className="bg-background dark text-foreground flex justify-center">
      <div className="flex min-h-screen flex-col gap-8 px-4 text-center">
        <h1 className="text-4xl font-extrabold">ez zrm</h1>
        <FileInput />
      </div>
    </main>
  );
}

export default App;
