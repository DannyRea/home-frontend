import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export default class RecipeStore {
  recipe = {};
  dbRecipes = [];
  isRefreshing = false;
  dialogOpen = false;
  dbData = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.socket = this.rootStore.connectionStore.socket;
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.socket.on("recipeEntities", (data) => {
      console.log("recalculatring dbData");
      runInAction(() => {
        this.dbData = [...data.data];
      });
    });
  }

  getRandomRecipe = async () => {
    const recipeData = await axios.get("http://127.0.0.1:8000/random-recipe");
    runInAction(() => {
      this.recipe = recipeData.data.meals[0];
    });
  };

  refreshDbRecipes = async () => {
    await axios.get("http://127.0.0.1:8000/recipes").then((result) => {
      if (result?.data) {
        runInAction(() => {
          this.dbData = [
            ...this.dbData,
            ...result.data
              .slice()
              .sort((a, b) => a.strMeal.localeCompare(b.strMeal)),
          ];
        });
      }
    });
  };

  deleteDbRecipe = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/recipes/${id}`);
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

  get entities() {
    return [...this.dbData.slice()] || [];
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
