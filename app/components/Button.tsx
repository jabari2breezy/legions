import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
}

export function Button({ href, children, variant = "primary", className = "", type = "button" }: ButtonProps) {
  const cls = `${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`;

  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} className={cls}>{children}</button>;
}
