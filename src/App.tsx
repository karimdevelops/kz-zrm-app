import { FileInput } from "@/components/FileInput";
import "./App.css";
import ExternalLink from "@/components/ExternalLink";

function App() {
  return (
    <main className="bg-background dark text-foreground flex justify-center">
      <div className="flex min-h-screen flex-col gap-8 px-4 text-center">
        <div className="mt-auto">
          <h1 className="text-4xl font-extrabold">ez zrm</h1>
          <p className="text-sm">credit: @M_Hasyimy</p>
        </div>
        <FileInput />
        <div className="mt-auto flex gap-4 self-center p-8">
          <ExternalLink
            text="Source Code on Github"
            link={"https://github.com/karimdevelops/ez-zrm"}
            size="lg"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
