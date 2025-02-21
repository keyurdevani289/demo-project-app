"use client";

import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  InputBase,
  Toolbar,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Cookies } from "react-cookie-consent";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const router = useRouter();
  const handleSignOut = () => {
    const cookies = Cookies.get(); // Get all cookies
    for (let cookie in cookies) {
      Cookies.remove(cookie); // Remove each cookie
    }
    console.log("first");
    toast.success("You have succesfully signed out");

    router.push("/auth/sign-in");
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      {/* <---------------------- Header ----------------------> */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{display:"flex" ,justifyContent:"center",alignItems:"center" }}>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <SearchWrapper>
            <SearchIconWrapper>
              <Search size={20} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchWrapper>
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            sx={{ ml: 2 }}
          />
          <Box sx={{ ml: "15px" }}>
            <Box sx={{ cursor: "pointer" ,display:"flex" }} onClick={() => handleSignOut()}>
              <LogOut size={24} />
              <Typography variant={"body1"}>Log out</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        {/* <---------------------- Sidebar ----------------------> */}
        <Sidebar open={sidebarOpen}  />

        {/* <---------------------- Body ----------------------> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            height: "calc(100vh - 64px - 68px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            User Management
          </Typography>
          {children}
        </Box>
      </Box>

      {/* <---------------------- Footer ----------------------> */}
      <Box
        component="footer"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          py: 3,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
