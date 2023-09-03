import { PureComponent } from "react";
import CalendarComponent from "./Components/CalendarComponent";
import CreateEventButton from "./Buttons";
import CreateEventDialog from "./Dialogs/CreateEventDialog";

class CalenderContainer extends PureComponent {
  render() {
    return (
      <>
        <div
          style={{ paddingTop: 15, display: "flex", justifyContent: "right" }}
        >
          <CreateEventButton />
        </div>
        <CalendarComponent />
        <CreateEventDialog />
      </>
    );
  }
}
export default CalenderContainer;
