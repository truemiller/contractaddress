import { Box, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import Blockchains from "../json/Blockchain.json";
import Projects from "../json/Project.json";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contract Address</title>
        <meta
          name="description"
          content="Find contract addresses for popular crypto currency tokens and smart
        contracts."
        />
      </Head>
      <Box
        flexGrow={1}
        height={"100vh"}
        display="flex"
        flexDirection={"column"}
      >
        <Typography variant="h1" fontWeight={"bold"} mt={"auto"}>
          Contract Address
        </Typography>
        <Typography mb={"auto"}>
          Find contract addresses for {Projects.length} cryptocurrency projects
          across {Blockchains.length} blockchains.
        </Typography>
      </Box>
    </>
  );
};

export default Home;
