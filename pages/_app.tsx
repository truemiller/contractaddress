import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Project, Chain } from "../types/types";
import Blockchains from "../json/Blockchain.json";
import Projects from "../json/Project.json";
import Link from "next/link";
import {
  Box,
  CssBaseline,
  Stack,
  AppBar,
  Container,
  Drawer,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const drawerWidth = 300;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222222",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #333",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "1px solid #333",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: "#222",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // background: "#111",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {},
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
        <AppBar position="fixed" sx={{ left: drawerWidth }}>
          <Toolbar>
            <Typography variant="h6"></Typography>
          </Toolbar>
        </AppBar>
        <Stack direction={"row"}>
          <Drawer
            variant="permanent"
            sx={{ display: "block", width: drawerWidth }}
          >
            <Toolbar sx={{ width: drawerWidth }}>
              <Typography>
                <Link
                  href="/"
                  passHref
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Contract Address
                </Link>
              </Typography>
            </Toolbar>
            {projects.map((project: Project) => (
              <List key={project.slug} disablePadding>
                <Link
                  href={`/${project.slug}`}
                  passHref
                  style={{ textDecoration: "none", color: "white" }}
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
          <Box component={"main"} sx={{ p: 5, flexGrow: 1, pt: 12 }}>
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

const Header = (): JSX.Element => {
  return <header></header>;
};

// return <Component {...pageProps} />;
