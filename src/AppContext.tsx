import { createContext } from 'react';

const defaultContext = {
  isSidebarOpen: true,
  setIsSidebarOpen: (value: boolean) => {},
  waitingForResponse: false,
  setWaitingForResponse: (value: boolean) => {},
};

export const AppContext = createContext(defaultContext);
