import { Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import style from "./header.css";
import { Logo } from "../Logo/Logo"

export function Header() {
    return <NavbarBS className="header">
            <Logo />
            <Nav className="header__wrp">
                <Nav.Link style={({ isActive }) => ({ color: isActive ? "#FF5555" : "white" })} className="header__link" to="/" as={NavLink}>категории</Nav.Link>
                <Nav.Link style={({ isActive }) => ({ color: isActive ? "#FF5555" : "white" })} className="header__link" to="/operations" as={NavLink}>операции</Nav.Link>
                <Nav.Link style={({ isActive }) => ({ color: isActive ? "#FF5555" : "white" })} className="header__link" to="/calendar" as={NavLink}>календарь</Nav.Link>
                <Nav.Link style={({ isActive }) => ({ color: isActive ? "#FF5555" : "white" })} className="header__link" to="/registration" as={NavLink}>регистрация</Nav.Link>
            </Nav>
    </NavbarBS>
}