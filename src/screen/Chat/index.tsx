import { useChat } from '../../hooks/useChat';
import { LoadingState } from '../../components/Chat/states/LoadingState';
import { ErrorState } from '../../components/Chat/states/ErrorState';
import { ChatState } from '../../components/Chat/states/ChatState';

function Chat() {
  const chat = useChat();

  if (chat.isLoading) {
    return <LoadingState />;
  }

  if (chat.error) {
    return <ErrorState error={chat.error} />;
  }

  return <ChatState chat={chat} />;
}

export default Chat;
