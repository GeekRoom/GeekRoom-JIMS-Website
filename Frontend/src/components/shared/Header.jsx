import Logo from "../../assets/Events/Logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Contact us", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto mt-4 px-5">
        <div className="glass-card rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl">
          <img
            src={Logo}
            alt="Logo"
            width={48}
            height={48}
            className="object-contain"
          />

          <nav className="hidden sm:flex items-center gap-8 font-mono text-[13px] text-[#94a3b8]">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative hover:text-white transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff6b00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#events"
            className="font-mono text-[12px] px-4 py-2 rounded-full border border-[#ff6b00]/40 text-[#ff6b00] hover:bg-[#ff6b00]/15 hover:border-[#ff6b00] transition-all duration-300 font-semibold uppercase tracking-wider"
          >
            Explore Events
          </a>
        </div>
      </div>
    </header>
  );
}
