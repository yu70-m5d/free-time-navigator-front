import { TextField } from "@mui/material";

export default function TitleForm(props) {
  const { register, errorMessage, defaultValue } = props;

  return (
    <TextField
      id="standard-basic"
      label="タイトル"
      variant="standard"
      error={errorMessage !== undefined}
      defaultValue={defaultValue}
      helperText={errorMessage || ' '}
      {...register('title', {
        required: 'タイトルを入力してください'
      })}
    />
  )
};