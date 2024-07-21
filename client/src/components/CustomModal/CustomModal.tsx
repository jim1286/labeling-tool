import { Modal, ModalProps } from "antd";
import React from "react";

interface Props extends ModalProps {
  children: React.ReactNode;
}

const CustomModal: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Modal {...rest} centered>
      {children}
    </Modal>
  );
};

export default CustomModal;
