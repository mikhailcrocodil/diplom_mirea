import { ErrorWrapper } from "./Error.styles";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <ErrorWrapper>
      <span>{message}</span>
    </ErrorWrapper>
  );
};

export default ErrorMessage;
