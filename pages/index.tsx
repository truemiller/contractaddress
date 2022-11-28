import type { NextPage } from "next";
import Head from "next/head";
import { Typography, Stack } from "@mui/material";
import Projects from "../json/Project.json";
import Blockchains from "../json/Blockchain.json";
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
      <Stack>
        <Typography variant="h1" fontWeight={"bold"}>
          Contract Address
        </Typography>
        <Typography>
          Find contract addresses for {Projects.length} cryptocurrency projects
          across {Blockchains.length} blockchains.
        </Typography>
      </Stack>
    </>
  );
};

export default Home;
