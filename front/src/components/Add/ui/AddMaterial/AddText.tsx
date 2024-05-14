import { Button } from "../../../UI/Button";
import { FC, FormEvent, useState } from "react";
import { FormWrapper, InputStyled, TextAreaStyled } from "./AddMaterial.styled";
import { Flex } from "antd";
import { InfoContentType } from "../../../../api/models";
import { useTranslation } from "react-i18next";

type Props = {
  id: number;
  handleSubmit: (data: any, e: FormEvent<HTMLFormElement>) => void;
  handleRemove: (id: number) => void;
};

type FormProps = {
  id: number;
  content: string;
  type: InfoContentType;
  title_paragraph?: string;
  title_block?: string;
};

export const AddText: FC<Props> = ({ handleSubmit, id, handleRemove }) => {
  const [data, setData] = useState<FormProps>({
    id,
    content: "",
    type: InfoContentType.TEXT,
    title_paragraph: "",
    title_block: "",
  });
  const { t } = useTranslation();

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(data, e)}>
      <TextAreaStyled
        onChange={(e) =>
          setData((prevData) => ({
            ...prevData,
            content: e.target.value,
          }))
        }
        placeholder={t("add.info.material.content")}
      />
      <InputStyled
        onChange={(e) =>
          setData((prevData) => ({
            ...prevData,
            title_block: e.target.value,
          }))
        }
        placeholder={t("add.info.material.title_block")}
      />
      <InputStyled
        onChange={(e) =>
          setData((prevData) => ({
            ...prevData,
            title_paragraph: e.target.value,
          }))
        }
        placeholder={t("add.info.material.title_paragraph")}
      />
      <Flex gap={8}>
        <Button type={"submit"} text={t("buttons.save")} />
        <Button onClick={() => handleRemove(id)} text={t("buttons.remove")} />
      </Flex>
    </FormWrapper>
  );
};
