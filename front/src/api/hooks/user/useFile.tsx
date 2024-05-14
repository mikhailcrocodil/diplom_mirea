import React, { useState } from "react";
import axios from "axios";
import { useUploadFile } from "../files/useUploadFile";

function FileUpload() {
  const [file, setFile] = useState<React.ChangeEvent<HTMLInputElement> | null>(
    null,
  );
  const [uploadStatus, setUploadStatus] = useState("");
  const { uploadFileMutation } = useUploadFile();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append("file", file);
    console.log(formData);
    uploadFileMutation({ file: formData });
  };

  return (
    <div>
      <h2>Загрузка файла</h2>
      <input type="file" onChange={(e) => handleFileChange(e)} />
      <button onClick={handleUpload}>Загрузить файл</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
export default FileUpload;
