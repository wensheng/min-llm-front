import { type FC, useState } from 'react';
import { Layout, Flex } from 'antd';
import { AppContext } from './AppContext';
import Sidebar from './components/sidebar';
import Main from './components/main';

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  minHeight: 'calc(100vh - 8px)'
};

const App: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  return (
    <AppContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, waitingForResponse, setWaitingForResponse }}>
      <Flex wrap="wrap">
        <Layout style={layoutStyle}>
          <Sidebar />
          <Main />
        </Layout>
      </Flex>
    </AppContext.Provider>
  );
};

export default App;
