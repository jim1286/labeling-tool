import { useState } from 'react';

const useConfirmModal = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return {
    isConfirmModalOpen,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
  };
};

export default useConfirmModal;
