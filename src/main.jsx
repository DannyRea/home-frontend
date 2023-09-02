import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Box from "@mui/material/Box";

import { RootStore } from "./stores/rootStore.js";
import { Provider } from "mobx-react";
import {
  browserHistory,
  RouterContext,
  HistoryAdapter,
} from "mobx-state-router";

import { viewMap } from "./config/viewMap.jsx";

const drawerWidth = 240;

const rootStore = new RootStore();

const routerStore = rootStore.routerStore;
const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
historyAdapter.observeRouterStateChanges();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider
      rootStore={rootStore}
      routerStore={routerStore}
      nasaStore={rootStore.nasaStore}
      postItStore={rootStore.postItStore}
      routerViewStore={rootStore.routerViewStore}
      recipeStore={rootStore.recipeStore}
      connectionStore={rootStore.connectionStore}
    >
      <RouterContext.Provider value={routerStore}>
        <App />
      </RouterContext.Provider>
    </Provider>
  </React.StrictMode>
);
