import type { OAIAPIResponse, ChatSettings } from '../types';

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
export const sendToLLM = async (chatSettings: ChatSettings, message: string): Promise<RespType> => {
  const { apiUrl, apiKey, modelName, sysPrompt } = chatSettings;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  const apiData: ApiRequest = {
    messages: [
      {
        role: 'system',
        content: sysPrompt
      },
      {
        role: 'user',
        content: message
      }
    ],
    model: modelName
  };

  if (apiUrl.startsWith('https://api.openai.com') && apiKey !== '') {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(apiData)
  });

  const data: any = await response.json();
  return { ...data, date: new Date() };
};
