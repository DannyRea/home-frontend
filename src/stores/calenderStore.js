import { makeAutoObservable } from "mobx";
import axios from "axios";
export default class CalenderStore {
  open = false;
  event = {};
  dbData = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.socket = this.rootStore.connectionStore.socket;
    makeAutoObservable(this, {
      rootStore: false,
    });

    this.socket.on("eventEntities", (data) => {
      this.dbData = [...data.data];
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

  createEvent = async () => {
    console.log(this.event);
    await axios.post(`http://127.0.0.1:8000/event`, this.event).then(() => {});
  };

  get entities() {
    return [...this.dbData.slice()] || [];
  }
}
