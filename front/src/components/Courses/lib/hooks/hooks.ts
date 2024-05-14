import { useEffect, useState } from "react";

export const useColorTasks = (completed: number, all: number) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    const setCardColor = () => {
      const percent = (completed / all) * 100;
      if (percent < 50) setColor("#D61A0E");
      if (percent > 50 && percent < 100) setColor("#EEA10B");
      if (percent === 100) setColor("#22AB59");
    };
    setCardColor();
  }, []);
  return { color };
};
