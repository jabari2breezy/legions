import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="nav-logo">Legions Club</Link>
          <p>A student-led community service organization in Dar es Salaam, Tanzania. We take action where it matters.</p>
        </div>
        <div className="site-footer-col">
          <h4>Organization</h4>
          <Link href="/about">About Us</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/partner">Partner</Link>
        </div>
        <div className="site-footer-col">
          <h4>Projects</h4>
          <Link href="/projects/amsen-visits">AMSEN Visits</Link>
          <Link href="/projects/beach-cleanups">Beach Cleanups</Link>
          <Link href="/projects/ramadhan-project">Ramadhan Project</Link>
          <Link href="/projects/tree-planting">Tree Planting</Link>
          <Link href="/projects/ujasiri-house">Ujasiri House</Link>
        </div>
        <div className="site-footer-col">
          <h4>Connect</h4>
          <a href="mailto:hello@legionsclub.tz">hello@legionsclub.tz</a>
          <a href="#">@legionsclubtz</a>
        </div>
      </div>
      <div className="site-footer-bottom">
        <p>&copy; {currentYear} Legions Tz. All rights reserved.</p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="#" style={{ font: "var(--text-label)", color: "var(--color-text-secondary)" }}>Privacy Policy</Link>
          <Link href="#" style={{ font: "var(--text-label)", color: "var(--color-text-secondary)" }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
