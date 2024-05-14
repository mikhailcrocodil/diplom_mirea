import styled from "styled-components";
import Loading from "../Loading/Loading";

const Wrapper = styled("div")`
  width: 100vh;
  height: 100vh;
  background: var(--bg-color);
`;

export const SuspenseLoader = () => {
  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
};
