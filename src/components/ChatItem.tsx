import { type FC, type ReactElement, memo } from 'react';
import { Card, Col, Row } from 'antd';
import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import type { MessageProps } from '../types';

const dateOptions: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  month: 'numeric',
  day: 'numeric'
};

const formatMessage = (message: string): ReactElement<HTMLDivElement> => {
  if (message === '' || message === undefined) return <div />;
  const msg = message.replace(/```([^`]*)```|(\n)/g, function (match, codeBlock: string, lineBreak) {
    if (codeBlock !== undefined && codeBlock !== '') {
      return '<pre>' + codeBlock + '</pre>';
    } else {
      return '<br>';
    }
  });
  return <div dangerouslySetInnerHTML={{ __html: msg }} />;
};

export const LastChatItem: FC<{ currentStreamingRef: React.RefObject<HTMLDivElement> }> = ({ currentStreamingRef }) => (
  <Row justify="start">
      <Col span={0}><RobotOutlined style={{ fontSize: '24px' }} /></Col>
      <Col span={20}>
        <Card actions={[new Date().toLocaleString('en-US', dateOptions)]} >
          <div ref={currentStreamingRef} />
        </Card>
      </Col>
  </Row>
);

export const ChatItem = memo<MessageProps>(({ from, message, date }: MessageProps) => {
  if (from === 'user') {
    return (
      <Row justify="end">
        <Col span={21}>
          <Card actions={[date.toLocaleString('en-US', dateOptions)]} >
            {formatMessage(message)}
          </Card>
        </Col>
        <Col span={1}><UserOutlined style={{ fontSize: '24px' }} /></Col>
      </Row>
    )
  }
  return (
    <Row justify="start">
      <Col span={1}><RobotOutlined style={{ fontSize: '24px' }} /></Col>
      <Col span={21}>
        <Card actions={[date.toLocaleString('en-US', dateOptions)]} >
          {formatMessage(message)}
        </Card>
      </Col>
    </Row>
  );
});

ChatItem.displayName = 'ChatItem';
