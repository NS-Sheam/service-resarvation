import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
type TActiveNavLinkProps = {
  to: string;
  children: ReactNode;
  [key: string]: any;
};

const ActiveNavLink = ({ to, children, ...remaining }: TActiveNavLinkProps) => {
  return (
    <NavLink
      to={to}
      {...remaining}
      className={({ isActive }) => (isActive ? "active-menu-link" : "menu-link")}
    >
      {children}
    </NavLink>
  );
};

export default ActiveNavLink;
