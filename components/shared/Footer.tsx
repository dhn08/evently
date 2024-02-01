import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t ">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 text-center sm:flex-row  ">
        <Link href="/">
          <Image
            alt="logo"
            src="./assets/images/logo.svg"
            width={128}
            height={38}
          />
        </Link>
        <p>2024 Evently. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
