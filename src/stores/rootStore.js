import { MobxRouter } from "mobx-router";
import { RouterStore, createRouterState } from "mobx-state-router";
import NasaStore from "./nasaStore";
import PostItStore from "./postItStore";
import RouterViewStore from "./routerViewStore";
import FoodStore from "./foodStore";
import routes from "../config/routes";
export class RootStore {
  constructor() {
    const notFound = createRouterState("notFound");
    this.routerStore = new RouterStore(routes, notFound);
    this.nasaStore = new NasaStore(this);
    this.postItStore = new PostItStore(this);
    this.routerViewStore = new RouterViewStore(this);
    this.foodStore = new FoodStore(this);
  }
}
