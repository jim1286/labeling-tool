import React from "react";
import {
  BodyContainer,
  Container,
  DeleteIcon,
  EyeIcon,
  EyeInvisibleIcon,
  HeaderContainer,
  LayerContainer,
  TaskLayerTitle,
} from "./styles";
import { EmptyLayer, FlexRow, TaskLayerComponent } from "@/components";
import { LM } from "@/theme";
import { useBoundStore } from "@/store";
import { LabelingModeEnum } from "@/enums";
import { Image } from "antd";
import useTaskLayerAction from "./hook";

const TaskLayerListComponent: React.FC = () => {
  const labelingMode = useBoundStore((state) => state.labelingMode);
  const {
    hideAll,
    editDataList,
    taskLayerList,
    taskImage,
    hoveredTaskId,
    selectedTaskLayerId,
    handleTaskLayerClick,
    handleMouseEnter,
    handleHideClick,
    handleHideAllClick,
    handleDeleteClick,
    handleDeleteAllClick,
    handleDeleteTaskLayerImage,
  } = useTaskLayerAction();
  const popImage = (() => {
    if (!taskImage) {
      return null;
    }

    return <Image src={taskImage} height={212} width={212} preview={false} />;
  })();

  return (
    <Container>
      <HeaderContainer>
        <TaskLayerTitle>
          <LM>{`작업 레이어`}</LM>
          <FlexRow gap={8}>
            {hideAll ? (
              <EyeInvisibleIcon
                width={16}
                height={16}
                onClick={handleHideAllClick}
              />
            ) : (
              <EyeIcon width={16} height={16} onClick={handleHideAllClick} />
            )}
            <DeleteIcon size={16} onClick={handleDeleteAllClick} />
          </FlexRow>
        </TaskLayerTitle>
      </HeaderContainer>
      <BodyContainer>
        <LayerContainer>
          {taskLayerList.length === 0 && <EmptyLayer />}
          {taskLayerList.map((taskLayer) => {
            switch (labelingMode) {
              case LabelingModeEnum.KEY_POINT:
              case LabelingModeEnum.SEGMENTATION: {
                const isDataNull =
                  taskLayer.data.length + editDataList.length === 0;

                if (isDataNull) {
                  return null;
                }

                break;
              }
              case LabelingModeEnum.OBJECT_DETECTION: {
                if (!taskLayer.data) {
                  return null;
                }

                break;
              }
            }

            return (
              <TaskLayerComponent
                key={taskLayer.id}
                labelingMode={labelingMode}
                taskLayer={taskLayer}
                selectedTaskLayerId={selectedTaskLayerId}
                popImage={hoveredTaskId === taskLayer.id ? popImage : null}
                handleHideClick={handleHideClick}
                handleDeleteClick={handleDeleteClick}
                handleTaskLayerClick={handleTaskLayerClick}
                handleMouseEnter={handleMouseEnter}
                handleDeleteTaskLayerImage={handleDeleteTaskLayerImage}
              />
            );
          })}
        </LayerContainer>
      </BodyContainer>
    </Container>
  );
};

export default TaskLayerListComponent;
