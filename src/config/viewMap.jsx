import { NasaComponent } from "../views/components";
import { NoteViewContainer } from "../views/containers";
import RecipeContainer from "../views/Recipes/RecipeContainer";

export const viewMap = {
  Nasa: <NasaComponent />,
  PostItBoard: <NoteViewContainer />,
  Recipes: <RecipeContainer />,
};
