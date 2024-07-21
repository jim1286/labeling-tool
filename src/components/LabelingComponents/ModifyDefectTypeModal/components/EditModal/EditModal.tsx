import { FlexColumn, Title, ValidateSpaceInput } from "@/components";
import {
  uesValidateSpace,
  useFetchDefectTypeList,
  useResetLabeling,
} from "@/hooks";
import { DefectType } from "@/interface";
import { useBoundStore } from "@/store";
import { BM } from "@/theme";
import { Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { ConfirmModal } from "./components";
// import { useEngineDB } from '@engine-app/engine-db';
import { UpdateCollectionRevisionLabelParam } from "@engine-app/types";
import useConfirmModal from "./hook";
import { CoreUtil } from "@/utils";

interface Props {
  isOpen: boolean;
  selectedDefectType: DefectType | null;
  onOk: () => void;
  onClose: () => void;
}

const EditModal: React.FC<Props> = ({
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
  const defectTypeList = useBoundStore((state) => state.defectTypeList);
  // const selectedRevisionId = useBoundStore((state) => state.selectedRevisionId);
  const {
    isConfirmModalOpen,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
  } = useConfirmModal();
  const { inputValue, isValidate, handleInputChange, resetState } =
    uesValidateSpace();
  // const { engineDBApi } = useEngineDB();

  const [isDuplicate, setIsDuplicate] = useState(false);
  const validInput = isValidate && !isDuplicate;
  const modalType = isConfirmModalOpen ? "confirm" : "edit";

  useEffect(() => {
    const find = defectTypeList.find(
      (defectType) => defectType.name === inputValue
    );
    setIsDuplicate(!!find);
  }, [inputValue]);

  const handleOkEditModal = async () => {
    if (!validInput || inputValue.length === 0) {
      return;
    }

    handleOpenConfirmModal();
  };

  const handleCancel = () => {
    onClose();
    resetState();
  };

  const handleOkConfirmModal = async (
    selectedDefectType: DefectType | null,
    changeDefectType: string
  ) => {
    // if (!selectedDefectType || !engineDBApi || !selectedRevisionId) {
    //   return;
    // }

    // const params: UpdateCollectionRevisionLabelParam = {
    //   collectionRevisionId: selectedRevisionId,
    //   targetLabel: selectedDefectType.name,
    //   newLabel: changeDefectType,
    // };

    try {
      // await engineDBApi.updateCollectionRevisionLabel(params);
      // await fetchDefectTypeList();

      // resetLabeling();
      // setDefaultDefectType(null);
      // setSelectedDefectType(null);

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

  return ((modalType: "confirm" | "edit") => {
    switch (modalType) {
      case "confirm": {
        return (
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            selectedDefectType={selectedDefectType}
            changeDefectType={inputValue}
            onOk={handleOkConfirmModal}
            onClose={handleCloseConfirmModal}
          />
        );
      }
      case "edit": {
        return (
          <Modal
            title={<Title level={5}>레이블 수정</Title>}
            open={isOpen}
            width={"30%"}
            okType={validInput ? "default" : "danger"}
            onOk={handleOkEditModal}
            onCancel={handleCancel}
            okText="수정하기"
            cancelText="취소"
            centered
            destroyOnClose
            maskClosable={false}
          >
            <Row style={{ width: "100%", padding: "15px 0 10px 0" }}>
              <FlexColumn style={{ width: "100%" }} gap={5}>
                {validInput ? (
                  <BM style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    {inputValue && (
                      <>
                        레이블
                        <BM color={selectedDefectType?.color}>
                          {selectedDefectType?.name}
                        </BM>
                        을
                        <BM color={selectedDefectType?.color}>{inputValue}</BM>
                        으로 수정하시겠습니까?
                      </>
                    )}
                  </BM>
                ) : (
                  <BM>레이블 수정이 불가합니다.</BM>
                )}
                <ValidateSpaceInput
                  value={inputValue}
                  placeholder="레이블을 입력하세요"
                  errorMessage={
                    isValidate
                      ? isDuplicate
                        ? "레이블이 중복 되었습니다."
                        : undefined
                      : "공백은 입력할 수 없습니다."
                  }
                  onPressEnter={handleOkEditModal}
                  onInputChange={handleInputChange}
                />
              </FlexColumn>
            </Row>
          </Modal>
        );
      }
    }
  })(modalType);
};

export default EditModal;
