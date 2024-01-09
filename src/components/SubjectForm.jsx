import { TextField } from "@mui/material";

export default function SubjectFrom(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="standard-basic"
      label="件名（必須）"
      variant="filled"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      {...register('subject', {
        required: '件名を入力してください'
      })}
    />
  )
};