import { ChatUser, LoginResponse } from '../types';

const API_URL = 'http://localhost:5000';

export const authService = {
  login: async (user: ChatUser): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    
    if (!data.token || !data.api_key) {
      throw new Error('Invalid credentials received');
    }

    return data;
  }
};

export const sendMessage = async (message: string) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  return response.json();
}; 