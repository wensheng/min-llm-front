import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatSettings, MessageProps } from './types';

export interface ChatState {
  chatSettings: ChatSettings
  setChatSettings: (settings: ChatSettings) => void
  messages: MessageProps[]
  fetchMessage: (from: string, message: string) => void
  savedSessions: string[]
  saveSession: (session: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chatSettings: {
        modelName: 'gpt-3.5-turbo',
        apiUrl: 'https://api.openai.com/v1/chat/completions',
        apiKey: '',
        sysPrompt: 'You are a helpful assistant.'
      },
      setChatSettings (settings) {
        set({ chatSettings: settings });
      },
      messages: [] as MessageProps[],
      fetchMessage: (from, message) => {
        set((state) => ({
          messages: [...state.messages, { from, message, date: new Date() }]
        }));
      },
      savedSessions: [] as string[], // Fix the type of 'savedSessions' to be 'string[]'
      saveSession: (session) => {
        set((state) => ({
          savedSessions: [...state.savedSessions, session]
        }));
      }
    }),
    { name: 'mlf-storage' }
  )
);
