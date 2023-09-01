import { PureComponent } from "react";
import Button from "@mui/material/Button";

import FindInPageIcon from "@mui/icons-material/FindInPage";
import { action, makeObservable, observable } from "mobx";
import DBRecipeBrowseDialog from "../Dialogs/DBRecipe.BrowseDialog";
import { inject, observer } from "mobx-react";

class DBRecipeDialogButton extends PureComponent {
  render() {
    const {
      recipeStore: { dialogOpen, setDialogOpen },
    } = this.props;
    return (
      <>
        <Button
          variant="contained"
          size="large"
          title="Lookup recipe"
          onClick={() => setDialogOpen()}
        >
          <FindInPageIcon />
        </Button>
        {dialogOpen === true ? (
          <DBRecipeBrowseDialog open={true} />
        ) : (
          <DBRecipeBrowseDialog open={false} />
        )}
      </>
    );
  }
}

export default inject("recipeStore")(observer(DBRecipeDialogButton));
