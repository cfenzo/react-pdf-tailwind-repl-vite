type CodeErrorType = {
  error?: Error | null;
  onClose: () => void;
  className?: string;
};

const CodeError = ({ error, onClose, className }: CodeErrorType) =>
  error ? (
    <div className={`${className} bg-red-100 text-red-800 p-2`}>
      {error.message}
      <button onClick={onClose}>x</button>
    </div>
  ) : null;

export default CodeError;
