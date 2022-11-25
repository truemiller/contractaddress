export type Contract = {
  projectSlug: string
  blockchainSlug: string
  name: string
  address: string
}

export type Chain = {
  slug: string
  name: string
}

export type Project = {
  slug: string
  name: string
  chains: string[]
}
