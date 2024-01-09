import { TextField } from "@mui/material";


export default function NameFrom(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="standard-basic"
      label="お名前（必須）"
      variant="filled"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      {...register('name', {
        required: 'お名前を入力してください'
      })}
    />
  )
};