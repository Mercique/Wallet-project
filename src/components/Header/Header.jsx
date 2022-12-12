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
      route: '/operations',
      name: 'операции'
    },
    {
      route: '/calendar',
      name: 'календарь'
    },
    {
      route: '/',
      name: 'вход'
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
            navList.map((navItem, idx) => (
            <Nav.Link
                style={({ isActive }) => ({ color: isActive ? "#FF5555" : "white" })}
                className={styles.link}
                to={navItem.route}
                as={NavLink}
                key={idx}
            >
                {navItem.name}
            </Nav.Link>
            ))}
      </Nav>
    </NavbarBS>
  );
}
