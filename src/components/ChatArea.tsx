import { type FC, useEffect, useRef } from 'react';
import { useChatStore } from '../store';
import ChatItem from './ChatItem';

const chatAreaStyle: React.CSSProperties = {
  textAlign: 'left',
  minHeight: 300,
  maxHeight: 600,
  backgroundColor: '#957d9',
  overflowY: 'scroll'
};

const ChatArea: FC = () => {
  const messages = useChatStore(state => state.messages);
  const lastMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMsgRef?.current !== null) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={chatAreaStyle}>
      {
        messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMsgRef : null}
            style={{ marginBottom: '10px' }}
          >
            <ChatItem {...message} />
          </div>
        ))
      }
    </div>
  );
};

export default ChatArea;
