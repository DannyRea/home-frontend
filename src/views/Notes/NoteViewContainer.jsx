import { Grid } from "@mui/material";
import { inject, observer } from "mobx-react";
import { PureComponent } from "react";
import { NoteCard } from "../components";
import Box from "@mui/material/Box";
import Container from "@material-ui/core/Container";
import Button from "@mui/material/Button";

class NoteViewContainer extends PureComponent {
  render() {
    const {
      postItStore: { notes },
    } = this.props;

    return (
      <Box item xs={12} style={{ display: "flex", padding: 100 }}>
        {notes.map((note) => {
          return <NoteCard note={note} />;
        })}
      </Box>
    );
  }
}
export default inject("postItStore")(observer(NoteViewContainer));
