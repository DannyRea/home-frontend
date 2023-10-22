import { MobxRouter } from "mobx-router";
import { RouterStore, createRouterState } from "mobx-state-router";
import NasaStore from "./nasaStore";
import RouterViewStore from "./routerViewStore";
import RecipeStore from "./recipeStore";
import ConnectionStore from "./connectionStore";
import CalenderStore from "./calenderStore";
import NoteStore from "./noteStore";
import NotificationStore from "./notificationStore";
import routes from "../config/routes";

export class RootStore {
  constructor() {
    const notFound = createRouterState("notFound");

    this.routerStore = new RouterStore(routes, notFound, { rootStore: this });
    this.notificationStore = new NotificationStore(this);
    this.connectionStore = new ConnectionStore(this);
    this.nasaStore = new NasaStore(this);
    this.routerViewStore = new RouterViewStore(this);
    this.recipeStore = new RecipeStore(this);
    this.calenderStore = new CalenderStore(this);
    this.noteStore = new NoteStore(this);
  }
}
