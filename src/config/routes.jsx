import React from "react";

//models
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const routes = [
  { name: "Nasa", pattern: "/nasa", icon: <RocketLaunchIcon /> },
  { name: "Post-It Board", pattern: "/post-it-board", icon: <NoteAltIcon /> },
  { name: "Recipes", pattern: "/recipes", icon: <DinnerDiningIcon /> },
  { name: "Calendar", pattern: "/calendar", icon: <CalendarMonthIcon /> },
  {
    name: "notFound",
    pattern: "/not-found",
  },
];

export default routes;
