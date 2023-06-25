import { PureComponent } from "react";

import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

import {
  Card,
  Button,
  Dialog,
  Box,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { inject, observer } from "mobx-react";
class NoteCard extends PureComponent {
  handleStop = (e, data) => {
    const {
      postItStore: { setCurrentNoteCoordinates },
      note,
    } = this.props;
    const xVal = e.x;
    const yVal = e.y;
    setCurrentNoteCoordinates({ x: xVal, y: yVal, ...note });
  };

  render() {
    const { note } = this.props;
    return (
      <Draggable onStop={this.handleStop} bounds={"parent"}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {note.cardTitle}
            </Typography>
            <Typography variant="h5" component="div">
              {note.cardBody}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2"></Typography>
          </CardContent>
        </Card>
      </Draggable>
    );
  }
}
export default inject("postItStore")(observer(NoteCard));
