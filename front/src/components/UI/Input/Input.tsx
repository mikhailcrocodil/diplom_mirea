import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { InputStyled } from "./Input.styled";
import { useTheme } from "../../../utils/theme";

interface IInputProps<TFieldValues extends FieldValues>
  extends TextFieldProps<"outlined"> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  type: string;
  label: string;
  isRequired?: boolean;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
}

export const Input = <TFieldValues extends FieldValues>({
  control,
  name,
  type,
  isRequired = false,
  defaultValue,
  label,
}: IInputProps<TFieldValues>) => {
  const { theme } = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error: fieldError } }) => (
        <InputStyled
          {...field}
          theme={theme}
          fullWidth
          type={type}
          required={isRequired}
          label={label}
          error={!!fieldError}
          helperText={fieldError ? fieldError.message : null}
          variant="outlined"
        />
      )}
    />
  );
};
