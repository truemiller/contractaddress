export type Contract = {
  blockchainSlug: string
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
