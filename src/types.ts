import { type ReactNode } from 'react';

export interface ChatItemProps<T = Record<string, unknown>> {
  from: ReactNode
  message: ReactNode
  date: Date
};

export interface MessageProps {
  from: string
  message: string
  date: Date
};
