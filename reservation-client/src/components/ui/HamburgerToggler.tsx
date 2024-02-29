import { GiHamburgerMenu } from "react-icons/gi";
import { toggleMenu } from "../../redux/features/header/header.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RxCross1 } from "react-icons/rx";

type THamburgerTogglerProps = {
  className?: string;
};

const HamburgerToggler = ({ className }: THamburgerTogglerProps) => {
  const dispatch = useAppDispatch();
  const { isMenuOpen } = useAppSelector((state) => state.header);
  return (
    <div className={`md:hidden py-4 text-3xl top-2 right-2 ${className}`}>
      {isMenuOpen ? (
        <RxCross1
          onClick={() => dispatch(toggleMenu())}
          className="text-3xl absolute top-2 right-2"
        />
      ) : (
        <GiHamburgerMenu
          className="absolute top-2 right-2"
          onClick={() => dispatch(toggleMenu())}
        />
      )}
    </div>
  );
};

export default HamburgerToggler;
