import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
const ariaLabel = { "aria-label": "description" };

//chatting componenet
const Chatting = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Input placeholder="Message" inputProps={ariaLabel} />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ backgroundColor: "#1c2536" }}
      >
        Send
      </Button>
    </Stack>
  );
};

export default Chatting;
