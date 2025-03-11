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
import 'stream-chat-react/dist/css/v2/index.css';

interface ChatWindowProps {
  chat: ChatContextType;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const { chatClient, channel } = chat;
  const { handleMessageSubmit } = useMessageHandler(chat);

  if (!chatClient || !channel) return null;

  return (
    <div className="chat-container" style={{ height: '100vh' }}>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
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