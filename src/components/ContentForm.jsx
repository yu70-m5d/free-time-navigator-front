import { TextField } from "@mui/material";


export default function ContentForm(props) {
  const { register, errorMessage } = props;

  return (
    <TextField
      id="filled-multiline-static"
      label="メモ"
      multiline
      rows={10}
      defaultValue="Default Value"
      variant="filled"
      error={errorMessage !== undefined}
      helperText={errorMessage || ' '}
      style={{ width: '100%' }}
      {...register('content')}
    />
  )
}