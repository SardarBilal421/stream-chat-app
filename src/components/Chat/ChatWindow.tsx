import React from 'react';
import {
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react';
import { ChatContextType } from '../../types';
import { useMessageHandler } from '../../hooks/useMessageHandler';
import { useAITyping } from '../../hooks/useAITyping';
import { TypingIndicator } from '../UI/TypingIndicator';
import 'stream-chat-react/dist/css/v2/index.css';

interface ChatWindowProps {
  chat: ChatContextType;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const { handleMessageSubmit } = useMessageHandler(chat);
  const isTyping = useAITyping(chat.channel);

  return (
    <div className="chat-container" style={{ height: '100vh', width: '100vw' }}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <TypingIndicator isVisible={isTyping} />
        <MessageInput 
          overrideSubmitHandler={handleMessageSubmit}
        />
      </Window>
      <Thread />
    </div>
  );
};