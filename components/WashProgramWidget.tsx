import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Money, PinDrop } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Divider, ListSubheader, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import WashTimer from "./WashTimer";

export default function WashProgramWidget() {
  const { selectedLocation, selectedProduct, wash } = useSelector(
    (state: RootState) => state.flow
  );
  const router = useRouter();

  return selectedLocation || selectedProduct ? (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "fixed",
        bottom: 32,
        left: 32,
        zIndex: 50,
      }}
    >
      <List subheader={<ListSubheader>Wash program</ListSubheader>}>
        {selectedLocation && (
          <ListItem
            onClick={() => {
              if (!wash) router.push("/");
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <PinDrop />
              </ListItemIcon>
              <ListItemText
                primary={selectedLocation.name}
                secondary="Location"
              />
            </ListItemButton>
          </ListItem>
        )}
        {selectedProduct && (
          <ListItem
            disablePadding
            onClick={() => {
              if (!wash) router.push("/products");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Money />
              </ListItemIcon>
              <ListItemText
                primary={selectedProduct.name}
                secondary="Product"
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      {wash && (
        <>
          <Divider />
          <WashTimer />
        </>
      )}
    </Paper>
  ) : null;
}
