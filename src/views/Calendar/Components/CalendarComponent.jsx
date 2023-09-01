import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PureComponent } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";

class CalendarComponent extends PureComponent {
  render() {
    console.log("hree");
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              justifyContent: "space-between !important",
            }}
          >
            <DateCalendar
              sx={{
                width: "100%",
                height: "100vh",
                justifyContent: "space-between !important",
              }}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <Divider sx={{ width: "100%" }} />
          </Box>
        </LocalizationProvider>
      </>
    );
  }
}

export default CalendarComponent;
