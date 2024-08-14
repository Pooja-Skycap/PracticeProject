import {
  Controller,
  FieldValues,
  UseControllerProps,
  TextField,
  FormControl,
  Path,
  FieldError,
} from "../../utils/commonImports";
interface TextFieldInputProps<T extends FieldValues> {
  name: Path<T>;
  control: UseControllerProps<T>["control"];
  label: string;
  type?: string;
  errors?: Partial<Record<Path<T>, FieldError>>;
}

const TextFieldInput = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  errors,
}: TextFieldInputProps<T>) => {
  return (
    <FormControl fullWidth margin="normal" error={!!errors?.[name]}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant="outlined"
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
          />
        )}
      />
    </FormControl>
  );
};

export default TextFieldInput;
