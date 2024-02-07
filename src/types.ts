import { type ReactNode } from 'react';

export interface ChatItemProps<T = Record<string, unknown>> {
  from: ReactNode
  message: ReactNode
  date: Date
};

export interface MessageProps {
  from: string
  message: string
  date: Date
};

interface OAIMessage {
  role: "assistant";
  content: string;
}

interface OAIChoice {
  index: number;
  message: OAIMessage;
  logprobs?: null;
  finish_reason: "stop";
}

interface OAIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface OAIChatCompletionResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: OAIChoice[];
  usage: OAIUsage;
  system_fingerprint?: string | null;
}

interface OAIErrorResponse {
  error: {
    message: string;
    type: string;
    param: null;
    code: string;
  };
}

export type OAIAPIResponse = OAIChatCompletionResponse | OAIErrorResponse;

