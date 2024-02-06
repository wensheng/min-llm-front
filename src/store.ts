import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type MessageProps } from './types';

export interface ChatState {
  llmApiUrl: string
  setLlmApiUrl: (url: string) => void
  messages: MessageProps[]
  fetchMessage: (from: string, message: string) => void
  apiKey: string
  setApiKey: (prompt: string) => void
  prompt: string
  setPrompt: (prompt: string) => void
  savedSessions: string[]
  saveSession: (session: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      llmApiUrl: 'http://localhost:8000',
      setLlmApiUrl (url) {
        set({ llmApiUrl: url });
      },
      messages: [] as MessageProps[], // Fix the type mismatch by explicitly specifying the type of 'messages' as 'MessageProps[]'
      fetchMessage: (from, message) => {
        set((state) => ({
          messages: [...state.messages, { from, message, date: new Date() }]
        }));
      },
      apiKey: '',
      setApiKey: (key) => { set({ apiKey: key }); },
      prompt: '',
      setPrompt: (prompt) => { set({ prompt }); },
      savedSessions: [],
      saveSession: (session) => {
        set((state) => ({
          savedSessions: [...state.savedSessions, session]
        }));
      }
    }),
    { name: 'mlf-storage' }
  )
);
