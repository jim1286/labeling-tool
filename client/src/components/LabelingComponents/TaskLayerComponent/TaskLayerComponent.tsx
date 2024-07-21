import React from 'react';
import { Container, Title, TypoContainer } from './styles';
import { IconComponent } from './components';
import { TaskLayer } from '@/interface';
import { Popover } from 'antd';
import { IconCircleDot, IconFrame, IconTexture } from '@tabler/icons-react';
import { LM } from '@/theme';
import { LabelingModeEnum } from '@/enums';

interface TaskLayerComponentProps {
  labelingMode: LabelingModeEnum;
  taskLayer: TaskLayer;
  popImage?: JSX.Element | null;
  selectedTaskLayerId?: string | null;
  handleHideClick: () => void;
  handleDeleteClick: () => void;
  handleMouseEnter: (taskLayer: TaskLayer) => void;
  handleTaskLayerClick?: () => void;
  handleDeleteTaskLayerImage?: () => void;
}

const TaskLayerComponent: React.FC<TaskLayerComponentProps> = ({
  labelingMode,
  taskLayer,
  popImage,
  selectedTaskLayerId,
  handleHideClick,
  handleDeleteClick,
  handleTaskLayerClick,
  handleMouseEnter,
  handleDeleteTaskLayerImage,
}) => {
  const isClicked = taskLayer.id === selectedTaskLayerId;
  const iconOpacity = selectedTaskLayerId && !isClicked ? { opacity: 0.2 } : undefined;

  const taskIcon = (() => {
    const style = {
      width: 16,
      height: 16,
      color: taskLayer.defectType.color,
    };

    switch (labelingMode) {
      case LabelingModeEnum.OBJECT_DETECTION: {
        return React.cloneElement(<IconFrame />, { style });
      }
      case LabelingModeEnum.SEGMENTATION: {
        return React.cloneElement(<IconTexture />, { style });
      }
      case LabelingModeEnum.KEY_POINT: {
        return React.cloneElement(<IconCircleDot />, { style });
      }
    }
  })();

  return (
    <Popover placement="right" trigger="hover" open={!!popImage} content={popImage}>
      <Container
        isClicked={isClicked}
        style={{
          ...iconOpacity,
        }}
        onMouseEnter={() => handleMouseEnter(taskLayer)}
        onMouseLeave={handleDeleteTaskLayerImage}
      >
        <TypoContainer onClick={handleTaskLayerClick}>
          {taskIcon}
          <Title>
            <LM color={taskLayer.defectType.color}>{taskLayer.defectType.name}</LM>
          </Title>
        </TypoContainer>
        <IconComponent
          isHidden={taskLayer.hidden}
          handleHideClick={handleHideClick}
          handleDeleteClick={handleDeleteClick}
        />
      </Container>
    </Popover>
  );
};

export default TaskLayerComponent;
