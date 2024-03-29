import type React from 'react';
import { useContext, useState } from 'react';
import { Button, Flex, Input, Upload, type UploadProps } from 'antd';
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import type { ChatSettings, MessageProps } from '../types';
import { useChatStore } from '../store';
import { AppContext } from '../AppContext';
import { sendToLLM } from '../services/chatServices';

const uploadProps: UploadProps = {
  name: 'file',
  action: '/upload',
  headers: {
    authorization: 'authorization-text'
  },
  showUploadList: false,
  onChange (info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
};

interface InputAreaProps {
  currentStreamingRef: React.RefObject<HTMLDivElement>
};

const InputArea: React.FC<InputAreaProps> = ({ currentStreamingRef }) => {
  const [inputValue, setInputValue] = useState('');
  const { waitingForResponse, setWaitingForResponse } = useContext(AppContext);
  const addMessage = useChatStore((state) => state.addMessage);
  const chatSettings: ChatSettings = useChatStore((state) => state.chatSettings);
  const messages = useChatStore((state) => state.messages);

  const onSend = (): void => {
    if (waitingForResponse) {
      return;
    }
    const msg: MessageProps = { role: 'user', content: inputValue, date: new Date() };
    setWaitingForResponse(true);

    if (chatSettings.stream) {
      sendToLLM(chatSettings, [...messages, msg])
        .then((response: Response) => response.body)
        .then(async (stream: ReadableStream<Uint8Array> | null) => {
          if (stream === null) {
            setWaitingForResponse(false);
            return;
          }
          let respText = '';
          const reader = stream.getReader();
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const text = decoder.decode(value, { stream: false });
            // data: {"id":"chatcmpl-8qGVJL7Ru0DnKHtfH61eKVwgNDY2F","object":"chat.completion.chunk","created":1707467189,"model":"gpt-3.5-turbo-0613","system_fingerprint":null,"choices":[{"index":0,"delta":{"role":"assistant","content":""},"logprobs":null,"finish_reason":null}]}
            // console.log(text);
            try {
              const words = text.split(/data: /g).map((chunk) => {
                if (chunk.startsWith(': ping -')) {
                  // llama-cpp-python send this
                  return '';
                }
                if (chunk.length === 0 || chunk.match(/"choices":\s*\[/) === null) {
                  return '';
                } else {
                  return JSON.parse(chunk).choices[0].delta.content ?? '';
                }
              });
              const wordChunk = words.join('');
              // console.log(wordChunk);
              if (currentStreamingRef.current !== null) {
                currentStreamingRef.current.innerHTML += wordChunk;
              }
              respText += wordChunk;
            } catch (error) {
              console.error(text);
              console.error(error);
            }
          }
          setWaitingForResponse(false);
          addMessage(msg);
          addMessage({ role: 'assistant', content: respText, date: new Date() });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      sendToLLM(chatSettings, [...messages, msg])
        .then(async (response: Response) => await response.json())
        .then((response) => {
          addMessage(msg);
          if ('error' in response) {
            addMessage({ role: 'assistant', content: response.error.message, date: new Date() });
          } else {
            if (response.object === 'error') {
              // FastChat error
              addMessage({ role: 'assistant', content: response.message ?? '', date: new Date() });
            } else {
              addMessage({ role: 'assistant', content: response.choices[0].message.content, date: new Date() });
            }
          }
          setWaitingForResponse(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setInputValue('');
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(e.target.value);
  };

  // TODO: upload file
  return (
    <Flex gap="small">
      <Upload {...uploadProps} action={ '/upload' }>
        <Button icon={<UploadOutlined />} />
      </Upload>
      <Input.TextArea
        rows={2}
        placeholder="your question or instruction"
        onChange={onChange}
        value={inputValue}
      />
      <Button type="primary" onClick={onSend}><SendOutlined /></Button>
    </Flex>
  );
};

export default InputArea;
