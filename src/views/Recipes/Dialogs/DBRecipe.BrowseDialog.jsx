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
    const { type } = props;

    this.bgcolor =
      String(type) === "mouseenter" ? "#9aacb2" : "background.paper";
  };
  //TODO: Add option to restore recipes if accidently deleted
  render() {
    const {
      open,
      recipeStore: { setDialogOpen, entities, setRandomRecipe, deleteDbRecipe },
      notificationStore: { addNotification },
    } = this.props;
    return (
      <>
        <Dialog open={open} keepMounted>
          <DialogTitle>{"Browse Recipe"}</DialogTitle>
          <DialogContent>
            {entities && entities.length ? (
              <List
                sx={{
                  width: "100%",
                }}
              >
                {entities?.slice().map((recipe) => {
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
                            onClick={async () => {
                              try {
                                await deleteDbRecipe(recipe.id).then(() => {
                                  addNotification(
                                    `${
                                      recipe.strMeal || "Recipe"
                                    } has been deleted.`,
                                    { variant: "success" }
                                  );
                                });
                              } catch {
                                addNotification(
                                  `${
                                    recipe.strMeal || Recipe
                                  } couldn't be deleted. `,
                                  { variant: "error" }
                                );
                              }
                            }}
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
            ) : (
              <>No recipes</>
            )}
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

export default inject(
  "recipeStore",
  "notificationStore"
)(observer(DBRecipeBrowseDialog));
