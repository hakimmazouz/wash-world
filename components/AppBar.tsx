import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material";
import Link from "next/link";

const LogoImg = styled("img")({
  transform: "scale(0.75)",
});

export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" color="secondary">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Link href="/" passHref>
            <LogoImg src="/logo.png" />
          </Link>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
