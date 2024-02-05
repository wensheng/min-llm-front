import type React from 'react';
import { useContext, useState } from 'react';
import { Button, Flex, Input, Upload, type UploadProps } from 'antd';
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
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

const InputArea: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { waitingForResponse, setWaitingForResponse } = useContext(AppContext);
  const fetchMessage = useChatStore((state) => state.fetchMessage);
  const llmApiUrl = useChatStore((state) => state.llmApiUrl);

  const onSend = (): void => {
    if (waitingForResponse) return;
    fetchMessage('user', inputValue);
    setWaitingForResponse(true);
    sendToLLM(llmApiUrl, inputValue).then(
      (response): void => {
        fetchMessage('llm', response.message);
        setWaitingForResponse(false);
      },
      (error): void => { console.error(error); }
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <Flex gap="small">
      <Upload {...uploadProps} action={ llmApiUrl + '/upload' }>
        <Button icon={<UploadOutlined />} />
      </Upload>
      <Input.TextArea
        rows={2}
        placeholder="your question or instruction"
        onChange={onChange}
      />
      <Button type="primary" onClick={onSend}><SendOutlined /></Button>
    </Flex>
  );
};

export default InputArea;
