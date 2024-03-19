import { TextField } from "@mui/material";


export default function NameFrom(props) {
  const { register, errorMessage, label, defaultValue, optional } = props;

  return (
    <TextField
      id="standard-basic"
      label={label}
      variant="filled"
      defaultValue={defaultValue}
      error={errorMessage !== undefined}
      helperText={!optional && (errorMessage || ' ')}
      {...register('name', {
        required: !optional && 'お名前を入力してください'
      })}
    />
  )
};