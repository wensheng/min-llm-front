import { memo } from 'react';
import { Card, Col, Row } from 'antd';
import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import type { MessageProps } from '../types';

const dateOptions: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  month: 'numeric',
  day: 'numeric'
};

const ChatItem = memo<MessageProps>(({ from, message, date }: MessageProps) => {
  if (from === 'user') {
    return (
      <Row justify="end">
        <Col span={22}>
          <Card actions={[date.toLocaleString('en-US', dateOptions)]} >
            {message}
          </Card>
        </Col>
        <Col span={1}><UserOutlined style={{ fontSize: '24px' }} /></Col>
      </Row>
    )
  }
  return (
    <Row justify="start">
      <Col span={1}><RobotOutlined style={{ fontSize: '24px' }} /></Col>
      <Col span={22}>
        <Card actions={[date.toLocaleString('en-US', dateOptions)]} >
          {message}
        </Card>
      </Col>
    </Row>
  );
});

ChatItem.displayName = 'ChatItem';

export default ChatItem;
