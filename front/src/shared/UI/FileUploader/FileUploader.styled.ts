import styled from "styled-components";

export const UploaderStyled = styled("div")`
  display: flex;
  justify-content: center;
`;

export const UploadImg = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 144px;
  height: 144px;
  border-radius: 50%;
  padding: 12px 24px;
  margin: 16px 0 16px;
  border: 1px dashed #cbc6c6;
  svg {
    font-size: 40px;
    color: var(--title-color);
  }
  input[type="file"] {
    cursor: pointer;
    position: absolute;
    font-size: 0;
    display: unset;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const LoadedImg = styled("div")`
  width: 148px;
  position: relative;
  height: 148px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  button {
    width: 32px;
    height: 32px;
    background: rgb(213, 213, 213);
    position: absolute;
    right: 12px;
    top: 0;

    &:hover {
      background: gray;
    }
  }
`;
