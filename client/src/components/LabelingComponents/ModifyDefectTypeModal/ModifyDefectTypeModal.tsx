import { CustomModal } from "@/components";
import { FlexColumn, DefectLayer, FlexRow } from "@/components";
import { useBoundStore } from "@/store";
import { DeleteIcon, EditIcon } from "./style";
import { useDeleteModal, useEditModal } from "./hook";
import { DeleteModal, EditModal } from "./components";
import { H5 } from "@/theme";

interface Props {
  isOpen: boolean;
  onClose: (message?: string) => void;
}

const ModifyDefectTypeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const defectTypeList = useBoundStore((state) => state.defectTypeList);
  const {
    isEditModalOpen,
    selectedEditDefectType,
    handleOpenEditModal,
    handleCloseEditModal,
  } = useEditModal();
  const {
    isDeleteModalOpen,
    selectedDeleteDefectType,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useDeleteModal();
  const modalType = isEditModalOpen
    ? "edit"
    : isDeleteModalOpen
    ? "delete"
    : "modify";

  return ((modalType: "edit" | "delete" | "modify") => {
    switch (modalType) {
      case "edit": {
        return (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onOk={() => {
              handleCloseEditModal();
              onClose("레이블 수정 성공");
            }}
            selectedDefectType={selectedEditDefectType.current}
          />
        );
      }
      case "delete": {
        return (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onOk={() => {
              handleCloseDeleteModal();
              onClose("레이블 삭제 성공");
            }}
            selectedDefectType={selectedDeleteDefectType.current}
          />
        );
      }
      case "modify": {
        return (
          <CustomModal
            title={<H5>레이블 편집</H5>}
            open={isOpen}
            width={"30%"}
            destroyOnClose
            onCancel={() => onClose()}
            footer={null}
            centered
          >
            <FlexColumn>
              {defectTypeList.map((defectType, index) => (
                <FlexRow
                  key={index}
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={10}
                >
                  <DefectLayer defectType={defectType} index={index + 1} />
                  <FlexRow key={index} gap={5}>
                    <EditIcon
                      size={16}
                      onClick={() => handleOpenEditModal(defectType)}
                    />
                    <DeleteIcon
                      size={16}
                      onClick={() => handleOpenDeleteModal(defectType)}
                    />
                  </FlexRow>
                </FlexRow>
              ))}
            </FlexColumn>
          </CustomModal>
        );
      }
    }
  })(modalType);
};

export default ModifyDefectTypeModal;
