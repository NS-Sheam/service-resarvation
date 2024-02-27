import { GiHamburgerMenu } from "react-icons/gi";
import { toggleMenu } from "../../redux/features/header/header.slice";
import { useAppDispatch } from "../../redux/hooks";

type THamburgerTogglerProps = {
  className?: string;
};

const HamburgerToggler = ({ className }: THamburgerTogglerProps) => {
  const dispatch = useAppDispatch();
  return (
    <GiHamburgerMenu
      className={` absolute text-3xl top-2 right-2 z-10 ${className}`}
      onClick={() => dispatch(toggleMenu())}
    />
  );
};

export default HamburgerToggler;
