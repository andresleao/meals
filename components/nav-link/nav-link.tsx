'use client';

import classes from './nav-link.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    href: string;
    label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
    const path = usePathname();

    return (
        <Link
            href={href}
            className={path.startsWith(href) ? classes.active : undefined}
        >
            {label}
        </Link>
    );
}