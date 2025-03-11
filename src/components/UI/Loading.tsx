interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Initializing chat..." }: LoadingProps) => {
  return (
    <div className="loading-container">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="loading">{message}</div>
      </div>
    </div>
  );
}; 