type CodeErrorType = {
  error?: Error | null;
  onClose: () => void;
  className?: string;
};

const CodeError = ({ error, onClose, className }: CodeErrorType) =>
  error ? (
    <div className={`${className} bg-red-100 text-red-800 flex items-center`}>
      <span className="block p-2">{error.message}</span>
      <button
        className="absolute right-1 p-2 m-0 hover:bg-red-800 hover:text-red-100"
        onClick={onClose}
      >
        x
      </button>
    </div>
  ) : null;

export default CodeError;
