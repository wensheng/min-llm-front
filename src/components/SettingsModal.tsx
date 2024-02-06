import type React from 'react';
import { Input, Modal } from 'antd';

interface SettingsModalProps {
  settingType: string
  title: string
  value: string
  setValue: (value: string) => void
  isOpen: boolean
  onOk: () => void
  onCancel: () => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  return (
    <Modal
      title={props.title}
      open={props.isOpen}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      {
        props.settingType === 'textarea'
          ? (
          <Input.TextArea
            value={props.value}
            onChange={props.onInputChange}
          />
            )
          : (
          <Input
            type="text"
            value={props.value}
            onChange={props.onInputChange}
          />
            )
      }

    </Modal>
  );
};

export default SettingsModal;