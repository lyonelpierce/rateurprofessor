import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black py-6 text-white h-22 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="font-medium text-sm text-center">
          &copy; {currentYear} Lyonel Pierce, Todos los derechos reservados.
        </p>
        <Logo fill="#fff" text="#000" />
      </div>
    </footer>
  );
};

export default Footer;
