import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavigationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}

export function NavigationLink({ href, active, className, children, ...props }: NavigationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center font-serif font-medium text-[12px] uppercase tracking-[0.08em] text-muted hover:text-accent transition-colors duration-300",
        active && "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
