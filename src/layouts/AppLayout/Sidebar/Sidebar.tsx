import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useRouter } from "next/router";

import { ROUTES } from "@constants/routes";

import { SidebarMenuItems } from "./types";
import useStyles from "./useStyles";

interface Props {
  isAdminPanel?: boolean;
}

const adminMenuItems: SidebarMenuItems = [
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

const candidateMenuItems: SidebarMenuItems = [];

const Sidebar: React.FC<Props> = ({ isAdminPanel = false }) => {
  const classes = useStyles();
  const route = useRouter();

  const menuItems = isAdminPanel ? adminMenuItems : candidateMenuItems;

  return menuItems.length ? (
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
  ) : null;
};

export default Sidebar;
