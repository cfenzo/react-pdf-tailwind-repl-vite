import { useState } from "react";
import { useLocalStorageState } from "ahooks";
import Repl from "./components/Repl";
import Navbar from "./components/ui/Navbar";

function App() {
  const [code, setCode] = useLocalStorageState<string>("pdf-repl-code", {
    defaultValue: "",
  });

  const [activeTab, setActiveTab] = useState<"pdf" | "code">("code");

  const [documentUrl, setDocumentUrl] = useState(null);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col overflow-hidden">
      <Repl
        activeTab={activeTab}
        value={code}
        onChange={setCode}
        onUrlChange={setDocumentUrl}
      />
      <Navbar />
    </div>
  );
}

export default App;
