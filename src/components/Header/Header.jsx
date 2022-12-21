import styles from "./Header.module.css";

import { Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export function Header({ cookie, navList }) {
  return (
    <NavbarBS className={styles.header}>
      <Logo />
      <Nav className={styles.wrp}>
        { navList.map((navItem, idx) => (
          <Nav.Link
            style={({ isActive }) => ({ color: isActive ? "#FF5555" : "white" })}
            className={cookie ? styles.link : styles.authLink}
            to={navItem.route}
            as={NavLink}
            key={idx}
          >
            {navItem.name}
          </Nav.Link>
        )) }
      </Nav>
    </NavbarBS>
  );
}
