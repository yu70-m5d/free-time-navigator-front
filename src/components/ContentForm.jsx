import { TextField } from "@mui/material";


export default function ContentForm(props) {
  const { register, errorMessage, defaultValue } = props;

  return (
    <TextField
      id="filled-multiline-static"
      label={defaultValue ? '' : "メモ"}
      multiline
      rows={10}
      variant="filled"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      style={{ width: '100%' }}
      defaultValue={defaultValue}
      {...register('content')}
    />
  )
}