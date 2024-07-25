import React, { useEffect, useRef } from "react";
import { Spacer, ErrorMessage } from "@/components";
import { BS } from "@/theme";
import { Container, InputTitle } from "./styles";
import { Input, InputRef } from "antd";
import { useTheme } from "styled-components";

interface InputFormProps {
  title?: string;
  subTitle?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  onPressEnter?: () => void;
  onInputChange: (value: string) => void;
}

const ValidateSpaceInput: React.FC<InputFormProps> = ({
  title,
  subTitle,
  value,
  placeholder,
  errorMessage,
  onPressEnter,
  onInputChange,
}) => {
  const theme = useTheme();
  const inputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Container>
      {title && <InputTitle>{title}</InputTitle>}
      {subTitle && <BS color={theme.text.secondary}>{subTitle}</BS>}
      <Spacer size={4} type="horizontal" />
      <Input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        autoFocus
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        onPressEnter={(e) => {
          if (e.nativeEvent.isComposing) {
            return;
          }

          if (onPressEnter) {
            onPressEnter();
          }
        }}
      />
      {errorMessage && (
        <>
          <Spacer size={5} type="horizontal" />
          <ErrorMessage message={errorMessage} />
        </>
      )}
    </Container>
  );
};

export default ValidateSpaceInput;
