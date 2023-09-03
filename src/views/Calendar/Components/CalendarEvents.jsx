import { PureComponent } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
class CalenderEvents extends PureComponent {
  render() {
    return (
      <>
        <Grid
          sx={{
            width: window.width,
            p: 2.5,
            justifyContent: "space-between !important",
          }}
        >
          <Card raised sx={{ minHeight: 500 }}>
            <CardContent>
              test
              <Divider />
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }
}

export default CalenderEvents;
