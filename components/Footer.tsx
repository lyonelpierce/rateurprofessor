import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute bottom-0 w-full bg-black py-6 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="font-medium text-sm">
          &copy; {currentYear} Lyonel Pierce, Todos los derechos reservados.
        </p>
        <Logo fill="#fff" text="#000" />
      </div>
    </footer>
  );
};

export default Footer;
