import styles from "./Header.module.css";

import { Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export function Header() {
  const navList = [
    {
      route: '/category',
      name: 'категории'
    },
    {
      route: '/',
      name: 'операции'
    },
    {
      route: '/calendar',
      name: 'календарь'
    },
    {
      route: '/registration',
      name: 'регистрация'
    },
  ];

  return (
    <NavbarBS className={styles.header}>
      <Logo />
      <Nav className={styles.wrp}>
        {navList &&
            navList.map(navItem => (
            <Nav.Link
                style={({ isActive }) => ({ color: isActive ? "#FF5555" : "white" })}
                className={styles.link}
                to={navItem.route}
                as={NavLink}
            >
                {navItem.name}
            </Nav.Link>
            ))}
      </Nav>
    </NavbarBS>
  );
}
