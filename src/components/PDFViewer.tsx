import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";

import PageNavigator from "./PageNavigator";
import { useAsync } from "react-use";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type PDFViewerType = {
  value?: Parameters<typeof pdf>[0];
  onUrlChange: (url: string | null | undefined) => void;

  onRenderError: (error: Error | undefined) => void;
};

const PDFViewer = ({ value, onUrlChange, onRenderError }: PDFViewerType) => {
  const [numPages, setNumPages] = useState<number | undefined>();

  const [currentPage, setCurrentPage] = useState(1);

  const [previousRenderValue, setPreviousRenderValue] = useState<
    string | null | undefined
  >(null);

  const render = useAsync(async () => {
    if (!value) return null;

    const blob = await pdf(value).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [value]);

  useEffect(() => onUrlChange(render.value), [render.value, onUrlChange]);
  useEffect(() => onRenderError(render.error), [render.error, onRenderError]);

  const onPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onDocumentLoad = (d: any) => {
    setNumPages(d.numPages);
    setCurrentPage((prev) => Math.min(prev, d.numPages));
  };

  const isFirstRendering = !previousRenderValue;

  const isLatestValueRendered = previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <div className="flex-1 h-full flex relative flex-col bg-gray-50">
      {shouldShowTextLoader && (
        <div className="top-0 left-0 w-full h-full flex z-50 absolute items-center justify-center bg-white">
          Rendering PDF...
        </div>
      )}
      {!render.loading && !value && (
        <div className="top-0 left-0 w-full h-full flex z-50 absolute items-center justify-center bg-white">
          You are not rendering a valid document
        </div>
      )}

      <div className="flex-1 p-4 flex z-50 items-center justify-center document-wrapper">
        {shouldShowPreviousDocument && previousRenderValue ? (
          <Document
            key={previousRenderValue}
            className="previous-document"
            file={previousRenderValue}
            loading={null}
          >
            <Page key={currentPage} pageNumber={currentPage} />
          </Document>
        ) : null}
        <Document
          key={render.value}
          className={shouldShowPreviousDocument ? "absolute" : null}
          file={render.value}
          loading={null}
          onLoadSuccess={onDocumentLoad}
        >
          <Page
            key={currentPage}
            pageNumber={currentPage}
            onRenderSuccess={() => setPreviousRenderValue(render.value)}
          />
        </Document>
      </div>

      <PageNavigator
        currentPage={currentPage}
        numPages={numPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};

export default PDFViewer;
