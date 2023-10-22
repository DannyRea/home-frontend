import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { PureComponent } from "react";
import { inject, observer } from "mobx-react";

class CreateNoteButton extends PureComponent {
  render() {
    const {
      noteStore: { setDialogOpen },
    } = this.props;
    return (
      <>
        <Tooltip title={"Add note"}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setDialogOpen()}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </>
    );
  }
}
export default inject("noteStore")(observer(CreateNoteButton));
