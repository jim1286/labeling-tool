import { DefectType } from '@/interface';
import { useRef, useState } from 'react';

export const useEditModal = () => {
  const selectedEditDefectType = useRef<DefectType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = (defectType: DefectType) => {
    selectedEditDefectType.current = defectType;
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    selectedEditDefectType.current = null;
    setIsEditModalOpen(false);
  };

  return {
    isEditModalOpen,
    selectedEditDefectType,
    handleOpenEditModal,
    handleCloseEditModal,
  };
};

export const useDeleteModal = () => {
  const selectedDeleteDefectType = useRef<DefectType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = (defectType: DefectType) => {
    selectedDeleteDefectType.current = defectType;
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    selectedDeleteDefectType.current = null;
    setIsDeleteModalOpen(false);
  };

  return {
    isDeleteModalOpen,
    selectedDeleteDefectType,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
};
