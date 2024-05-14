import { MdOutlineSchool } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { LuTextCursorInput } from "react-icons/lu";
import { MaterialType } from "../../api/models";
import { FaFileAlt } from "react-icons/fa";

export const useMaterialIcon = () => {
  const setIcon = (type: MaterialType) => {
    switch (type) {
      case MaterialType.INFO:
        return <MdOutlineSchool />;
      case MaterialType.TEST:
        return <FiFileText />;
      case MaterialType.TASK:
        return <LuTextCursorInput />;
      case MaterialType.FILE:
        return <FaFileAlt style={{ width: 24, height: 24 }} />;
      default:
        return <MdOutlineSchool />;
    }
  };

  return { setIcon };
};
