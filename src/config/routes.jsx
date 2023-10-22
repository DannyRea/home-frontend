import React from "react";

//models
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const routes = [
  {
    name: "Nasa",
    pattern: "/nasa",
    icon: <RocketLaunchIcon />,
    beforeEnter: async (fromState, toState, routerStore) => {
      const {
        rootStore: {
          nasaStore: { getApod },
        },
      } = routerStore.options;
      await getApod();
    },
  },
  {
    name: "Notes",
    pattern: "/notes",
    icon: <NoteAltIcon />,
  },
  {
    name: "Recipes",
    pattern: "/recipes",
    icon: <DinnerDiningIcon />,
    beforeEnter: async (fromState, toState, routerStore) => {
      const {
        rootStore: {
          recipeStore: { refresh, refreshDbRecipes },
        },
      } = routerStore.options;
      await refresh();
      await refreshDbRecipes();
    },
  },
  { name: "Calendar", pattern: "/calendar", icon: <CalendarMonthIcon /> },
  {
    name: "notFound",
    pattern: "/not-found",
  },
];

export default routes;
