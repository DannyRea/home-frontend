import {
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
} from "@mui/material";
import { action, computed, makeObservable, observable } from "mobx";
import { inject, observer } from "mobx-react";
import { PureComponent } from "react";
import axios from "axios";

class CreateNoteDialog extends PureComponent {
  constructor(props) {
    super(props);
    makeObservable(this, {
      setClose: action,
      createNote: action,
    });
  }
  setClose = () => {
    const {
      postItStore: { setDialogOpen },
    } = this.props;
    setDialogOpen(false);
  };

  createNote = async () => {
    const {
      postItStore: {
        setDialogPostItTitle,
        setDialogPostItBody,
        dialogPostItTitle,
        dialogPostItBody,
        refresh,
      },
    } = this.props;

    const note = {
      cardTitle: dialogPostItTitle,
      cardBody: dialogPostItBody,
      removed: "1970-01-01",
      x: window.screen.width / 2,
      y: window.screen.height / 2,
    };

    await axios
      .post("http://localhost:8000/notes", note, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        setDialogPostItTitle("");
        setDialogPostItBody("");
        refresh();
      });
  };

  render() {
    const {
      postItStore: { dialogOpen, setDialogPostItBody, setDialogPostItTitle },
    } = this.props;
    return (
      <Dialog open={dialogOpen} onClose={this.setClose}>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            onChange={(e) => setDialogPostItTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Body"
            fullWidth
            variant="standard"
            onChange={(e) => setDialogPostItBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button onClick={() => this.createNote()}>Add</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default inject("postItStore")(observer(CreateNoteDialog));
