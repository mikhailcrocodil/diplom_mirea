import { Button } from "../../../UI/Button";
import { FC, FormEvent, useState } from "react";
import { FormWrapper, TextAreaStyled } from "./AddMaterial.styled";
import { Flex } from "antd";
import { InfoContentType } from "../../../../api/models";
import { FileUpload } from "../../../../shared/UI/FileUploader/FileUpload";
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
  img_caption?: string;
};

export const AddImage: FC<Props> = ({ handleSubmit, id, handleRemove }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<FormProps>({
    id,
    content: "",
    type: InfoContentType.IMG,
    img_caption: "",
  });

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(data, e)}>
      <FileUpload
        setValue={(value) =>
          setData((prevData) => ({
            ...prevData,
            content: value,
          }))
        }
      />
      <TextAreaStyled
        onChange={(e) =>
          setData((prevData) => ({
            ...prevData,
            img_caption: e.target.value,
          }))
        }
        placeholder={t("add.info.img.description")}
      />
      <Flex gap={8}>
        <Button type={"submit"} text={t("buttons.save")} />
        <Button onClick={() => handleRemove(id)} text={t("buttons.remove")} />
      </Flex>
    </FormWrapper>
  );
};
