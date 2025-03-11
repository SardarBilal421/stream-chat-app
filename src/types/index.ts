import { StreamChat, Channel as StreamChannel, SendMessageAPIResponse, DefaultGenerics } from 'stream-chat';
export * from './message';

export interface ChatUser {
  user_id: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  api_key: string;
  user_id: string;
}

export interface ChatState {
  chatClient: StreamChat | null;
  channel: StreamChannel | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export interface ChatContextType extends ChatState {
  sendMessage: (text: string) => Promise<SendMessageAPIResponse<DefaultGenerics>>;
  disconnect: () => Promise<void>;
} 