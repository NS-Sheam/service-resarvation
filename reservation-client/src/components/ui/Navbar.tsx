import { Col, Row } from "antd";
import "../../styles/Navbar.css";
import ActiveNavLink from "../ActiveNavLink";
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
    {
      title: "booking",
      path: "/my-bookings",
    },
    {
      title: "Login",
      path: "/auth",
    },
  ];

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        className="navbar text-center h-16 bg-grayBlack hidden md:flex"
      >
        <Col span={6}>
          <h1 className="text-white">Logo</h1>
        </Col>
        <Col
          span={16}
          className="h-full"
        >
          <Row
            justify="center"
            className="h-full"
          >
            {mainMenuItems.map((item, index) => (
              <Col
                key={index}
                span={4}
                className=""
              >
                <ActiveNavLink
                  to={item.path}
                  className="menu-link"
                >
                  {item.title}
                </ActiveNavLink>
              </Col>
            ))}
          </Row>
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
          className={`absolute top-12 right-6 transform ${
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
            className=" py-6 px-4 bg-grayBlack md:hidden shadow-sm shadow-white"
            gutter={[0, 16]}
          >
            {mainMenuItems.map((item, index) => (
              <Col
                key={index}
                span={24}
              >
                <ActiveNavLink
                  to={item.path}
                  onClick={() => dispatch(toggleMenu())}
                >
                  {item.title}
                </ActiveNavLink>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
