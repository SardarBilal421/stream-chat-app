interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator = ({ isVisible }: TypingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mx-4 mb-2">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
      </div>
      <span className="text-sm text-gray-600 font-medium">AI is thinking...</span>
    </div>
  );
}; 