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
    <div className={` md:hidden py-4 text-3xl top-2 right-2 ${className}`}>
      {isMenuOpen ? (
        <RxCross1
          onClick={() => dispatch(toggleMenu())}
          style={{
            border: "1px solid #00296b",
          }}
          className="text-4xl absolute top-2 right-2 text-nevyBlue rounded p-1 bg-white  bg-opacity-50 shadow-md shadow-darkPrimary"
        />
      ) : (
        <GiHamburgerMenu
          style={{
            border: "1px solid #00296b",
          }}
          className="text-4xl absolute top-2 right-2 text-nevyBlue rounded-md p-1  bg-white  bg-opacity-50 shadow-md shadow-darkPrimary"
          onClick={() => dispatch(toggleMenu())}
        />
      )}
    </div>
  );
};

export default HamburgerToggler;
