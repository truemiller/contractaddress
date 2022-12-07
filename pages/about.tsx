import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import Blockchains from "../json/Blockchain.json";
import Projects from "../json/Project.json";
import { Project } from "../types/types";
const Home: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const projects = Projects.sort((a, b) => a.name.localeCompare(b.name));
    setProjects(projects);
  }, []);

  return (
    <main className="container">
      <Head>
        <title>About Contract Address</title>
        <meta
          name="description"
          content="Find contract addresses for popular crypto currency tokens and smart
        contracts."
        />
      </Head>
      <h1>About Contract Address</h1>
      <p>
        We list contract addresses for {Projects.length} cryptocurrency projects
        across {Blockchains.length} blockchains.
      </p>
      <p>Pretty simple really.</p>
      <p>
        <Link href={"https://t.me/truemiller1"}>Contract True Miller</Link> to
        get your contracts listed.
      </p>
    </main>
  );
};

export default Home;
