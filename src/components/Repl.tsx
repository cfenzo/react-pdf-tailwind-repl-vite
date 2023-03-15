"use client";
import { useMount } from "react-use";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import transpile from "../lib/transpile";
import PDFViewer, { PDFViewerType } from "./PDFViewer";
import CodeEditorWindow from "./CodeEditorWindow";
import CodeError from "./ui/CodeError";

const debounceTranspile = debounce(transpile, 250);

const Repl = ({
  activeTab = "code",
  value,
  onChange,
  onUrlChange,
}: {
  activeTab: "code" | "pdf";
  value: string;

  onChange: (code: any) => void;
  onUrlChange: (url: any) => void;
}) => {
  const [error, setError] = useState<Error | null | undefined>(null);
  const [element, setElement] = useState<PDFViewerType["value"]>();
  const onErrorClose = () => {
    setError(null);
  };

  const handleChange = useCallback(
    (code: string) => {
      console.log("got change", code);
      if (code.length === 0) {
        setError(null);
        setElement(undefined);
      }

      const callback = (value: PDFViewerType["value"]) => {
        onChange?.(code);
        setElement(value);
      };

      debounceTranspile(code, callback, setError);
    },
    [onChange]
  );

  useMount(() => {
    if (value) debounceTranspile(value, setElement, setError);
  });
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <CodeEditorWindow
          code={value}
          onChange={handleChange}
          language="javascript"
        />
        <CodeError
          className="bottom-0 w-full z-50 absolute"
          onClose={onErrorClose}
          error={error}
        />
      </div>

      <div className="flex-1 overflow-hidden bg-gray-50">
        <PDFViewer
          value={element}
          onUrlChange={onUrlChange}
          onRenderError={setError}
        />
      </div>
    </div>
  );
};

export default Repl;
