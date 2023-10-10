import {Alert, Button, IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type NotificationTypeProps = {
  handleCloseSnackBar: () => void;
  message: string,
  openSnackBar: boolean
}
const action = (handleClose: () => void) => (
  <>
    <Button color="secondary" size="small" onClick={handleClose}>
      UNDO
    </Button>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </>
);
export const NotificationError = ({handleCloseSnackBar, message, openSnackBar}: NotificationTypeProps) => {

  return (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={5000}
      onClose={handleCloseSnackBar}
      action={action(handleCloseSnackBar)}
    >
      <Alert onClose={handleCloseSnackBar} severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}