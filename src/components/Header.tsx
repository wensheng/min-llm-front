import type React from 'react';
import { useContext } from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { ClearOutlined, DatabaseOutlined, LeftSquareOutlined, MessageOutlined, RightSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../AppContext';
import { useChatStore } from '../store';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 36,
  paddingInline: 5,
  lineHeight: '40px',
  backgroundColor: '#f0f4f9'
};

const Header: React.FC = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const messages = useChatStore(state => state.messages);
  const clearMessages = useChatStore(state => state.clearMessages);
  const saveSession = useChatStore(state => state.saveSession);
  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log('main isSidebarOpen', isSidebarOpen)
  };
  const clearHistory = (): void => {
    clearMessages();
    console.log('clear history');
  };

  const saveCurrentSession = (): void => {
    if (messages.length > 0) {
      saveSession();
    }
  };

  return (
    <Layout.Header style={headerStyle}>
      <Row gutter={24}>
        <Col>
          <Button
            icon={ isSidebarOpen ? <LeftSquareOutlined /> : <RightSquareOutlined />}
            onClick={toggleSidebar}
          />
        </Col>
        <Col flex="auto"><MessageOutlined /> <span>Conversation</span></Col>
        <Col>
          <Button onClick={saveCurrentSession} icon={<DatabaseOutlined />} /> {'  '}
          <Button onClick={clearHistory} icon={<ClearOutlined />} />
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
