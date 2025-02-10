import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import paths from "@/paths";
import classes from "./main-header.module.css";
import MainHeaderBackground from "../main-header-background/main-header-background";
import NavLink from "../nav-link/nav-link";

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link
                    className={classes.logo}
                    href="/"
                >
                    <Image
                        src={logo}
                        alt="logo"
                        priority
                    />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href={paths.meals()} label="Browse Meals"/>
                        </li>
                        <li>
                            <NavLink href={paths.community()} label="Foodies Community"/>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}