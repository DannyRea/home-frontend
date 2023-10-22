import Grid from "@mui/material/Grid";
import { PureComponent } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import CreateNoteButton from "./Buttons/CreateNoteButton";
import CreateNoteDialog from "./Dialogs/CreateNoteDialog";
class NotesContainer extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <CreateNoteButton />
        <Grid container sx={{ display: "inline-block" }}>
          <Card variant="outlined">
            <CardHeader sx={{ textAlign: "left" }} title={"yes"} />
            <CardContent>test</CardContent>
          </Card>
        </Grid>
        <CreateNoteDialog />
      </>
    );
  }
}

export default NotesContainer;
