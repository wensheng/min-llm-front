import type React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import ChatArea from './ChatArea';
import InputArea from './inputArea';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#f0f4f9'
};

const MainSection: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <ChatArea />
      </Layout.Content>
      <Layout.Footer style={footerStyle}>
        <InputArea />
      </Layout.Footer>
    </Layout>
  );
};

export default MainSection;
