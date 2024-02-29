import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
type TActiveNavLinkProps = {
  to: string;
  children: ReactNode;
  [key: string]: any;
};

const ActiveNavLink = ({ to, children, ...remaining }: TActiveNavLinkProps) => {
  const commonStyles = "text-xl md:text-2xl font-semibold block h-full flex justify-center items-center py-1 md:py-0";
  return (
    <NavLink
      to={to}
      {...remaining}
      className={({ isActive }) => (isActive ? `bg-gray text-orange ${commonStyles}` : `text-white ${commonStyles} `)}
    >
      {children}
    </NavLink>
  );
};

export default ActiveNavLink;
