import { useChat } from './hooks/useChat';
import { ChatWindow } from './components/Chat/ChatWindow';

function App() {
  const chat = useChat();

  if (chat.isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Initializing chat...</div>
      </div>
    );
  }

  if (chat.error) {
    return (
      <div className="error-container">
        <div className="error">Error: {chat.error}</div>
      </div>
    );
  }

  return <ChatWindow chat={chat} />;
}

export default App;
