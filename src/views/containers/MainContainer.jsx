import { PureComponent } from "react";
import Box from "@mui/material/Box";
import Container from "@material-ui/core/Container";
import AppDrawerContainer from "./AppDrawerContainer";
class MainContainer extends PureComponent {
  render() {
    return (
      <>
        <AppDrawerContainer />
      </>
    );
  }
}
export default MainContainer;
