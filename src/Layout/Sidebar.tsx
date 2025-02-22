"use client";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, Settings, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarProps {
  open: boolean;
}

const drawerWidth = 240;

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "Users", path: "/user-manage" },
  { icon: Settings, label: "Settings", path: "/setting" },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(pathname);
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);
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
            onClick={() => {
              router.push(item.path);
            }}
            key={index}
            selected={item.path === currentPath}
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
    </Drawer>
  );
};

export default Sidebar;
