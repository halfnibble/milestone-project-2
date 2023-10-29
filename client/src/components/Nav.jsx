import { NavLink } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
    return (
        <nav>
            <NavLink className={"navbutton"} to="/">
                Home
            </NavLink>
            <NavLink className={"navbutton"} to="/register">
                Register
            </NavLink>
            <NavLink className={"navbutton"} to="/login">
                Login
            </NavLink>
            <NavLink className={"navbutton"} to="/todos">
                Todo List
            </NavLink>
        </nav>
    );
};

export default Nav;
