import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
type TActiveNavLinkProps = {
  to: string;
  children: ReactNode;
  [key: string]: any;
};

const ActiveNavLink = ({ to, children, ...remaining }: TActiveNavLinkProps) => {
  const commonStyles = "text-xl font-semibold h-full flex justify-center items-center py-1 md:py-0 mx-1";
  return (
    <NavLink
      to={to}
      {...remaining}
      className={({ isActive }) =>
        isActive
          ? `bg-gray h-full text-primary hover:text-primary ${commonStyles} active`
          : `text-white ${commonStyles} hover:bg-gray hover:text-white`
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveNavLink;
