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
    mode: "light",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
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
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "black",
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
            sx={{ display: "block", width: drawerWidth }}
          >
            <Toolbar sx={{ width: drawerWidth, background: "#eee" }}>
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
                  passHref
                  style={{ textDecoration: "none" }}
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
          <Box component={"main"} sx={{ p: 5, flexGrow: 1 }}>
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
