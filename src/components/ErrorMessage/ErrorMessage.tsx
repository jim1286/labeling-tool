import { IconAlertTriangleFilled } from '@tabler/icons-react';
import React from 'react';
import { Container } from './styles';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Container>
      <IconAlertTriangleFilled size={16} />
      {message}
    </Container>
  );
};

export default ErrorMessage;
