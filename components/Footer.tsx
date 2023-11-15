import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black p-4 text-white h-22">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="font-medium text-sm text-center">
          &copy; {currentYear} Style593 LLC, Todos los derechos reservados.
        </p>
        <Link href="/">
          <Image src="/Logo.svg" width={50} height={50} alt="Logo Emoji" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
