import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Alert,
  Box,
  Button,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense, useMemo, useState } from "react";

import Blockchains from "../json/Blockchain.json";
import Projects from "../json/Project.json";
import { Contract, ContractData } from "../types/types";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const projectSlug: any = router.query.projectSlug;
  const project = useMemo(() => {
    if (projectSlug) {
      return Projects.find((project) => project.slug === projectSlug);
    }
  }, [projectSlug]);
  const contracts = useMemo(() => {
    if (projectSlug) {
      return require(`../json/contracts/${projectSlug}.json`);
    } else {
      return [];
    }
  }, [projectSlug]);

  return (
    <>
      <Head>
        <title>{project?.name} Contract Addresses</title>
        <meta
          name="description"
          content={`Find contract addresses for ${project?.name}`}
        />
      </Head>
      {project && contracts ? (
        <>
          <Box>
            <Typography variant="h1" fontWeight={900}>
              {project?.name}
            </Typography>
            <Typography variant="h2" fontWeight={700}>
              Contract Addresses
            </Typography>

            {contracts.map((contractData: ContractData) => {
              return (
                <>
                  <Typography variant="h3" id={contractData.name}>
                    {contractData.name}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ background: "#eee" }}>
                          <TableCell sx={{ fontWeight: "bolder" }}>
                            Chain
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bolder" }}>
                            Address
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <ContractTableRows
                          key={contractData.name}
                          contractData={contractData}
                        ></ContractTableRows>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              );
            })}
          </Box>
          <Drawer variant="permanent" anchor="right">
            <Toolbar>
              <Typography>On this page</Typography>
            </Toolbar>
            <List dense>
              {contracts.map((contractData: ContractData) => {
                return (
                  <Link key={contractData.name} href={`#${contractData.name}`}>
                    <ListItem>
                      <ListItemButton>
                        <ListItemText>{contractData?.name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Drawer>
        </>
      ) : (
        <Suspense>Loading ... </Suspense>
      )}
    </>
  );
};

const ContractTableRows = ({
  contractData,
}: {
  contractData: ContractData;
}): JSX.Element => {
  const contracts = useMemo(() => {
    return contractData.contracts.sort((a: Contract, b: Contract) => {
      return a.blockchainSlug.localeCompare(b.blockchainSlug);
    });
  }, [contractData]);

  const handleCopy = (value: string) => {
    window.navigator.clipboard.writeText(value);
    setSnackbarOpen(true);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <>
      {contracts.map((contract: Contract, index: number) => {
        const blockchain = Blockchains.find(
          (blockchain) => blockchain.slug == contract.blockchainSlug
        );
        return (
          <TableRow key={`${contract.blockchainSlug}-${contract.address}`}>
            <TableCell>
              <Stack direction={"row"}>
                <Image
                  src={`/logos/${contract.blockchainSlug}.webp`}
                  width={16}
                  height={16}
                  alt=""
                  style={{ marginRight: 5, borderRadius: "100%" }}
                />
                {blockchain?.name}
              </Stack>
            </TableCell>
            <TableCell>
              <Stack direction={"row"}>
                <Link href={`${blockchain?.blockExplorer}${contract.address}`}>
                  {contract.address}
                </Link>
                <ContentCopyIcon
                  fontSize="small"
                  onClick={() => handleCopy(contract.address)}
                  sx={{ padding: 0.25, marginX: 1, cursor: "pointer" }}
                />
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">Copied to clipboard</Alert>
      </Snackbar>
    </>
  );
};

export default ProjectPage;
