import { makeAutoObservable } from "mobx";

export default class CalenderStore {
  open = false;
  event = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });
  }

  setDialogOpen = () => {
    this.open = !this.open;
  };

  newEvent = () => {
    this.event = {};
  };

  setValue = (key, value) => {
    this.event[key] = value;
  };
}
