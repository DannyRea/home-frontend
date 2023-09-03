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
class CreateEventDialog extends PureComponent {
  constructor(props) {
    super(props);
    makeObservable(this, {
      validateSubmit: computed,
    });
  }

  get validateSubmit() {
    const {
      calenderStore: { event },
    } = this.props;
    console.log(!!event);
    if (!!event) return true;
    return false;
  }

  render() {
    const {
      calenderStore: { open, setDialogOpen, setValue, newEvent },
    } = this.props;

    return (
      <>
        <Dialog open={open}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <span style={{ padding: 2 }}>
                <DatePicker
                  label="Date From"
                  onChange={(date) =>
                    setValue("eventDateStart", format(date, "yyyy-MM-dd"))
                  }
                />
              </span>
              <span style={{ padding: 2, paddingBottom: 5, paddingTop: 5 }}>
                <DatePicker
                  label="Date To"
                  onChange={(date) =>
                    setValue("eventDateEnd", format(date, "yyyy-MM-dd"))
                  }
                />
              </span>

              <div style={{ display: "flex" }}>
                <FormControlLabel control={<Switch />} label="All Day" />
              </div>
              <span style={{ padding: 2 }}>
                <MobileTimePicker
                  label="Time From"
                  onAccept={(time) => setValue("eventTimeStart", time)}
                />
                <MobileTimePicker
                  label="Time To"
                  onAccept={(time) => setValue("eventTimeEnd", time)}
                />
              </span>
            </LocalizationProvider>
            <div style={{ padding: 2 }}>
              <TextField
                variant="standard"
                onChange={(event) => setValue("eventTitle", event.target.value)}
                label="Title of Event"
                fullWidth
              />
            </div>
            <div style={{ padding: 2 }}>
              <TextField
                variant="standard"
                label="Body of Event"
                fullWidth
                multiline
                maxRows={2}
                onChange={(event) => setValue("eventBody", event.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              color="success"
              variant="contained"
              disabled={this.validateSubmit}
              onClick={() => {}}
            >
              Create
            </Button>
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

export default inject("calenderStore")(observer(CreateEventDialog));
