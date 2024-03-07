import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import PasswordFrom from "./PasswordForm";
import EmailFrom from "./EmailForm";
import PasswordConfirmationFrom from "./PasswordConfirmationForm";


export default function SignInForm(props) {
  const { onSubmit, isLoading } = props;
  const { handleSubmit, formState: { errors }, register } = useForm();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ maxWidth: 'sm', margin: 'auto', padding: 2, marginTop: 8 }}>
        <EmailFrom register={register} errorMessage={errors.email?.message} />
        <PasswordFrom register={register} errorMessage={errors.password?.message} />

        <Box textAlign='center' >
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            { !isLoading ? 'ログイン' : 'ログイン中' }
          </Button>
        </Box>
      </Stack>
    </form>
  )
}