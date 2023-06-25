import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export default class FoodStore {
  recipe = {};
  isRefreshing = false;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });

    this.refresh();
  }

  getRandomRecipe = async () => {
    const recipeData = await axios.get("http://127.0.0.1:8000/random-recipe");
    runInAction(() => {
      this.recipe = recipeData.data.meals[0];
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

    return Object.entries(this.recipe)
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
  }
}
