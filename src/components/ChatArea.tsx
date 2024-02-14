import { type FC, type RefObject, useEffect, useRef, useContext } from 'react';
import { useChatStore } from '../store';
import { AppContext } from '../AppContext';
import { ChatItem, LastChatItem } from './ChatItem';

const chatAreaStyle: React.CSSProperties = {
  textAlign: 'left',
  minHeight: 300,
  maxHeight: 600,
  backgroundColor: '#957d9',
  overflowY: 'scroll'
};

interface ChatAreaProps {
  currentStreamingRef: RefObject<HTMLDivElement>
}

const ChatArea: FC<ChatAreaProps> = ({ currentStreamingRef }) => {
  const { waitingForResponse } = useContext(AppContext);
  const { stream } = useChatStore(state => state.chatSettings);
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
      {stream && waitingForResponse && (
          <div style={{ marginBottom: '10px' }} >
            <LastChatItem currentStreamingRef={currentStreamingRef} />
          </div>
      )}
    </div>
  );
};

export default ChatArea;
