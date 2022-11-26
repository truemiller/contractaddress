export type Contract = {
  blockchainSlug: string
  address: string
}

export type ContractData = {
  name: string
  projectSlug: string
  contracts: Contract[]
}

export type Chain = {
  slug: string
  name: string
}

export type Project = {
  slug: string
  name: string
}
