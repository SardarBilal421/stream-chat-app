import { useState, useEffect, useCallback } from 'react';
import { StreamChat } from 'stream-chat';
import { ChatUser, ChatState } from '../types';
import { authService } from '../services/api';

const INITIAL_STATE: ChatState = {
  chatClient: null,
  channel: null,
  isLoading: true,
  error: null,
};

export const useChat = () => {
  const [state, setState] = useState<ChatState>(INITIAL_STATE);

  const initializeChat = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      // static userName and user_id
      const learner: ChatUser = { user_id: 'learner1', name: 'Learner 1' };
      const { token, api_key, user_id } = await authService.login(learner);

      const client = StreamChat.getInstance(api_key);
      await client.connectUser(
        {
          id: learner.user_id,
          name: learner.name,
        },
        token
      );

      const channelId = `${user_id}_ai_coach`;
      const channelInstance = client.channel('messaging', channelId, {
        members: [user_id, 'ai_coach'],
        name: 'AI Coaching Session',
      });
      
      await channelInstance.watch();

      setState({
        chatClient: client,
        channel: channelInstance,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred',
        isLoading: false,
      }));
      console.error('Chat initialization error:', err);
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!state.channel || !state.chatClient) {
      throw new Error('Chat not initialized');
    }

    try {
      await state.channel.sendMessage({
        text,
        user_id: state.chatClient.userID,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }, [state.channel, state.chatClient]);

  const disconnect = useCallback(async () => {
    if (state.chatClient) {
      await state.chatClient.disconnectUser();
      setState(INITIAL_STATE);
    }
  }, [state.chatClient]);

  useEffect(() => {
    initializeChat();
    return () => {
      disconnect();
    };
  }, []);

  return {
    ...state,
    sendMessage,
    disconnect,
  };
}; 