import "../styles/globals.css";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

import Blockchains from "../json/Blockchain.json";
import Projects from "../json/Project.json";
import { Chain, Project } from "../types/types";

const drawerWidth = 300;

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
        },
        h1: {
          fontSize: "4em",
          fontWeight: "bolder",
          marginBottom: 25,
          marginTop: 25,
        },
        h2: {
          fontSize: "3em",
          fontWeight: "bold",
          marginBottom: 20,
          marginTop: 20,
        },
        h3: {
          fontSize: "2em",
          marginTop: 15,
          marginBottom: 15,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "1px solid #ccc",
          fontFamily: "monospace",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // background: "#fff",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [chains, setChains] = useState<Chain[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffectOnce(() => {
    const blockchains: Chain[] = Blockchains.sort((a: Chain, b: Chain) =>
      a.name.localeCompare(b.name)
    );
    const projects: Project[] = Projects.sort((a: Project, b: Project) =>
      a.name.localeCompare(b.name)
    );
    setChains(blockchains);
    setProjects(projects);
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Stack direction={"row"}>
        <Drawer
          variant="permanent"
          sx={{
            display: "block",
            width: drawerWidth,
          }}
        >
          <Toolbar sx={{ width: drawerWidth }}>
            <Typography marginX={"auto"}>
              <Link
                href="/"
                passHref
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Contract Address
              </Link>
            </Typography>
          </Toolbar>
          <List component={"ul"} dense disablePadding>
            {projects.map((project: Project) => (
              <Link
                key={project.slug}
                href={`/${project.slug}`}
                style={{ textDecoration: "none", color: "black" }}
                passHref
              >
                <ListItem disablePadding component={"li"}>
                  <ListItemButton>
                    <ListItemText primary={project.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <Box component={"main"} sx={{ flexGrow: 1 }}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
export default MyApp;

// return <Component {...pageProps} />;
