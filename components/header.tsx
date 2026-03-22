import Link from "next/link";

import { signOutAction } from "@/app/actions";
import { getAppMode } from "@/lib/app-mode";

const navItems = [
  { href: "/listings", label: "Listings" },
  { href: "/dashboard/sponsor", label: "Sponsor Portal" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const mode = getAppMode();

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
        <span className="mode-pill">{mode.label} mode</span>
        <Link className="ghost-button" href="/login">
          Log in
        </Link>
        <form action={signOutAction}>
          <button className="ghost-button" type="submit">
            Sign out demo
          </button>
        </form>
      </div>
    </header>
  );
}
