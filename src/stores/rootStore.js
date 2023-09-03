import { MobxRouter } from "mobx-router";
import { RouterStore, createRouterState } from "mobx-state-router";
import NasaStore from "./nasaStore";
import PostItStore from "./postItStore";
import RouterViewStore from "./routerViewStore";
import RecipeStore from "./recipeStore";
import ConnectionStore from "./connectionStore";
import CalenderStore from "./calenderStore";
import routes from "../config/routes";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8000", {
  transports: ["websocket", "polling", "flashsocket"],
});
export class RootStore {
  constructor() {
    const notFound = createRouterState("notFound");
    this.routerStore = new RouterStore(routes, notFound, { rootStore: this });
    this.connectionStore = new ConnectionStore(this, socket);
    this.nasaStore = new NasaStore(this);
    this.postItStore = new PostItStore(this);
    this.routerViewStore = new RouterViewStore(this);
    this.recipeStore = new RecipeStore(this);
    this.calenderStore = new CalenderStore(this);
  }
}
