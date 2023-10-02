import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-8 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="font-semibold text-sm">
          &copy; {currentYear} Lyonel Pierce, Todos los derechos reservados.
        </p>
        <Logo fill="#fff" text="#000" />
      </div>
    </footer>
  );
};

export default Footer;
