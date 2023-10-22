import { NasaComponent } from "../views/components";
import RecipeContainer from "../views/Recipes/RecipeContainer";
import CalenderContainer from "../views/Calendar/CalenderContainer.";
import NotesContainer from "../views/Notes/NotesContainer";

export const viewMap = {
  Nasa: <NasaComponent />,
  Notes: <NotesContainer />,
  Recipes: <RecipeContainer />,
  Calendar: <CalenderContainer />,
};
