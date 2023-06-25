import { PureComponent } from "react";
import "./App.css";
import { MainContainer } from "./views/containers";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <MainContainer />
      </>
    );
  }
}

export default App;
