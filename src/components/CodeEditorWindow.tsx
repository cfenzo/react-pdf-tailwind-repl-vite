import { useState } from "react";

import Editor from "@monaco-editor/react";

type CodeEditorWindowType = {
  onChange: (code: string) => void;
  language?: string;
  code: string;
};

const CodeEditorWindow = ({
  onChange,
  language = "javascript",
  code,
}: CodeEditorWindowType) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
    onChange(value || "");
  };

  return (
    <div className="overflow-hidden w-full h-full">
      <Editor
        height="100%"
        width={`100%`}
        language={language}
        value={value}
        theme="vs-dark"
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
