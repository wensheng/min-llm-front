import type React from 'react';
import { useState } from 'react';
import { Input, Modal, Space } from 'antd';
import { useChatStore } from '../store';

interface FuncsModalProps {
  isOpen: boolean
  onOk: () => void
}

const FuncsModal: React.FC<FuncsModalProps> = (props) => {
  const functionJson = useChatStore(state => state.functionJson);
  const setFunctionJson = useChatStore(state => state.setFunctionJson);
  const [funcJson, setFuncJson] = useState(functionJson);

  const onOk = (): void => {
    setFunctionJson(funcJson);
    props.onOk();
  }

  return (
    <Modal
      title="Define Functions"
      open={props.isOpen}
      onOk={onOk}
      onCancel={props.onOk}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Input.TextArea
          rows={10}
          value={funcJson}
          onChange={ (e) => { setFuncJson(e.target.value); } }
        />
      </Space>

    </Modal>
  );
};

export default FuncsModal;
