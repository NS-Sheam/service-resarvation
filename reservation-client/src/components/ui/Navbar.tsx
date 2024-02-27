import { Col, Row } from "antd";
import "../../styles/Navbar.css";
import ActiveNavLink from "../ActiveNavLink";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleMenu } from "../../redux/features/header/header.slice";

const Navbar = () => {
  const { isMenuOpen } = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();
  const mainMenuItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Services",
      path: "/services",
    },
    {
      title: "Providers",
      path: "/providers",
    },
  ];

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        className="navbar text-center py-6 bg-primary hidden md:flex"
      >
        <Col span={6}>
          <h1 className="text-nevyBlue">Logo</h1>
        </Col>
        <Col span={12}>
          <Row justify="center">
            {mainMenuItems.map((item, index) => (
              <Col
                key={index}
                span={8}
              >
                <span className="relative">
                  <ActiveNavLink
                    to={item.path}
                    className="menu-link"
                  >
                    {item.title}
                  </ActiveNavLink>
                </span>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={6}>
          <span className="relative">
            <ActiveNavLink to="/auth">Login</ActiveNavLink>
          </span>
        </Col>
      </Row>

      {/* Mobile Menu */}
      <Row
        align="middle"
        justify="end"
        className="z-50"
      >
        <Col
          span={20}
          className={`absolute top-2 right-2 transform ${
            isMenuOpen ? "flex" : "hidden"
          } transition-all duration-300 z-50`}
        >
          <Row
            align="middle"
            justify="space-between"
            style={{
              border: "2px solid #ffd500",
              borderRadius: "0.5rem",
            }}
            className="py-6 px-4 bg-primary md:hidden shadow-sm shadow-white"
            gutter={[0, 16]}
          >
            {mainMenuItems.map((item, index) => (
              <Col
                key={index}
                span={24}
              >
                <span
                  className="relative "
                  onClick={() => dispatch(toggleMenu())}
                >
                  <ActiveNavLink
                    to={item.path}
                    className=""
                  >
                    {item.title}
                  </ActiveNavLink>
                </span>
              </Col>
            ))}
            <Col span={24}>
              <span
                className="relative"
                onClick={() => dispatch(toggleMenu())}
              >
                <ActiveNavLink
                  to="/auth"
                  className="text-xl font-semibold text-nevyBlue"
                >
                  Login
                </ActiveNavLink>
              </span>
            </Col>
            <RxCross1
              onClick={() => dispatch(toggleMenu())}
              className="text-nevyBlue text-3xl absolute top-2 right-2"
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
