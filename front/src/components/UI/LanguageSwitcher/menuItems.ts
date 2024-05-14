import ru from "../../../utils/icons/flags/ru.svg";
import ch from "../../../utils/icons/flags/ch.svg";
import uz from "../../../utils/icons/flags/uz.svg";
import tj from "../../../utils/icons/flags/tj.svg";
import uk from "../../../utils/icons/flags/uk.svg";
import kz from "../../../utils/icons/flags/kz.svg";

export type Props = {
  label: string;
  value: string;
  src: string;
};

export const MenuItems: Props[] = [
  {
    label: "Русский",
    value: "ru",
    src: ru,
  },
  {
    label: "Английский",
    value: "en",
    src: uk,
  },
  {
    label: "Узбекский",
    value: "uzb",
    src: uz,
  },
  {
    label: "Таджикский",
    value: "tj",
    src: tj,
  },
  {
    label: "Казахский",
    value: "kz",
    src: kz,
  },
  {
    label: "Китай",
    value: "ch",
    src: ch,
  },
];
