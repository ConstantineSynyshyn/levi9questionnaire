import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useRouter } from "next/router";

import { ROUTES } from "@constants/routes";

const menuItems = [
  {
    IconComponent: PeopleIcon,
    path: ROUTES.USERS,
    text: "User overview",
  },
  {
    IconComponent: CloudUploadIcon,
    path: ROUTES.UPLOAD_QUESTIONS,
    text: "Upload questions",
  },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const route = useRouter();

  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${classes.drawerClose}`}
      classes={{
        paper: classes.drawerClose,
      }}
    >
      <div className={classes.toolbar}></div>
      <List>
        {menuItems.map(({ IconComponent, path, text }, index) => (
          <ListItem button key={index} onClick={() => route.push(path)}>
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
