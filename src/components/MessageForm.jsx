import { TextField } from "@mui/material";


export default function MessageFrom(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="standard-basic"
      multiline
      rows={6}
      label="お問い合わせ内容（必須）"
      variant="filled"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      {...register('message', {
        required: 'お問い合わせ内容を入力してください'
      })}
    />
  )
};