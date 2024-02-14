import type { ApiRequest, ChatSettings, OAIMessage } from '../types';

/**
 * Must use OpenAI or OpenAI compatible API server
 * @param chatSettings see 'https://api.openai.com/v1/chat/completions'
 * @param message user message
 */
export const sendToLLM = async (chatSettings: ChatSettings, message: string): Promise<Response> => {
  const { apiUrl, apiKey, modelName, sysPrompt, stream, isJson } = chatSettings;
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

  if (isJson) {
    apiData.response_format = { type: 'json_object' };
  }

  if (apiUrl.startsWith('https://api.openai.com') && apiKey !== '') {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  // TODO: fschat will return 400 if model name mis-matches.
  return await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(apiData)
  });
};
