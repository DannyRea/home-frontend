import { action, makeObservable, observable } from "mobx";
import { PureComponent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Tooltip } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { inject, observer } from "mobx-react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const style = { backgroundColor: "#fffff" };
class DBRecipeBrowseDialog extends PureComponent {
  bgColor = "background.paper";
  constructor(props) {
    super(props);
    makeObservable(this, {
      bgColor: observable,
      setBgColor: action,
    });
  }

  setBgColor = (props) => {
    console.log(props);
    const { type } = props;

    this.bgcolor =
      String(type) === "mouseenter" ? "#9aacb2" : "background.paper";
    console.log(this.bgcolor);
  };

  render() {
    const {
      open,
      recipeStore: {
        setDialogOpen,
        dbRecipes,
        setRandomRecipe,
        deleteDbRecipe,
      },
    } = this.props;
    return (
      <>
        <Dialog open={open} keepMounted>
          <DialogTitle>{"Browse Recipe"}</DialogTitle>
          <DialogContent>
            <List
              sx={{
                width: "100%",
              }}
            >
              {dbRecipes?.slice().map((recipe) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: "gray",
                    }}
                  >
                    <ListItem
                      sx={{
                        display: "flex",
                        bgcolor: "gray",
                      }}
                      onMouseEnter={this.setBgColor}
                      onMouseLeave={this.setBgColor}
                      onClick={() => setRandomRecipe(recipe)}
                    >
                      {recipe.strMeal}
                    </ListItem>
                    <Tooltip title={`Delete ${recipe.strMeal || "meal"}`}>
                      <span style={{ justifyContent: "center" }}>
                        <Button
                          onClick={async () => await deleteDbRecipe(recipe.id)}
                          variant="contained"
                          color="error"
                        >
                          <DeleteForeverIcon />
                        </Button>
                      </span>
                    </Tooltip>
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

export default inject("recipeStore")(observer(DBRecipeBrowseDialog));
