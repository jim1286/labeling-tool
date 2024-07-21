import { FlexColumn } from "@/components";
import { DefectType } from "@/interface";
import { BM } from "@/theme";
import { Modal, Row } from "antd";
import React from "react";
import { useTheme } from "styled-components";

interface Props {
  isOpen: boolean;
  selectedDefectType: DefectType | null;
  changeDefectType: string;
  onOk: (
    selectedDefectType: DefectType | null,
    changeDefectType: string
  ) => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  isOpen,
  selectedDefectType,
  changeDefectType,
  onOk,
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={isOpen}
      width={"30%"}
      okText="확인"
      cancelText="취소"
      onOk={() => onOk(selectedDefectType, changeDefectType)}
      onCancel={onClose}
      centered
      destroyOnClose
      closable={false}
      maskClosable={false}
    >
      <Row style={{ width: "100%", padding: "15px 0 10px 0" }}>
        <FlexColumn gap={10}>
          <BM style={{ display: "flex", width: "100%", gap: "8px" }}>
            레이블
            <BM color={selectedDefectType?.color}>
              {selectedDefectType?.name}
            </BM>
            이 / 가<BM color={selectedDefectType?.color}>{changeDefectType}</BM>
            으로 수정될 예정입니다.
          </BM>
          <BM color={theme.text.danger}>
            선택한 레이블을 수정하려고 합니다. 이 작업은 되돌릴 수 없으며,
            컬렉션에 있는 모든 라벨링 데이터에서 해당 레이블도 수정됩니다.
            계속하시겠습니까?
          </BM>
          <BM
            color={theme.text.danger}
          >{`수정을 원하시면 '확인'을, 취소하시려면 '취소'를 눌러주세요.`}</BM>
        </FlexColumn>
      </Row>
    </Modal>
  );
};

export default ConfirmModal;
