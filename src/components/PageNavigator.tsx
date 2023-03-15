import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PageNavigatorProps = {
  currentPage: number;
  numPages?: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

const PageNavigator = ({
  currentPage,
  numPages,
  onPreviousPage,
  onNextPage,
}: PageNavigatorProps) => {
  if (!numPages || numPages <= 1) return null;

  return (
    <div className="flex h-16 items-center justify-center select-none text-sm">
      <span
        className={`p-2 cursor-pointer transition-opacity ${
          currentPage === 1 ? "opacity-0" : "opacity-100"
        }  ${
          currentPage !== 1 ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={onPreviousPage}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </span>

      <span className="px-2">{`Page ${currentPage} / ${numPages}`}</span>

      <span
        className={`p-2 cursor-pointer transition-opacity ${
          currentPage < numPages ? "opacity-100" : "opacity-0"
        }  ${
          currentPage < numPages ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={onNextPage}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </span>
    </div>
  );
};

export default PageNavigator;
