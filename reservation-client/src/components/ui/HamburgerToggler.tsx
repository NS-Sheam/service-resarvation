import { GiHamburgerMenu } from "react-icons/gi";
import { toggleMenu } from "../../redux/features/header/header.slice";
import { useAppDispatch } from "../../redux/hooks";

type THamburgerTogglerProps = {
  className?: string;
};

const HamburgerToggler = ({ className }: THamburgerTogglerProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`md:hidden py-4 text-3xl top-2 right-2 ${className}`}>
      <GiHamburgerMenu
        className="absolute top-2 right-2"
        onClick={() => dispatch(toggleMenu())}
      />
    </div>
  );
};

export default HamburgerToggler;
