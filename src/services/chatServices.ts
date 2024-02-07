import { type OAIAPIResponse } from '../types';

type RespType = OAIAPIResponse & {
  date: Date
}

interface OAIMessage {
  role: 'system' | 'user'
  content: string
}

interface ApiRequest {
  model?: string
  messages: OAIMessage[]
}

/**
 * Must use OpenAI or OpenAI compatible API server
 * @param url API URL full path such as 'https://api.openai.com/v1/chat/completions'
 * @param apiKey leave empty if not OpenAI
 * @param message user message
 */
export const sendToLLM = async (url: string, apiKey: string, prompt: string, message: string): Promise<RespType> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (url.startsWith('https://api.openai.com') && apiKey !== '') {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const apiData: ApiRequest = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: prompt
      },
      {
        role: 'user',
        content: message
      }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(apiData)
  });

  const data: any = await response.json();
  return { ...data, date: new Date() };
};
