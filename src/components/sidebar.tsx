import React, { useState } from 'react';
import { FloatButton, Layout, Typography } from 'antd';
import { ControlOutlined, HomeOutlined, KeyOutlined, WechatOutlined } from '@ant-design/icons';
import { green } from '@ant-design/colors';
import { AppContext } from '../AppContext';
import { useChatStore } from '../store';
import SettingsModal from './SettingsModal';

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: green[9]
};

const Sidebar: React.FC = () => {
  const llmApiUrl = useChatStore(state => state.llmApiUrl);
  const setLlmApiUrl = useChatStore(state => state.setLlmApiUrl);
  const prompt = useChatStore(state => state.prompt);
  const setPrompt = useChatStore(state => state.setPrompt);
  const apiKey = useChatStore(state => state.apiKey);
  const setApiKey = useChatStore(state => state.setApiKey);
  const savedSessions = useChatStore(state => state.savedSessions);

  const { isSidebarOpen } = React.useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(llmApiUrl);
  const [inputType, setInputType] = useState('text');
  const [modalTitle, setModalTitle] = useState('Setting');
  const [paramType, setParamType] = useState('' as 'url' | 'prompt' | 'key');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputValue(e.target.value);
  };

  const showModal = (inputType: string, title: string, param: string, paramType: string) => (): void => {
    setInputType(inputType);
    setModalTitle(title);
    setInputValue(param);
    setParamType(paramType as 'prompt' | 'url' | 'key');
    setIsModalOpen(true);
  };

  const handleOk = (): void => {
    if (paramType === 'prompt') {
      setPrompt(inputValue);
    }
    if (paramType === 'url') {
      setLlmApiUrl(inputValue);
    }
    if (paramType === 'key') {
      setApiKey(inputValue);
    }
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  // Using Sider as Drawer, might as well use Drawer
  return (
    <Layout.Sider
      width="15%"
      style={ siderStyle }
      collapsible
      collapsed={!isSidebarOpen}
      collapsedWidth={0}
      trigger={null}
    >
      <div>
        <Typography.Title level={5} style={{ color: '#fff' }}>
          <WechatOutlined /> <span>Saved Chats</span>
        </Typography.Title>
        {
          savedSessions.map((session, index) => (
            <div key={index} style={{ padding: '10px 0' }}>
              {session}
            </div>
          ))
        }
        <FloatButton.Group
          trigger="click"
          type="default"
          style={{ left: 24, bottom: 20 }}
          icon={<ControlOutlined />}
        >
          <FloatButton icon={<HomeOutlined />} onClick={showModal('text', 'API URL', llmApiUrl, 'url')}/>
          <FloatButton onClick={showModal('textarea', 'Prompt', prompt, 'prompt')} />
          <FloatButton icon={<KeyOutlined />} onClick={showModal('text', 'API Key', apiKey, 'key')} />
        </FloatButton.Group>
      </div>
      <SettingsModal
        settingType={inputType}
        title={modalTitle}
        value={inputValue}
        setValue={setLlmApiUrl}
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        onInputChange={onInputChange}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
