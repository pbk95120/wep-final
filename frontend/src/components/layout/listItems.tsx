import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

//Menu Options List
export const mainListItems = (
  <React.Fragment>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon sx={{ color: "#9da4ae" }} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link to="/note">
      <ListItemButton>
        <ListItemIcon>
          <ChatIcon sx={{ color: "#9da4ae" }} />
        </ListItemIcon>
        <ListItemText primary="My Note" />
      </ListItemButton>
    </Link>
    <Link to="/login">
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon sx={{ color: "#9da4ae" }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
