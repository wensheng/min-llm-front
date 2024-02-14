import React, { useState } from 'react';
import { FloatButton, Layout, Tooltip, Typography } from 'antd';
import { ControlOutlined, MenuUnfoldOutlined, WechatOutlined, ExportOutlined } from '@ant-design/icons';
import { AppContext } from '../AppContext';
import { useChatStore } from '../store';
import SettingsModal from './SettingsModal';
import FuncsModal from './FunctionsModal';

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#092b00' // green[9]
};

const Sidebar: React.FC = () => {
  const chatSettings = useChatStore(state => state.chatSettings);
  const setChatSettings = useChatStore(state => state.setChatSettings);
  const savedSessions = useChatStore(state => state.savedSessions);

  const { isSidebarOpen } = React.useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFuncsModalOpen, setIsFuncsModalOpen] = useState(false);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const showFuncsModal = (): void => {
    setIsFuncsModalOpen(true);
  };

  const exportSessions = (): void => {
    const sessions = JSON.stringify(savedSessions);
    const blob = new Blob([sessions], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sessions.json';
    // document.body.appendChild(a);
    a.click();
    // document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Using Sider as Drawer, might as well use Drawer
  return (
    <Layout.Sider
      width="18%"
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
              {session.title}
            </div>
          ))
        }
        { isSidebarOpen && (
          <FloatButton.Group
            trigger="click"
            type="default"
            style={{ left: 24, bottom: 20 }}
            icon={<MenuUnfoldOutlined />}
          >
            <Tooltip title="Export Sessions" mouseEnterDelay={0} mouseLeaveDelay={0}>
              <FloatButton icon={<ExportOutlined />} onClick={exportSessions} />
            </Tooltip>
            <Tooltip title="Define Functions" mouseEnterDelay={0} mouseLeaveDelay={0}>
              <FloatButton onClick={showFuncsModal} />
            </Tooltip>
            <Tooltip title="Chat Settings" mouseEnterDelay={0} mouseLeaveDelay={0}>
              <FloatButton icon={<ControlOutlined />} onClick={showModal} />
            </Tooltip>
          </FloatButton.Group>
        ) }
      </div>
      <SettingsModal
        chatSettings={chatSettings}
        setChatSettings={setChatSettings}
        isOpen={isModalOpen}
        onOk={closeModal}
      />
      <FuncsModal
        isOpen={isFuncsModalOpen}
        onOk={ () => { setIsFuncsModalOpen(false); } }
      />
    </Layout.Sider>
  );
};

export default Sidebar;
