import React, { PureComponent } from "react";
import Typography from "@mui/material/Typography";

import { inject, observer } from "mobx-react";
class NasaComponent extends PureComponent {
  render() {
    const {
      nasaStore: { apodImage },
    } = this.props;
    return (
      <span>
        <h1>APOD</h1>
        <img src={apodImage?.url} width={250} height={250} alt="" />
        <Typography paragraph>
          {" "}
          {apodImage?.explanation || "NO DATA AVAILABLE"}
        </Typography>
        <h1>Mars Rover Images</h1>
      </span>
    );
  }
}
export default inject("nasaStore")(observer(NasaComponent));
