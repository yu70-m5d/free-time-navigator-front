import { TextField } from "@mui/material";

export default function EmailFrom(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="standard-basic"
      label="メールアドレス（必須）"
      variant="filled"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      {...register('email', {
        required: 'メールアドレスを入力してください'
      })}
    />
  )
};