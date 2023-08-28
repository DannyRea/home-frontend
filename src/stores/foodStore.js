import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export default class FoodStore {
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
    this.getDbRecipes();
  }

  getRandomRecipe = async () => {
    const recipeData = await axios.get("http://127.0.0.1:8000/random-recipe");
    runInAction(() => {
      this.recipe = recipeData.data.meals[0];
      console.log(this.recipe);
    });
  };

  getDbRecipes = async () => {
    const dbRecipes = await axios
      .get("http://127.0.0.1:8000/recipes")
      .then((result) => {
        if (result?.data) {
          runInAction(() => {
            this.dbRecipes = result.data;
            console.log(this.dbRecipes);
          });
        }
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
      runInAction(() => {
        this.isRefreshing = false;
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
