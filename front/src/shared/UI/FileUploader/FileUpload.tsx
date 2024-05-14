import { LoadedImg, UploaderStyled, UploadImg } from "./FileUploader.styled";
import { MdOutlineFileUpload } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useToast from "../Toast/useToast";

type Props = {
  setValue: (value: any) => void;
  img?: string;
};

export const FileUpload = ({ setValue, img }: Props) => {
  const [inputFile, setInputFile] = useState(null);
  const [fileData, setFileData] = useState<any>(img || "");
  const openNotification = useToast();
  const handleInput = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type.slice(0, 5) !== "image" || file === "undefined") {
      openNotification({
        type: "error",
        message: "Ошибка при загрузке изображения",
        description: "Загрузите фото еще раз",
      });
      return;
    } else {
      setInputFile(file);
    }
  };

  useEffect(() => {
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileData(reader.result);
        setValue(reader.result);
      };
      reader.readAsDataURL(inputFile);
      openNotification({
        type: "success",
        message: "Изображение успешно загружено",
      });
    } else {
      setValue("");
    }
  }, [inputFile]);

  const resetUploadFile = () => {
    setInputFile(null);
    setFileData(null);
    setValue("empty");
  };
  return (
    <UploaderStyled>
      {!fileData || fileData === "empty" ? (
        <UploadImg>
          <MdOutlineFileUpload />
          <input onChange={(e) => handleInput(e)} type={"file"} />
        </UploadImg>
      ) : (
        <LoadedImg>
          <img src={fileData} alt="" />
          <IconButton onClick={resetUploadFile}>
            <CloseIcon fontSize={"small"} />
          </IconButton>
        </LoadedImg>
      )}
    </UploaderStyled>
  );
};
