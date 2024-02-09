import type { ApiRequest, ChatSettings, OAIMessage } from '../types';

/**
 * Must use OpenAI or OpenAI compatible API server
 * @param chatSettings see 'https://api.openai.com/v1/chat/completions'
 * @param message user message
 */
export const sendToLLM = async (chatSettings: ChatSettings, message: string): Promise<Response> => {
  const { apiUrl, apiKey, modelName, sysPrompt, stream } = chatSettings;
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
    ] as OAIMessage[],
    model: modelName,
    stream
  };

  if (apiUrl.startsWith('https://api.openai.com') && apiKey !== '') {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  return await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(apiData)
  });
};
