import type React from 'react';
import { useRef } from 'react';
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
  const currentStreamingRef = useRef<HTMLDivElement>(null);
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <ChatArea currentStreamingRef={currentStreamingRef} />
      </Layout.Content>
      <Layout.Footer style={footerStyle}>
        <InputArea currentStreamingRef={currentStreamingRef} />
      </Layout.Footer>
    </Layout>
  );
};

export default MainSection;
