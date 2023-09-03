import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PureComponent } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Grid } from "@mui/material";
import { Divider } from "@mui/material";
import CalenderEvents from "./CalendarEvents";

class CalendarComponent extends PureComponent {
  render() {
    console.log("hree");
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid
            sx={{
              width: window.width,
              justifyContent: "space-between !important",
            }}
          >
            <DateCalendar
              sx={{
                width: "100%",
                height: "100vh",
                justifyContent: "space-between !important",
              }}
              onChange={(props) => console.log("calender props", props)}
              // slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
        </LocalizationProvider>
        <Divider sx={{ width: window.width }} />
        <CalenderEvents />
      </>
    );
  }
}

export default CalendarComponent;
