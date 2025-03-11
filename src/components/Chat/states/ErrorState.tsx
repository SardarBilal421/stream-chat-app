import { Toaster } from 'react-hot-toast';
import { Error } from '../../UI/Error';

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <>
      <Toaster />
      <Error error={error} reset={() => window.location.reload()} />
      <div className="flex items-center justify-center min-h-screen">
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Retry Connection
        </button>
      </div>
    </>
  );
}; 