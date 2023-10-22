import { makeAutoObservable } from "mobx";
import axios from "axios";

export default class NoteStore {
  dialogOpen = false;
  note = {};
  notes = [];
  dbData;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.socket = rootStore.connectionStore.socket;
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.socket.on("noteEntities", (data) => {
      console.log("recalculatring dbData");
      runInAction(() => {
        this.dbData = [...data.data];
      });
    });
  }

  setDialogOpen = () => {
    this.dialogOpen = !this.dialogOpen;
  };
  setValue = (key, value) => {
    this.note[key] = value;
    console.log(this.note[key]);
  };

  refreshNotes = async () => {
    await axios.get(`http://127.0.0.1:8000/notes`).then((result) => {
      if (result && result?.data) {
        runInAction(() => {
          this.notes = result.data;
        });
      }
    });
  };
  get entities() {
    return [...this.dbData.slice()] || [];
  }
}
