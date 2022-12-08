import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center" passHref>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Contract Address
          </span>
        </Link>
        <div className="flex ml-auto">
          <Link
            href="https://t.me/truemiller1"
            target={"_blank"}
            className="px-5 text-white"
          >
            Contact
          </Link>
          <Link href="/about" className="px-5 text-white">
            About
          </Link>
          <Link href="https://cryptojobs.gg" className="px-5 text-white">
            Crypto Jobs
          </Link>
          <Link href="https://rpc.info" className="px-5 text-white">
            RPC Info
          </Link>
        </div>
      </div>
    </nav>
  );
}
