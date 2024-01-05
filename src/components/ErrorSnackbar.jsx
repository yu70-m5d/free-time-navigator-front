import { Alert, Snackbar } from "@mui/material";

export function ErrorSnackbar(props) {
  const { hasError, closeError } = props;

  return (
    <Snackbar
      open={hasError}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={closeError}
    >
      <Alert severity="error" onClose={closeError} >
        送信に失敗しました。
      </Alert>
    </Snackbar>
  );
};