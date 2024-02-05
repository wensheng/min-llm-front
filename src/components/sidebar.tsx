import React, { useState } from 'react';
import { FloatButton, Layout, Typography } from 'antd';
import { ControlOutlined, HomeOutlined, WechatOutlined } from '@ant-design/icons';
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
  // const setPrompt = useChatStore(state => state.setPrompt);
  const savedSessions = useChatStore(state => state.savedSessions);

  const { isSidebarOpen } = React.useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(llmApiUrl);
  const [inputType, setInputType] = useState('text');
  const [modalTitle, setModalTitle] = useState('Setting');

  const showUrlModal = (): void => {
    setInputType('text');
    setModalTitle('LLM API URL');
    setInputValue(llmApiUrl);
    setIsModalOpen(true);
  };

  const showPromptModal = (): void => {
    setInputType('textarea');
    setModalTitle('Prompt');
    setInputValue(prompt);
    setIsModalOpen(true);
  };

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setInputValue(e.target.value);
  // };

  const handleOk = (): void => {
    setLlmApiUrl(inputValue);
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };
  /*
      <Modal
        title="Setting"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input addonBefore="API URL" value={inputValue} onChange={onChange} />
      </Modal>
  */

  // Using Sider as Drawer
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
          <FloatButton icon={<HomeOutlined />} onClick={showUrlModal}/>
          <FloatButton onClick={showPromptModal} />
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
      />
    </Layout.Sider>
  );
};

export default Sidebar;
