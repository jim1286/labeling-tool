import { DefectType } from "@/interface";
import { BM, BL, H5 } from "@/theme";
import { Modal, Row } from "antd";
import React from "react";
import useConfirmModal from "./hook";
import { ConfirmModal } from "./components";
// import { useEngineDB } from '@engine-app/engine-db';
// import { DeleteCollectionRevisionLabelParam } from "@engine-app/types";
import { useBoundStore } from "@/store";
import { useFetchDefectTypeList, useResetLabeling } from "@/hooks";
import { CoreUtil } from "@/utils";

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
  const resetLabeling = useResetLabeling();
  const fetchDefectTypeList = useFetchDefectTypeList();
  const setCurrentImage = useBoundStore((state) => state.setCurrentImage);
  const setSelectedDefectType = useBoundStore(
    (state) => state.setSelectedDefectType
  );
  const setDefaultDefectType = useBoundStore(
    (state) => state.setDefaultDefectType
  );
  const currentImage = useBoundStore((state) => state.currentImage);
  // const { engineDBApi } = useEngineDB();

  const {
    isConfirmModalOpen,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
  } = useConfirmModal();
  const modalType = isConfirmModalOpen ? "confirm" : "delete";

  const handleOkConfirmModal = async (
    selectedDefectType: DefectType | null
  ) => {
    try {
      // await engineDBApi.deleteCollectionRevisionLabel(params);
      await fetchDefectTypeList();

      resetLabeling();
      setDefaultDefectType(null);
      setSelectedDefectType(null);

      // const resetImage = await engineDBApi.getImageWithLabelData({
      //   collectionRevisionId: selectedRevisionId,
      //   imageId: currentImage.imageId,
      // });

      // setCurrentImage({
      //   ...resetImage,
      //   path: CoreUtil.wrapFileScheme(resetImage.path),
      // });

      handleCloseConfirmModal();
      onOk();
    } catch (error) {
      console.log(error);
    }
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
