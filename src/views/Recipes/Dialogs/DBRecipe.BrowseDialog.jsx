import { makeObservable } from "mobx";
import { PureComponent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { inject, observer } from "mobx-react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const style = { backgroundColor: "#fffff" };
class DBRecipeBrowseDialog extends PureComponent {
  constructor(props) {
    super(props);
    makeObservable(this, {});
  }

  render() {
    const {
      open,
      foodStore: { setDialogOpen, dbRecipes, setRandomRecipe },
    } = this.props;
    console.log(open);
    return (
      <>
        <Dialog open={open} keepMounted>
          <DialogTitle>{"Browse Recipe"}</DialogTitle>
          <DialogContent>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {dbRecipes?.slice().map((recipe) => {
                return (
                  <div style={{ ...style }}>
                    <ListItem
                      sx={{ bgcolor: "background.paper" }}
                      onClick={() => setRandomRecipe(recipe)}
                    >
                      {recipe.recipeName}
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setDialogOpen()}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default inject("foodStore")(observer(DBRecipeBrowseDialog));
