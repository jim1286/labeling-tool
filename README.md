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

### 기능

```bash

- 라벨링 툴 기능
    - 자동저장
        - Ctrl + F
            - On/Off
    - 작업저장
        - Ctrl + S
    - 레이블 선택
        - 키보드 숫자 클릭
            - 레이블에 지정된 번호(오른쪽 번호)가 있으면 해당 레이블이 선택이 된다.
        - 레이블 추가
        - 레이블 편집
            - 레이블 삭제
            - 레이블 수정
    - 레이어 정보
        - 현재 작업 중인 레이어 정보 계산 ( 바운딩 박스 기준 )
    - 작업 레이어
        - 작업 레이어 전체 숨김
        - 작업 레이어 전체 삭제
        - 작업 레이어 삭제
        - 작업 레이어 숨김
        - 작업 레이어 편집(클릭)
            - Segmentation, Key Point
                - 선택한 작업 레이어를 수정 및 레이블 변경이 가능하다.
            - Object Detection
                - 레이블 변경 및 선택한 작업 레이어를 강조하여 볼 수 있다.
    - 모드( 레이블 선택 후 )
        - 공통
            - Space
                - 레이어 저장
            - ESC
                - 레이어 저장 취소
        - Segmentation
            - Q
                - sam 모드
                    - Q
                        - sam 포인트 모드
                        - Shift
                            - 포인트 모드에 대한 미리보기가 활성화 된다
                    - W
                        - sam 박스 모드
            - W
                - 브러시 모드
                    - Q
                        - 브러시 칠하기 모드
                    - W
                        - 브러시 지우기 모드
                - [
                    - 브러시 크기 확대
                - ]
                    - 브러시 크기 축소
        - Key Point, Object Detection
            - 레이블 선택 후에 자동으로 모드 활성화
    - 툴바
        - 공통
            - T
                - 십자선 활성화
            - 이미지 필터 조정 모달
            - Ctrl + Z
                - 작업 되돌리기
            - Ctrl + Shift + Z
                - 작업 다시 실행
        - Key Point
            - [
                - 선 굵기 확대
            - ]
                - 선 굵기 축소
    - 컬렉션
        - A
            - 위의 이미지로 이동
        - D
            - 아래의 이미지로 이동
        - 클릭
            - 클릭한 이미지로 이동
    - 캠버스
        - 마우스 휠
            - 마우스 포인터가 있는 곳을 기준으로 확대가 된다.
        - 마우스 그랩
            - 확대 후에 그랩을 통해 이미지를 이동할 수 있다.
        - V
            - 작업 중일 때 V를 누르면 이미지 이동이 활성화 된다.
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
