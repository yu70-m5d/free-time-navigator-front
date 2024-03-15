import { TextField } from "@mui/material";

export default function TitleForm(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="standard-basic"
      label="タイトル"
      variant="standard"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      {...register('title', {
        required: 'タイトルを入力してください'
      })}
    />
  )
};