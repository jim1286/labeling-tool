import { CustomModal } from "@/components";
import { ValidateSpaceInput } from "@/components";
import { uesValidateSpace } from "@/hooks";
import { useBoundStore } from "@/store";
import { H5 } from "@/theme";
import { Row } from "antd";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onOk: (inputValue: string) => Promise<void>;
  onClose: () => void;
}

const AddDefectTypeModal = ({ isOpen, onOk, onClose }: Props) => {
  const defectTypeList = useBoundStore((state) => state.defectTypeList);
  const { inputValue, isValidate, handleInputChange, resetState } =
    uesValidateSpace();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const validInput = isValidate && !isDuplicate;

  useEffect(() => {
    const find = defectTypeList.find(
      (defectType) => defectType.name === inputValue
    );
    setIsDuplicate(!!find);
  }, [inputValue]);

  const handleSubmit = async () => {
    if (!validInput || inputValue.length === 0) {
      return;
    }

    await onOk(inputValue);
    resetState();
  };

  const handleCancel = () => {
    onClose();
    resetState();
  };

  return (
    <CustomModal
      title={<H5>레이블 추가</H5>}
      open={isOpen}
      width={"30%"}
      okType={validInput ? "default" : "danger"}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="추가하기"
      cancelText="닫기"
      destroyOnClose
    >
      <Row style={{ width: "100%", padding: "15px 0 10px 0" }}>
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
          onPressEnter={handleSubmit}
          onInputChange={handleInputChange}
        />
      </Row>
    </CustomModal>
  );
};

export default AddDefectTypeModal;
