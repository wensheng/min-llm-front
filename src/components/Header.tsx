import type React from 'react';
import { useContext } from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { ClearOutlined, LeftSquareOutlined, MessageOutlined, RightSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../AppContext';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 36,
  paddingInline: 5,
  lineHeight: '40px',
  backgroundColor: '#f0f4f9'
};

const Header: React.FC = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log('main isSidebarOpen', isSidebarOpen)
  };
  const clearHistory = (): void => {
    console.log('clear history');
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
          <Button onClick={clearHistory} icon={<ClearOutlined />} />
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
