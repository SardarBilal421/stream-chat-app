import { useCallback } from 'react';
import { ChatContextType } from '../types';

type MessageInput = {
  text?: string;
};

export const useMessageHandler = (chat: ChatContextType) => {
  const handleMessageSubmit = useCallback(
    async (message: MessageInput) => {
      if (!message.text?.trim()) {
        return;
      }
      try {
        await chat.sendMessage(message.text);
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
    },
    [chat]
  );

  return {
    handleMessageSubmit,
  };
}; 