import React from "react";
import useConfirmModal from "./hook";
import { DefectType } from "@/interface";
import { BM, BL, H5 } from "@/theme";
import { Modal, Row } from "antd";
import { ConfirmModal } from "./components";
import { useBoundStore } from "@/store";
import { customPresetColors, defectTypeColors } from "@/theme/color";
import useModifyState from "../hook";

interface Props {
  isOpen: boolean;
  selectedDefectType: DefectType | null;
  onOk: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<Props> = ({
  isOpen,
  selectedDefectType,
  onOk,
  onClose,
}) => {
  const {
    isConfirmModalOpen,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
  } = useConfirmModal();
  const modifyState = useModifyState();
  const defectTypeList = useBoundStore((state) => state.defectTypeList);
  const modalType = isConfirmModalOpen ? "confirm" : "delete";

  const handleOkConfirmModal = async (
    selectedDefectType: DefectType | null
  ) => {
    const deletedDefectTypeList = defectTypeList
      .filter((defectType) => defectType.name !== selectedDefectType?.name)
      .map((defectType, index) => {
        return {
          name: defectType.name,
          color: defectTypeColors[customPresetColors[index]],
          defectTypeNumber: index + 1,
        };
      });

    modifyState(deletedDefectTypeList);
    handleCloseConfirmModal();
    onOk();
  };

  return ((modalType: "confirm" | "delete") => {
    switch (modalType) {
      case "confirm": {
        return (
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            selectedDefectType={selectedDefectType}
            onOk={handleOkConfirmModal}
            onClose={handleCloseConfirmModal}
          />
        );
      }
      case "delete": {
        return (
          <Modal
            title={<H5>레이블 삭제</H5>}
            open={isOpen}
            width={"30%"}
            onOk={handleOpenConfirmModal}
            onCancel={onClose}
            okText="삭제하기"
            cancelText="취소"
            centered
            destroyOnClose
            maskClosable={false}
          >
            <Row style={{ width: "100%", padding: "15px 0 10px 0" }}>
              <BM style={{ display: "flex", alignItems: "center", gap: 5 }}>
                레이블
                <BL color={selectedDefectType?.color}>
                  {selectedDefectType?.name}
                </BL>
                을 삭제하시겠습니까?
              </BM>
            </Row>
          </Modal>
        );
      }
    }
  })(modalType);
};

export default DeleteModal;
