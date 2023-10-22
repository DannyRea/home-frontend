import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { inject, observer } from "mobx-react";
import { computed, makeObservable, action, observable } from "mobx";
import { viewMap } from "../../config/viewMap";
import { RouterView } from "mobx-state-router";
import { Container } from "@mui/material";
const drawerWidth = 240;

class AppDrawerContainer extends React.PureComponent {
  mobileOpen = false;

  constructor(props) {
    super(props);

    makeObservable(this, {
      mobileOpen: observable,
      handleDrawerToggle: action,
      actualRoutes: computed,
    });
  }

  container = window !== undefined ? () => window.document.body : undefined;
  handleDrawerToggle = () => {
    this.mobileOpen = !this.mobileOpen;
  };

  get actualRoutes() {
    const {
      routerStore: { routes },
    } = this.props;
    return routes.slice().filter((route) => {
      return route.name !== "notFound" && route.name !== "__initial__";
    });
  }

  render() {
    const {
      routerViewStore: { currentRoute },
    } = this.props;

    return (
      <>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => this.handleDrawerToggle()}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {currentRoute}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <div>
              <Toolbar />
              <Divider />
              <List>
                {this.actualRoutes?.map((route, index) => (
                  <ListItem key={route.name} disablePadding>
                    <ListItemButton
                      onClick={async () =>
                        await this.props.routerStore.goTo(route.name)
                      }
                    >
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </Box>

        <Box
          sx={{
            p: 10,
            minHeight: window.height,
            ml: { sm: `${drawerWidth / 2}px` },
          }}
        >
          <RouterView viewMap={viewMap} />
        </Box>
      </>
    );
  }
}

export default inject(
  "routerStore",
  "routerViewStore"
)(observer(AppDrawerContainer));
