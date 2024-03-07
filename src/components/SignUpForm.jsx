import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import PasswordFrom from "./PasswordForm";
import EmailFrom from "./EmailForm";
import PasswordConfirmationFrom from "./PasswordConfirmationForm";


export default function SingUpForm(props) {
  const { onSubmit, isLoading } = props;
  const { handleSubmit, formState: { errors }, register } = useForm();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ maxWidth: 'sm', margin: 'auto', padding: 2, marginTop: 8 }}>
        <EmailFrom register={register} errorMessage={errors.email?.message} />
        <PasswordFrom register={register} errorMessage={errors.password?.message} />
        <PasswordConfirmationFrom register={register} errorMessage={errors.password_confirmation?.message} />

        <Box textAlign='center' >
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            { !isLoading ? '登録' : '登録中' }
          </Button>
        </Box>
      </Stack>

    </form>
  )
}