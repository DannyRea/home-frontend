import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { PureComponent } from "react";
import { inject, observer } from "mobx-react";

class CreateEventButton extends PureComponent {
  render() {
    const {
      calenderStore: { setDialogOpen },
    } = this.props;
    return (
      <>
        <Tooltip title={"Add event"}>
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
export default inject("calenderStore")(observer(CreateEventButton));
