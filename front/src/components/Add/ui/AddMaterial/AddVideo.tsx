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
  video_url: string;
};

export const AddVideo: FC<Props> = ({ handleSubmit, id, handleRemove }) => {
  const [data, setData] = useState<FormProps>({
    id,
    content: "",
    type: InfoContentType.VIDEO,
    video_url: "",
  });
  const { t } = useTranslation();

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(data, e)}>
      <InputStyled
        onChange={(e) =>
          setData((prevData) => ({
            ...prevData,
            video_url: e.target.value,
          }))
        }
        placeholder={t("add.info.material.add_video")}
      />
      <TextAreaStyled
        onChange={(e) =>
          setData((prevData) => ({
            ...prevData,
            content: e.target.value,
          }))
        }
        placeholder={t("add.info.material.content")}
      />
      <Flex gap={8}>
        <Button type={"submit"} text={t("buttons.save")} />
        <Button onClick={() => handleRemove(id)} text={t("buttons.remove")} />
      </Flex>
    </FormWrapper>
  );
};
