import { Toaster } from 'react-hot-toast';
import { ChatWindow } from '../ChatWindow';
import { ChatContextType } from '../../../types';
import { Chat, Channel } from 'stream-chat-react';

interface ChatStateProps {
  chat: ChatContextType;
}

export const ChatState = ({ chat }: ChatStateProps) => {
  const { chatClient, channel } = chat;

  if (!chatClient || !channel) return null;

  return (
    <>
      <Toaster />
      <div className="relative h-screen">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <ChatWindow chat={chat} />
          </Channel>
        </Chat>
      </div>
    </>
  );
}; 