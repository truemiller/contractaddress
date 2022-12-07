import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
  const numberOfContracts = useMemo(() => {
    return contracts?.reduce(
      (a: number, b: ContractData) => a + b.contracts.length,
      0
    );
  }, [contracts]);

  return (
    <main>
      <Head>
        <title>{project?.name} Contract Addresses</title>
        <meta
          name="description"
          content={`Find ${numberOfContracts} contract addresses for ${project?.name}`}
        />
      </Head>
      {project && contracts ? (
        <>
          <h1>{project?.name}</h1>
          <p>
            Find {numberOfContracts} contract addresses for {project?.name}.
          </p>
          <h2>Contract Addresses</h2>

          <ul>
            {contracts.map((contractData: ContractData) => {
              return (
                <li key={contractData.name}>
                  <Link
                    href={`#${contractData.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    {contractData?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {contracts.map((contractData: ContractData) => {
            return (
              <section key={contractData.name}>
                <h3 id={contractData.name}>{contractData.name}</h3>
                <table>
                  <thead>
                    <tr style={{ background: "#eee" }}>
                      <th style={{ fontWeight: "bolder", width: 300 }}>
                        Chain
                      </th>
                      <th style={{ fontWeight: "bolder" }}>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ContractTableRows
                      key={contractData.name}
                      contractData={contractData}
                    ></ContractTableRows>
                  </tbody>
                </table>
              </section>
            );
          })}
        </>
      ) : (
        <Suspense>Loading ... </Suspense>
      )}
    </main>
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
          <tr key={`${contract.blockchainSlug}-${contract.address}`}>
            <td>
              <span>
                <Image
                  src={`/logos/${contract.blockchainSlug}.webp`}
                  width={16}
                  height={16}
                  alt=""
                  style={{ marginRight: 5, borderRadius: "100%" }}
                />
                {blockchain?.name}
              </span>
            </td>
            <td>
              <span>
                {blockchain?.blockExplorer ? (
                  <Link
                    href={`${blockchain?.blockExplorer}${contract.address}`}
                  >
                    {contract.address}
                  </Link>
                ) : (
                  contract.address
                )}
                <ContentCopyIcon
                  fontSize="small"
                  onClick={() => handleCopy(contract.address)}
                  sx={{ padding: 0.25, marginX: 1, cursor: "pointer" }}
                />
              </span>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default ProjectPage;
