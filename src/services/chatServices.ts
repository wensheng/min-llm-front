import type { ApiRequest, ChatSettings, MessageProps, OAIMessage } from '../types';

/**
 * Must use OpenAI or OpenAI compatible API server
 * @param chatSettings see 'https://api.openai.com/v1/chat/completions'
 * @param messages messages
 */
export const sendToLLM = async (chatSettings: ChatSettings, messages: MessageProps[]): Promise<Response> => {
  const { apiUrl, apiKey, modelName, sysPrompt, stream, isJson } = chatSettings;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  console.log('@'.repeat(100));
  console.log(messages);
  const msgs: OAIMessage[] = messages.map((msg) => {
    return {
      role: msg.role,
      content: msg.content
    };
  });

  msgs.unshift({
    role: 'system',
    content: sysPrompt
  });

  console.log(msgs);

  const apiData: ApiRequest = {
    messages: msgs,
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
