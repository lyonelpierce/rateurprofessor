import Link from "next/link";

import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black p-4 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between h-12">
        <p className="font-medium text-sm text-center">
          &copy; {currentYear} Style593 LLC, Todos los derechos reservados.
        </p>
        <ul className="flex gap-4">
          <li>
            <Link href="#">
              <Instagram size={20} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <Facebook size={20} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <Twitter size={20} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
