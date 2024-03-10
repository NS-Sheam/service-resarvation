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
            border: "1px solid black",
          }}
          className="text-4xl absolute top-2 right-2 text-black rounded p-1"
        />
      ) : (
        <GiHamburgerMenu
          style={{
            border: "1px solid black",
          }}
          className="text-4xl absolute top-2 right-2 text-black rounded-md p-1 "
          onClick={() => dispatch(toggleMenu())}
        />
      )}
    </div>
  );
};

export default HamburgerToggler;
