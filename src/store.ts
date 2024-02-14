import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatSettings, MessageProps } from './types';

interface SessionProps {
  title: string
  messages: MessageProps[]
  date: Date
}
export interface ChatState {
  chatSettings: ChatSettings
  setChatSettings: (settings: ChatSettings) => void
  messages: MessageProps[]
  fetchMessage: (from: string, message: string) => void
  clearMessages: () => void
  savedSessions: SessionProps[]
  saveSession: () => void
  functionJson: string
  setFunctionJson: (value: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chatSettings: {
        modelName: 'gpt-3.5-turbo',
        apiUrl: 'https://api.openai.com/v1/chat/completions',
        apiKey: '',
        sysPrompt: 'You are a helpful assistant.',
        stream: false,
        isJson: true,
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
      clearMessages: () => {
        set({ messages: [] });
      },
      savedSessions: [] as SessionProps[],
      saveSession: () => {
        set((state) => ({
          savedSessions: [
            ...state.savedSessions,
            {
              title: state.messages[0].message.substring(0, 20),
              messages: state.messages,
              date: new Date(),
            }
          ]
        }));
      },
      functionJson: '',
      setFunctionJson: (value) => {
        set({ functionJson: value });
      }
    }),
    { name: 'mlf-storage' }
  )
);
