import { makeAutoObservable } from "mobx";
import { io } from "socket.io-client";

export default class ConnectionStore {
  constructor(rootStore, socket) {
    this.rootStore = rootStore;
    this.socket = socket;
    console.log(this.socket);
    makeAutoObservable(this, {
      rootStore: false,
    });

    this.socket.on("recipes", (data) => {
      console.log("recipe data", data);
    });
  }
}
