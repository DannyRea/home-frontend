import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export default class RecipeStore {
  recipe = {};
  dbRecipes = [];
  isRefreshing = false;
  dialogOpen = false;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });

    this.refresh();
    this.refreshDbRecipes();
  }

  getRandomRecipe = async () => {
    const recipeData = await axios.get("http://127.0.0.1:8000/random-recipe");
    runInAction(() => {
      this.recipe = recipeData.data.meals[0];
    });
  };

  refreshDbRecipes = async () => {
    const dbRecipes = await axios
      .get("http://127.0.0.1:8000/recipes/")
      .then((result) => {
        if (result?.data) {
          runInAction(() => {
            this.dbRecipes = result.data.sort((a, b) =>
              a.strMeal.localeCompare(b.strMeal)
            );
          });
        }
      });
  };

  deleteDbRecipe = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/recipes/${id}`)
      .then(async (result) => {
        await this.refreshDbRecipes();
      });
  };

  setDialogOpen = () => {
    this.dialogOpen = !this.dialogOpen;
  };

  setRandomRecipe = (recipe) => {
    runInAction(() => {
      this.recipe = recipe;
    });
  };

  refresh = async () => {
    runInAction(() => {
      this.isRefreshing = true;
    });
    await this.getRandomRecipe().then(() => {
      runInAction(async () => {
        this.isRefreshing = false;
        await this.refreshDbRecipes();
      });
    });
  };
  get randomRecipe() {
    return this.recipe;
  }

  get ingredientsAndMeasurements() {
    if (!Object.keys(this.recipe)) return {};
    console.log(this.recipe);
    const measurements = Object.keys(this.recipe)
      .slice()
      .map((recipe, index) => {
        if (this.recipe[`strIngredient${index + 1}`]) {
          return {
            [`strIngredient${index + 1}`]:
              this.recipe[`strIngredient${index + 1}`],
            [`strMeasure${index + 1}`]: this.recipe[`strMeasure${index + 1}`],
          };
        }
      })
      .filter((value) => value);
    return measurements;
  }
}
