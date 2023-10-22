import { PureComponent } from "react";
import dayjs from "dayjs";
import format from "date-fns/format";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { inject, observer } from "mobx-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MobileTimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { computed, makeObservable } from "mobx";
class CreateNoteDialog extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      noteStore: { dialogOpen, setDialogOpen, setValue },
    } = this.props;

    return (
      <>
        <Dialog fullWidth open={dialogOpen}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <div style={{ padding: 2 }}></div>
            <div style={{ padding: 2 }}>
              <TextField
                label={"Title of Note"}
                fullWidth
                onChange={(event) => setValue("noteTitle", event.target.value)}
              />
            </div>
            <div style={{ padding: 2 }}>
              <TextField
                label={"Note Body"}
                multiline
                fullWidth
                rows={3}
                onChange={(event) => setValue("noteBody", event.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                newEvent();
                setDialogOpen();
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default inject("noteStore")(observer(CreateNoteDialog));
