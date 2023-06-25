import { makeAutoObservable } from "mobx";

export default class RouterViewStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });
  }

  get currentRoute() {
    return this.rootStore?.routerStore?.routerState?.routeName;
  }
}
