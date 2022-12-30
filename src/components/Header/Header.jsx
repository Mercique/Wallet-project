import styles from "./Header.module.css";

import { Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { useEffect } from "react";
import { navListPrivate, navListPublic } from "../../utils/constants";

export function Header({ cookie }) {
  const location = useLocation();
  const navList = cookie ? navListPrivate : navLocation(navListPublic);

  function navLocation(list) {
    const index = list.findIndex((el) => el.route === location.pathname);
    return [list[index === 0 ? 1 : 0]];
  }

  useEffect(() => {
    let timeout;

    timeout = setTimeout(() => {
      if (location.pathname === "/") {
        document.title = `Wallet | ${navListPublic[0]?.name}`;
      } else if (location.pathname === "/registration") {
        document.title = `Wallet | ${navListPublic[1]?.name}`;
      } else {
        const index = navList.findIndex((el) => el.route === location.pathname);
        document.title = `Wallet | ${navList[index]?.name}`;
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [location, navList]);

  return (
    <NavbarBS className={styles.header}>
      <Logo width={50} height={50} />
      <Nav className={styles.wrp}>
        { navList?.map((navItem, idx) => (
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
