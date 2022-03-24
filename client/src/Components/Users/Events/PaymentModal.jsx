import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PaymentModal = ({ open, handleClose, amount }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Please enter payment details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>Payment form</Box>
        <Button variant="contained" sx={{ color: "white", textTransform: "none" }}>Pay ${amount}</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
