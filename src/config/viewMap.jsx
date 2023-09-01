import { NasaComponent } from "../views/components";
import { NoteViewContainer } from "../views/containers";
import RecipeContainer from "../views/Recipes/RecipeContainer";
import CalenderContainer from "../views/Calendar/CalenderContainer.";

export const viewMap = {
  Nasa: <NasaComponent />,
  PostItBoard: <NoteViewContainer />,
  Recipes: <RecipeContainer />,
  Calendar: <CalenderContainer />,
};
