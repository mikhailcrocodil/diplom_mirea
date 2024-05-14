import { Button } from "../../../UI/Button";
import { AddMaterialStyled, InputStyled } from "./AddMaterial.styled";
import { Flex, Input } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { InfoContentType } from "../../../../api/models";
import { AddText } from "./AddText";
import { CurrentMaterialItem } from "../../../CurrentMaterial/CurrentMaterialItem";
import { AddVideo } from "./AddVideo";
import { AddImage } from "./AddImage";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";

type Props = {
  id: number;
  type: InfoContentType;
  content: string;
  title_paragraph?: string;
  title_block?: string;
  img_caption?: string;
  video_url?: string;
};

type FormProps = {
  id: number;
  content: string;
  type: InfoContentType;
  title_paragraph?: string;
  title_block?: string;
  img_caption?: string;
  video_url: string;
};

const AddMaterial = () => {
  const [materials, setMaterials] = useState<FormProps[]>([]);
  const [readyMaterials, setReadyMaterials] = useState<Props[]>([]);
  const [id, setId] = useState(0);
  const [materialTitle, setMaterialTitle] = useState<string>("");

  const themeId = localStorage.getItem("themeId");

  const handleSubmit = (data: FormProps, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReadyMaterials((prevState) => [...prevState, data]);
    const newFormMaterials = materials.filter(
      (material) => material.id !== data.id,
    );
    setMaterials(newFormMaterials);
  };

  const handleRemove = (id: number) => {
    const removedMaterials = materials.filter((material) => material.id !== id);
    setMaterials(removedMaterials);
  };

  const addMaterialForm = (type: InfoContentType) => {
    const newMaterial = {
      id: id,
      type,
      data: {},
    };
    setId((prev) => prev + 1);
    setMaterials((prevState: any) => [...prevState, newMaterial]);
  };
  const { t } = useTranslation();

  const renderMaterialInput = (type: InfoContentType, id: number) => {
    switch (type) {
      case InfoContentType.TEXT:
        return (
          <AddText
            id={id}
            handleRemove={handleRemove}
            handleSubmit={handleSubmit}
          />
        );
      case InfoContentType.VIDEO:
        return (
          <AddVideo
            id={id}
            handleRemove={handleRemove}
            handleSubmit={handleSubmit}
          />
        );
      case InfoContentType.IMG:
        return (
          <AddImage
            id={id}
            handleRemove={handleRemove}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <></>;
    }
  };

  const handleSave = async () => {
    if (materialTitle === "") {
      return;
    }
    const newArr = readyMaterials.map(({ id, ...rest }) => rest);
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/course/add-info-content`,
      {
        materials: newArr,
        material_title: materialTitle,
        theme_id: Number(themeId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  return (
    <AddMaterialStyled>
      <h2>{t("add.info.material.title")}</h2>
      <InputStyled
        value={materialTitle}
        onChange={(e) => setMaterialTitle(e.target.value)}
        placeholder={"Введите название материала"}
      />
      <Flex gap={16}>
        <Button
          text={t("add.info.material.text")}
          onClick={() => addMaterialForm(InfoContentType.TEXT)}
        />
        <Button
          text={t("add.info.material.video")}
          onClick={() => addMaterialForm(InfoContentType.VIDEO)}
        />
        <Button
          text={t("add.info.material.img")}
          onClick={() => addMaterialForm(InfoContentType.IMG)}
        />
        {readyMaterials.length ? (
          <>
            <Button
              text={t("add.info.material.remove_content")}
              onClick={() => {
                setMaterials([]);
                setReadyMaterials([]);
              }}
            />
            <Button
              onClick={handleSave}
              text={t("add.info.material.save_content")}
            />
          </>
        ) : null}
      </Flex>
      {materials.map((material, index) =>
        renderMaterialInput(material.type, material.id),
      )}
      {readyMaterials.map((material) => (
        <CurrentMaterialItem content={material} key={material.id} />
      ))}
    </AddMaterialStyled>
  );
};

export default AddMaterial;
