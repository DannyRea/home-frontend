import { makeAutoObservable, runInAction } from "mobx";
import { io } from "socket.io-client";

export default class ConnectionStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.socket = io("http://127.0.0.1:8000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    console.log("socket", this.socket);
    makeAutoObservable(this, {
      rootStore: false,
    });

    // this.socket.on("recipeDelete", (data) => {
    //   console.log("recipe data", data);
    //   runInAction(() => {
    //     this.rootStore.recipeStore.dbRecipes = data.data.sort((a, b) =>
    //       a.strMeal.localeCompare(b.strMeal)
    //     );
    //   });
    // });
  }
}
