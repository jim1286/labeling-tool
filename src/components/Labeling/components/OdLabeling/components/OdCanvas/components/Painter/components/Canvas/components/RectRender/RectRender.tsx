import { OdData, TaskLayer } from '@/interface';
import { useBoundStore } from '@/store';
import { LabelingUtil } from '@/utils';
import React from 'react';
import { Group, Rect, Text } from 'react-konva';

interface RectRenderProps {
  taskLayer: TaskLayer;
  title: string;
}

const RectRender: React.FC<RectRenderProps> = ({ taskLayer, title }) => {
  const scale = useBoundStore((state) => state.scale);
  const imageSize = useBoundStore((state) => state.imageSize);
  const selectedTaskLayerId = useBoundStore((state) => state.selectedTaskLayerId);
  const rectangleData = (taskLayer.data[0].data as OdData).rectangleData;
  const rectangleColor = taskLayer.defectType.color;

  const widthCalculator = () => {
    const regExp = [
      { type: 'kr', reg: /[ㄱ-ㅎㅏ-ㅣ가-힣]/g },
      { type: 'enCapital', reg: /[A-Z]/g },
      { type: 'enUpper', reg: /[a-z]/g },
      { type: 'symbol', reg: /[_]/g },
      { type: 'number', reg: /\d/g },
    ];
    let rectWidth = 0;

    regExp.forEach((regExpList) => {
      const result = title.match(regExpList.reg);
      if (result) {
        if (regExpList.type === 'kr') {
          return (rectWidth += result.length * 10);
        }

        if (regExpList.type === 'enCapital') {
          return (rectWidth += result.length * 7);
        }

        if (regExpList.type === 'enUpper') {
          return (rectWidth += result.length * 5);
        }

        if (regExpList.type === 'symbol') {
          return (rectWidth += result.length * 2);
        }

        if (regExpList.type === 'number') {
          return (rectWidth += result.length * 5.5);
        }
      }
    });

    rectWidth += 25;
    return Math.round(rectWidth);
  };

  const tagCoordinateCalculator = () => {
    const rectWidth = widthCalculator();
    const rectHeight = 16;

    let x = rectangleData.x * scale;
    let y = rectangleData.y * scale;
    const width = rectangleData.width * scale;
    const height = rectangleData.height * scale;

    if (scale === 0) {
      return {
        x: 0,
        y: 0,
        rectWidth: 0,
        rectHeight: 0,
      };
    }

    if (width < 0) {
      x = x - Math.abs(width);
    }

    if (height < 0) {
      y = y - Math.abs(height) - rectHeight;
    } else {
      y = y - rectHeight;
    }

    if (y < 4) {
      y = y + Math.abs(height) + rectHeight;
    }

    if (rectangleData.x * scale + rectWidth > imageSize.width) {
      const initX = rectangleData.x * scale;
      const tempWidth = width < 0 ? 0 : width;
      const overWidth =
        initX + rectWidth - imageSize.width + (imageSize.width - (initX + tempWidth));
      x = initX - overWidth;
    }

    x = Math.round(x);
    y = Math.round(y);

    return { x, y, rectWidth, rectHeight };
  };

  const textCoordinateCalculator = (x: number, y: number) => {
    const regExp = [
      { type: 'kr', reg: /[ㄱ-ㅎㅏ-ㅣ가-힣]/g },
      { type: 'enCapital', reg: /[A-Z]/g },
      { type: 'enUpper', reg: /[a-z]/g },
      { type: 'symbol', reg: /[_]/g },
      { type: 'number', reg: /\d/g },
    ];
    let textX = 0;
    let textY = 0;

    regExp.forEach((regExpList) => {
      const result = title.match(regExpList.reg);
      if (result) {
        if (regExpList.type === 'kr') {
          textX = 11.7;
          textY = 2;
        }

        if (regExpList.type === 'enUpper') {
          textX = 8;
          textY = 2;
        }

        if (regExpList.type === 'enCapital') {
          textX = 8.3;
          textY = 1;
        }

        if (regExpList.type === 'number') {
          textX = 6;
          textY = 1;
        }

        if (regExpList.type === 'symbol') {
          textX = 7;
          textY = 1;
        }
      }
    });

    return {
      textX: x + textX,
      textY: y + textY,
    };
  };

  const TagRender = (() => {
    const { x, y, rectWidth, rectHeight } = tagCoordinateCalculator();
    const { textX, textY } = textCoordinateCalculator(x, y);

    return (
      <>
        <Rect
          x={x}
          y={y}
          width={rectWidth}
          height={rectHeight}
          stroke={rectangleColor}
          fill={rectangleColor}
          cornerRadius={2}
          border={4}
        />
        <Text
          x={textX}
          y={textY}
          text={title}
          fontSize={12}
          fontFamily={'Pretendard'}
          align={'left'}
          fill={'white'}
        />
      </>
    );
  })();

  return (
    <Group>
      {TagRender}
      <Rect
        x={rectangleData.x * scale}
        y={rectangleData.y * scale}
        width={rectangleData.width * scale}
        height={rectangleData.height * scale}
        stroke={rectangleColor}
        fill={
          selectedTaskLayerId === taskLayer.id
            ? LabelingUtil.hexToStringRGB(rectangleColor, '0.2')
            : ''
        }
      />
    </Group>
  );
};

export default RectRender;
