import { TextField } from "@mui/material";

export default function PasswordConfirmationFrom(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="standard-basic"
      label="パスワード確認"
      variant="filled"
      type="password"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      {...register('password_confirmation', {
        required: 'パスワードを入力してください'
      })}
    />
  )
};