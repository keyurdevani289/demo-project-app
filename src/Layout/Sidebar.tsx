import React, { useState } from "react";
import {
  Drawer,
  List,
  Toolbar,
  Divider,
  Box,
  Typography,
  ListItemButton,
  IconButton,
} from "@mui/material";
import { Home, Users, Settings, LogOut, Menu } from "lucide-react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void; // Add a function to toggle sidebar
}

const drawerWidth = 240;

const menuItems = [
  { icon: Home, label: "Dashboard" },
  { icon: Users, label: "Users", active: true },
  { icon: Settings, label: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={item.active}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              },
            }}
          >
            <ListItemIcon>
              <item.icon size={24} />
            </ListItemIcon>
            {/* Only show label when sidebar is open */}
            {open && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: "auto" }}>
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <LogOut size={24} />
          </ListItemIcon>
          {/* Only show label when sidebar is open */}
          {open && <ListItemText primary="Logout" />}
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar