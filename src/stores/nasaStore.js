import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export default class {
  apodImage = null;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });
  }
  getApod = async () => {
    await axios.get("http://127.0.0.1:8000/apod").then((result) => {
      runInAction(() => {
        this.apodImage = result.data;
      });
    });
  };
}
