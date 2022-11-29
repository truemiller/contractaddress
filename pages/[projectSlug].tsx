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
  Stack,
  Drawer,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense, useMemo } from "react";
import Projects from "../json/Project.json";
import Blockchains from "../json/Blockchain.json";
import { Contract, ContractData } from "../types/types";
import Head from "next/head";
import Image from "next/image";

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
                  <Typography variant="h3">{contractData.name}</Typography>
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

  console.log(contracts);

  return (
    <>
      {contracts.map((contract: Contract, index: number) => {
        return (
          <TableRow key={`${contract.blockchainSlug}-${contract.address}`}>
            {/* {index == 0 ? (
              <TableCell rowSpan={contractData.contracts.length}>
                <Typography fontWeight={"bold"}>{contractData.name}</Typography>
              </TableCell>
            ) : null} */}

            <TableCell>
              <Stack direction={"row"}>
                <Image
                  src={`/logos/${contract.blockchainSlug}.webp`}
                  width={16}
                  height={16}
                  alt=""
                  style={{ marginRight: 5, borderRadius: "100%" }}
                />
                {
                  Blockchains.find(
                    (blockchain) => blockchain.slug == contract.blockchainSlug
                  )?.name
                }
              </Stack>
            </TableCell>
            <TableCell>{contract.address}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default ProjectPage;
