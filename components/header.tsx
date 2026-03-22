import Link from "next/link";

const navItems = [
  { href: "/listings", label: "Listings" },
  { href: "/signup/sponsor", label: "Submit a deal" },
];

export function Header() {
  return (
    <header className="site-shell site-header">
      <Link href="/" className="brand-mark">
        Syndicate Lane
      </Link>
      <nav className="primary-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="ghost-button" href="/login">
          Log in
        </Link>
      </div>
    </header>
  );
}
