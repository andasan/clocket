import { useContext } from "react";
import Link from "next/link";

import { UserContext } from "../../contexts/UserContext";
import { SITE_TITLE } from "../../constants";
import { NavLinkProps } from "../../types";

const Navbar = () => {
  const { username, setUsername } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUsername("");
  };

  return (
    <header className="navbar bg-neutral">
      <h2 className="flex-1">
        <Link href={`${username ? "/dashboard" : "/"}`}>
          <a className="btn btn-ghost normal-case text-xl">{SITE_TITLE}</a>
        </Link>
      </h2>
      <div className="flex-none gap-5">
        {username ? (
          <>
            {/* <ul className="menu menu-horizontal p-1">
              <NavLink href="/dashboard">Timer</NavLink>
              <NavLink href="/stats">Stats</NavLink>
            </ul> */}
            <div className="navbar-end">
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-primary"
                type="button"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <ul className="menu menu-horizontal p-1">
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/signup">Signup</NavLink>
          </ul>
        )}
      </div>
    </header>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <li className="ml-8">
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export default Navbar;
