import React from 'react';
import {
  Chat,
  Channel,
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
  const { chatClient, channel } = chat;
  const { handleMessageSubmit } = useMessageHandler(chat);
  const isTyping = useAITyping(channel);

  if (!chatClient || !channel) return null;

  return (
    <div className="chat-container h-screen w-screen">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <TypingIndicator isVisible={isTyping} />
            <MessageInput 
              overrideSubmitHandler={handleMessageSubmit}
            />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};