import React, { FormEvent, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { FormStyled, InputStyled } from "./HeaderSearch.styled";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search.trim());
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("inputs.search")}
      />
      <button type={"submit"}>
        <SearchOutlined />
      </button>
    </FormStyled>
  );
};

export default HeaderSearch;
