import { TextField } from "@mui/material";

export default function PasswordFrom(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="standard-basic"
      label="パスワード"
      variant="filled"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      {...register('password', {
        required: 'パスワードを入力してください'
      })}
    />
  )
};