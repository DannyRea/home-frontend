import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
class PostItStore {
  users = [];
  notes = [];
  currentNoteCoordinates = [];
  currentChanges = [];
  dialogOpen = false;
  dialogPostItTitle = "";
  dialogPostItBody = "";
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });

    this.refreshUsers();
    this.refreshNotes();
  }
  refreshUsers = async () => {
    const apiUrl = "http://localhost:8000/users";
    await axios.get(apiUrl).then((results) => {
      this.users = results.data;
    });
  };
  refreshNotes = async () => {
    const apiUrl = "http://localhost:8000/notes";
    await axios.get(apiUrl).then((results) => {
      runInAction(() => {
        this.notes = results.data;
      });
    });
  };
  setDialogOpen = (open) => {
    this.dialogOpen = open;
  };

  setDialogPostItTitle = (title) => {
    this.dialogPostItTitle = title;
  };
  setDialogPostItBody = (body) => {
    this.dialogPostItBody = body;
  };
  setCurrentNoteCoordinates = (newNote) => {
    let foundNote = this.currentNoteCoordinates.find((note) => {
      return note.id === newNote.id;
    });
    if (foundNote) {
      const modifiedNote = Object.assign(foundNote, {
        x: newNote.x,
        y: newNote.y,
      });
      runInAction(() => {
        this.currentNoteCoordinates.splice(
          this.currentNoteCoordinates.indexOf(foundNote),
          1
        );
        this.currentNoteCoordinates.push(modifiedNote);
        this.currentChanges.push(modifiedNote);
      });
    } else {
      runInAction(() => {
        this.currentNoteCoordinates.push(newNote);
      });
    }
  };
  refresh = () => {
    this.refreshNotes();
  };

  applyChanges = async () => {
    Promise.all(
      this.currentChanges.map(async (note) => {
        await axios.patch(`http://localhost:8000/notes/${note.id}`, note);
      })
    )
      .then((result) => {
        runInAction(() => {
          this.currentChanges = [];
        });
      })
      .catch((err) => console.log("err", err));
  };
}

export default PostItStore;
