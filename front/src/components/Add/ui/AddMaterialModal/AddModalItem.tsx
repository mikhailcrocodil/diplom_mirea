import { FC } from "react";
import { CardAddStyled, Link } from "../Add.styled";
import { ModalItemProps } from "./AddMaterialModal";
export const AddModalItem: FC<ModalItemProps> = ({
  text,
  icon,
  toLink,
  onClick,
  isLink = true,
}) => {
  return isLink && toLink ? (
    <Link to={toLink}>
      <CardAddStyled>
        {icon}
        <span>{text}</span>
      </CardAddStyled>
    </Link>
  ) : (
    <div onClick={onClick}>
      <CardAddStyled>
        {icon}
        <span>{text}</span>
      </CardAddStyled>
    </div>
  );
};
