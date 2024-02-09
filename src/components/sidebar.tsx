import React, { useState } from 'react';
import { FloatButton, Layout, Tooltip, Typography } from 'antd';
import { ControlOutlined, WechatOutlined, ExportOutlined } from '@ant-design/icons';
import { AppContext } from '../AppContext';
import { useChatStore } from '../store';
import SettingsModal from './SettingsModal';

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

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
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
            icon={<ControlOutlined />}
          >
            <Tooltip title="Settings">
              <FloatButton onClick={showModal} />
            </Tooltip>
            <Tooltip title="Export Sessions">
              <FloatButton icon={<ExportOutlined />} />
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
    </Layout.Sider>
  );
};

export default Sidebar;
