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
        <title>Contract Address</title>
        <meta
          name="description"
          content="Find contract addresses for popular crypto currency tokens and smart
        contracts."
        />
      </Head>
      <h1>Contract Address</h1>
      <p>
        Find contract addresses for {Projects.length} cryptocurrency projects
        across {Blockchains.length} blockchains.
      </p>
      <h2>Projects</h2>
      <ul>
        {projects.map((project: any) => (
          <li key={project.slug}>
            <Link href={`/${project.slug}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
