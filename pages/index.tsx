import type { NextPage } from "next";
import Head from "next/head";
import Blockchains from "../json/Blockchain.json";
import Projects from "../json/Project.json";
import { useEffect, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Typography, Stack } from "@mui/material";

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
          Find contract addresses for popular crypto currency tokens and smart
          contracts.
        </Typography>
      </Stack>
    </>
  );
};

export default Home;
