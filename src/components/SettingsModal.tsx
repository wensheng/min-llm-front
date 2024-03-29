import type React from 'react';
import { useState } from 'react';
import { Checkbox, Input, Modal, Space } from 'antd';
import type { ChatSettings } from '../types';

interface SettingsModalProps {
  chatSettings: ChatSettings
  setChatSettings: (value: ChatSettings) => void
  isOpen: boolean
  onOk: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const [apiUrl, setApiUrl] = useState(props.chatSettings.apiUrl);
  const [modelName, setModelName] = useState(props.chatSettings.modelName);
  const [sysPrompt, setSysPrompt] = useState(props.chatSettings.sysPrompt);
  const [apiKey, setApiKey] = useState(props.chatSettings.apiKey);
  const [stream, setStream] = useState(props.chatSettings.stream);
  const [isJson, setIsJson] = useState(props.chatSettings.isJson);

  const onOk = (): void => {
    props.setChatSettings({ apiUrl, modelName, sysPrompt, apiKey, stream, isJson });
    props.onOk();
  }

  const addBefore = (name: string): React.ReactElement<HTMLDivElement> => (
    <div style={{ width: '70px', alignItems: 'flex-end' }}>{name}</div>
  );

  return (
    <Modal
      title="Chat Settings"
      open={props.isOpen}
      onOk={onOk}
      onCancel={props.onOk}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Input
          addonBefore={addBefore('API URL')}
          value={apiUrl}
          onChange={ (e) => { setApiUrl(e.target.value); } }
        />
        <Input
          addonBefore={addBefore('API Key')}
          placeholder='leave empty if not using OpenAI'
          value={apiKey}
          onChange={ (e) => { setApiKey(e.target.value); } }
        />
        <Input
          addonBefore={addBefore('Model')}
          value={modelName}
          onChange={ (e) => { setModelName(e.target.value); } }
        />
        <div>System Prompt</div>
        <Input.TextArea
          value={sysPrompt}
          onChange={ (e) => { setSysPrompt(e.target.value); } }
        />

        <span>Streaming Response: &nbsp;
        <Checkbox checked={stream} onChange={ (e) => { setStream(e.target.checked); } } />
        </span>
        <span>JSON Response: &nbsp;
        <Checkbox checked={isJson} onChange={ (e) => { setIsJson(e.target.checked); } } />
        { ' ' } &nbsp; <span style={{ color: '#c00', fontSize: '10px' }}>
          You must also indicate you want JSON response in the either system prompt or user message.
        </span>
        </span>
      </Space>

    </Modal>
  );
};

export default SettingsModal;
