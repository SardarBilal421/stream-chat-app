import { useState, useEffect } from 'react';
import { Channel, Event } from 'stream-chat';

export const useAITyping = (channel: Channel | null) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!channel) return;

    const handleUserMessage = (event: Event) => {
      if (event.message?.user?.id !== 'ai_coach') {
        setIsTyping(true);
      }
    };

    const handleAIMessage = (event: Event) => {
      if (event.message?.user?.id === 'ai_coach') {
        setIsTyping(false);
      }
    };

    channel.on('message.new', handleUserMessage);
    channel.on('message.new', handleAIMessage);

    return () => {
      channel.off('message.new', handleUserMessage);
      channel.off('message.new', handleAIMessage);
    };
  }, [channel]);

  useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isTyping]);

  return isTyping;
}; 