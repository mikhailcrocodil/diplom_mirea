import { Flex } from "antd";
import { MdOutlineSchool } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { LuTextCursorInput } from "react-icons/lu";
import { ReactNode } from "react";
import { AddModalItem } from "./AddModalItem";
import { RoutePath } from "../../../../app/routing/libs/routePaths";
import { FaFileAlt } from "react-icons/fa";
import { Translation, useTranslation } from "react-i18next";

export type ModalItemProps = {
  icon: ReactNode;
  text: any;
  toLink?: string;
  type?: string;
  onClick?: () => void;
  isLink?: boolean;
};

const ModalItems: ModalItemProps[] = [
  {
    icon: <MdOutlineSchool />,
    text: <Translation>{(t) => t("add.material.items.info")}</Translation>,
    toLink: `${RoutePath.add}/${RoutePath.add_material}`,
  },
  {
    icon: <FiFileText />,
    text: <Translation>{(t) => t("add.material.items.test")}</Translation>,
    toLink: `${RoutePath.add}/${RoutePath.add_test}`,
  },
  {
    icon: <LuTextCursorInput />,
    text: <Translation>{(t) => t("add.material.items.task")}</Translation>,
    toLink: `${RoutePath.add}/${RoutePath.add_task}`,
  },
];

export const AddMaterialModal = () => {
  return (
    <Flex align={"center"} justify={"center"} gap={32} wrap={"wrap"}>
      {ModalItems.map((item) => (
        <AddModalItem
          toLink={item.toLink}
          icon={item.icon}
          text={item.text}
          key={item.text}
        />
      ))}
    </Flex>
  );
};
