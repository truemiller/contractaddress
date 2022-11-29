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
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        },
        h1: {
          fontSize: "4em",
          marginBottom: 25,
          marginTop: 25,
        },
        h2: {
          fontSize: "3em",
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
      <Stack>
        <Stack direction={"row"}>
          <Drawer
            variant="permanent"
            sx={{
              display: "block",
              width: drawerWidth,
              background: "#eee",
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
            {projects.map((project: Project) => (
              <List key={project.slug} dense disablePadding>
                <Link
                  href={`/${project.slug}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={project.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            ))}
          </Drawer>
          <Box component={"main"} sx={{ flexGrow: 1 }}>
            <Container>
              <Component {...pageProps} />
            </Container>
          </Box>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
export default MyApp;

// return <Component {...pageProps} />;
