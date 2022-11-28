import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense, useMemo } from "react";
import Projects from "../json/Project.json";
import Blockchains from "../json/Blockchain.json";
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
      {project && contracts ? (
        <Box>
          <Typography variant="h1" fontWeight={"bold"}>
            {project?.name}
          </Typography>
          <Typography variant="h2">Contract Addresses</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Contract</TableCell>
                  <TableCell>Chain</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts.map((contractData: ContractData) => {
                  return (
                    <ContractTableRows
                      key={contractData.name}
                      contractData={contractData}
                    ></ContractTableRows>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
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

  console.log(contracts);

  return (
    <>
      {contracts.map((contract: Contract, index: number) => {
        return (
          <TableRow key={`${contract.blockchainSlug}-${contract.address}`}>
            {index == 0 ? (
              <TableCell rowSpan={contractData.contracts.length}>
                <Typography fontWeight={"bold"}>{contractData.name}</Typography>
              </TableCell>
            ) : null}

            <TableCell>
              {
                Blockchains.find(
                  (blockchain) => blockchain.slug == contract.blockchainSlug
                )?.name
              }
            </TableCell>
            <TableCell>{contract.address}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default ProjectPage;
