import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
type TActiveNavLinkProps = {
  to: string;
  children: ReactNode;
  [key: string]: any;
};

const ActiveNavLink = ({ to, children, ...remaining }: TActiveNavLinkProps) => {
  const commonStyles = "text-xl md:text-2xl font-semibold text-white";
  return (
    <NavLink
      to={to}
      {...remaining}
      className={({ isActive }) => (isActive ? `active-menu-link ${commonStyles}` : `menu-link ${commonStyles}`)}
    >
      {children}
    </NavLink>
  );
};

export default ActiveNavLink;
