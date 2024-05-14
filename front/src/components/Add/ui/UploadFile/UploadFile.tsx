import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../api/config/config";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ButtonComponent } from "../../../UI/Button/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Flex } from "antd";
import { InputStyled } from "../AddMaterial/AddMaterial.styled";
import { AuthErrorStyled } from "../../../Authorization/ui/AuthForm.styled";
import { useBackToCourse } from "../../../../shared/hooks/useBackToCourse";
import { useTranslation } from "react-i18next";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function UploadFile() {
  const course_id = localStorage.getItem("course");
  const { backToCourse } = useBackToCourse();
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const themeId = localStorage.getItem("themeId");
  const { t } = useTranslation();

  useEffect(() => {
    if (name !== "") {
      setMsg("");
    }
  }, [name]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (name === "") {
      setMsg(t("validation.name_file"));
      return;
    }
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (file && themeId) {
      formData.append("file", file);
      formData.append("_name", name);
      formData.append("themeId", themeId);
      try {
        const response = await axios.post(
          `${BASE_URL}/files/upload-file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (course_id) {
          backToCourse(course_id, t("toasts.file.add_file_scs"));
        }
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t("add.file.title")}</h2>
      <Flex vertical align={"center"} gap={16}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {t("add.file.upload")}
          <VisuallyHiddenInput
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
          />
        </Button>
        {file && (
          <span style={{ fontSize: 16 }}>
            {t("common.file")} {file.name} {t("add.file.is_upload")}
          </span>
        )}
        <InputStyled
          onChange={(e) => setName(e.target.value)}
          placeholder={t("add.file.file_name")}
        />
        {msg && <AuthErrorStyled>{msg}</AuthErrorStyled>}
        <ButtonComponent text={t("buttons.send")} type={"submit"} />
      </Flex>
    </form>
  );
}

export default UploadFile;
