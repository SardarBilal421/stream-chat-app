import React from 'react';
import { useChat } from '../../hooks/useChat';
import { LoadingState } from '../../components/Chat/states/LoadingState';
import { ErrorState } from '../../components/Chat/states/ErrorState';
import { ChatWindow } from '../../components/Chat/ChatWindow';

const Chat: React.FC = () => {
  const chat = useChat();

  if (chat.isLoading) {
    return <LoadingState />;
  }

  if (chat.error) {
    return <ErrorState error={chat.error} />;
  }

  if (!chat.chatClient || !chat.channel) {
    return <LoadingState />;
  }

  return <ChatWindow chat={chat} />;
};

export default Chat;
