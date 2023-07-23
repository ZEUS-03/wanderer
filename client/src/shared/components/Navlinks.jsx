import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Authcontext } from "../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(Authcontext);
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "600" : "normal",
      // color: isActive ? "#ffaa49" : "black",
      backgroundColor: isActive ? "rgba(255, 203, 0, .7)" : "",
      borderRadius: "5px",
    };
  };
  return (
    <>
      <NavLink to={"/"} style={navLinkStyles} exact="true">
        <li className=" list-none p-2 ">All Users</li>
      </NavLink>
      {auth.isLoggedIn && (
        <NavLink to={"/:userId/places"} style={navLinkStyles}>
          <li className=" list-none p-2  ">My Places</li>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to={"/places/new"} style={navLinkStyles}>
          <li className=" list-none p-2  ">Add Places</li>
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <NavLink to={"/auth"} style={navLinkStyles}>
          <li className=" list-none p-2 ">Authenticate</li>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <button
          className="hover:bg-amber-300 px-2 rounded-md border border-white"
          onClick={auth.logout}
        >
          Logout
        </button>
      )}
    </>
  );
};

export default NavLinks;
