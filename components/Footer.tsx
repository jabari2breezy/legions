import Link from "next/link";

const orgLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/volunteer", label: "Volunteer" },
];

const projectLinks = [
  { href: "/projects/amsen-visits", label: "AMSEN Visits" },
  { href: "/projects/beach-cleanups", label: "Beach Cleanups" },
  { href: "/projects/ramadhan-project", label: "Ramadhan Project" },
  { href: "/projects/tree-planting", label: "Tree Planting" },
  { href: "/projects/ujasiri-house", label: "Ujasiri House" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Link href="/" className="font-serif text-xl tracking-wide">
            Legions
          </Link>
          <p className="text-muted mt-4 text-sm leading-relaxed max-w-xs">
            A student-led community service organization in Dar es Salaam, Tanzania.
            We take action where it matters.
          </p>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Organization</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {orgLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-fg transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Projects</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {projectLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-fg transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Connect</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href="mailto:hello@legionsclub.tz" className="text-muted hover:text-fg transition-colors">
                hello@legionsclub.tz
              </a>
            </li>
            <li>
              <a href="#" className="text-muted hover:text-fg transition-colors">
                @legionsclubtz
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-6 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
        <p>&copy; {year} Legions Tz. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-fg transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-fg transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
