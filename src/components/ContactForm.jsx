import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import EmailFrom from "./EmailForm";
import NameFrom from "./NameForm";
import MessageFrom from "./MessageForm";
import SubjectFrom from "./SubjectForm";

export default function ContactForm(props) {

  const { onSubmit, isLoading } = props;
  const { handleSubmit, formState: { errors }, register } = useForm();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ maxWidth: 'sm', margin: 'auto', padding: 2 }}>
        <NameFrom register={register} errorMessage={errors.name?.message} label={"お名前（必須）"} />
        <EmailFrom register={register} errorMessage={errors.email?.message} />
        <SubjectFrom register={register} errorMessage={errors.subject?.message} />
        <MessageFrom register={register} errorMessage={errors.message?.message} />
        <Box textAlign='center' >
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            { !isLoading ? '送信' : '送信中' }
          </Button>
        </Box>
      </Stack>

    </form>
  )
};