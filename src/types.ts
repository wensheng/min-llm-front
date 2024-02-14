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

export interface ChatSettings {
  modelName: string
  apiUrl: string
  apiKey: string
  sysPrompt: string
  stream: boolean
  isJson: boolean
}

export interface OAIMessage {
  role: 'assistant' | 'user' | 'system'
  content: string
}

export interface ApiRequest {
  model: string
  messages: OAIMessage[]
  stream?: boolean | null
  response_format?: object
}

interface OAIChoice {
  index: number
  message: OAIMessage
  logprobs?: null
  finish_reason: 'stop'
}

interface OAIUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

interface OAIChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: OAIChoice[]
  usage: OAIUsage
  system_fingerprint?: string | null
  message?: string | null // for FastChatErrorResponse

}

interface OAIErrorResponse {
  error: {
    message: string
    type: string
    param?: null
    code: string
  }
}

/*
interface FastChatErrorResponse {
  object: 'error'
  message: string;
  code: number
}
*/

export type OAIAPIResponse = OAIChatCompletionResponse | OAIErrorResponse
