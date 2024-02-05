interface ResponseType {
  message: string
  date: Date
};

export const sendToLLM = async (url: string, message: string): Promise<ResponseType> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  return { ...data, date: new Date(data.date) };
};
