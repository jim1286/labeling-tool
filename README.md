# Labeling Tool

### 설명

데이터 세트에 라벨을 추가하고 관리하는 데 도움을 주는 도구입니다. 단 서버를 띄울 비용 절약을 위해 미리 준비된 데이터 셋으로만 체험할 수 있습니다.

### 특징 - 4가지의 라벨링 타입을 제공합니다.

- Classification
- Object Detection
- Segmentation (Sam을 제공하고 있습니다.)
- Key Point

### 설치 방법

```bash
# 프로젝트를 클론합니다
git clone https://github.com/jim1286/labeling-tool.git

# 프로젝트 디렉토리로 이동합니다
cd labeling-tool

# client와 server를 실행합니다.
yarn start
```

### 작업 플로우

```bash
1. 레이블을 생성한다.
2. 레이블 선택 후 라벨링을 한다.
3. 작업 저장하면 지정된 데이터 타입으로 저장이 된다.
4. 작업 저장한 작업을 클릭하면 저장된 데이터 타입을 원복하여 이어서 다시 작업할 수 있다.
```

### 저장되는 데이터 타입

```bash
type LabelData = {
  imageHeight: number;
  imageWidth: number;
  # Segmentation을 위한 mask, 마스크 데이터이며 저장을 위해 인코드 되어 저장이 된다.
  # annotation에 있는 data의 값을 통해 디코드 할 수 있다.
  # 또한 작업 레이어를 다시 복구하는 값으로도 쓰인다.
  mask: JSON.stringify(number[]);
  # Classification을 위한 imageClass, 선택한 레이블로 저장이 된다.
  imageClass: string;
  annotations: {
    type: "box" | "seg" | "keypoint";
    # 바운딩 박스
    bbox: number[];
    # 레이블 이름
    label: string;
    data: SegLabelData | BoxLabelData | KeyPointLabelData;
  }[];
};

type Coordinates = [number, number];
# 같은 레이블에 대해 분리 및 인코드 된 mask를 다시 디코드 하기 위한 값, key처럼 사용을 한다.
type SegLabelData = number;
# 좌상단, 우하단의 점의 값
type BoxLabelData = Coordinates[];
# 찍힌 점들의 값
type KeyPointLabelData = Coordinates[];
```
