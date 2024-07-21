import React from "react";
import {
  Container,
  DefectTypeListTitle,
  DefectTypeContainer,
  PlusIcon,
  EditIcon,
  BodyWrapper,
  HeaderContainer,
} from "./styles";
import {
  AddDefectTypeModal,
  DefectLayer,
  FlexColumn,
  FlexRow,
  ModifyDefectTypeModal,
} from "@/components";
import { BS, LM } from "@/theme";
import { useDefectAddModal, useDefectEditModal, useDefectType } from "./hook";
import { useBoundStore } from "@/store";
import { notification } from "antd";
import { LabelingModeEnum } from "@/enums";
import { useTheme } from "styled-components";

const DefectTypeListComponent: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const {
    isAddModalOpen,
    handleAddModalClose,
    handleAddModalOpen,
    handleAddModalOk,
  } = useDefectAddModal(api);
  const { isEditModalOpen, handleEditModalClose, handleEditModalOpen } =
    useDefectEditModal(api);
  const { defectTypeList, handleClick } = useDefectType(api);
  const theme = useTheme();
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const selectedDefectType = useBoundStore((state) => state.selectedDefectType);

  return (
    <Container>
      {contextHolder}
      <HeaderContainer>
        <DefectTypeListTitle>
          <LM>{`레이블 선택`}</LM>
          <FlexRow gap={10}>
            {defectTypeList.length !== 0 && (
              <EditIcon size={16} onClick={handleEditModalOpen} />
            )}
            <PlusIcon size={16} onClick={handleAddModalOpen} />
          </FlexRow>
        </DefectTypeListTitle>
      </HeaderContainer>
      <BodyWrapper>
        <DefectTypeContainer>
          {defectTypeList.length === 0 && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <LM color={theme.text.brand}>레이블 없음</LM>
              <FlexColumn alignItems="center">
                <BS color={theme.text.secondary}>
                  선택할 수 있는 레이블이 없습니다.
                </BS>
                <BS color={theme.text.secondary}>
                  {labelingMode === LabelingModeEnum.CLASSIFICATION
                    ? "최소 두 개의 레이블을 추가해 주세요."
                    : "레이블을 추가해 주세요."}
                </BS>
              </FlexColumn>
            </div>
          )}
          {defectTypeList.map((defectType, index) => (
            <DefectLayer
              key={index}
              defectType={defectType}
              isClicked={defectType.name === selectedDefectType?.name}
              index={index + 1}
              onClick={handleClick}
            />
          ))}
        </DefectTypeContainer>
      </BodyWrapper>
      <AddDefectTypeModal
        isOpen={isAddModalOpen}
        onOk={handleAddModalOk}
        onClose={handleAddModalClose}
      />
      <ModifyDefectTypeModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      />
    </Container>
  );
};

export default DefectTypeListComponent;
