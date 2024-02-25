import { Col, Row } from "antd";
import "../../styles/Navbar.css";
import ActiveNavLink from "../ActiveNavLink";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
      title: "Service Providers",
      path: "/service-providers",
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
          <h1 className="text-white">Logo</h1>
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
        <GiHamburgerMenu
          className="text-white text-3xl absolute top-2 right-2"
          onClick={() => setShowMobileMenu(true)}
        />
        <Col
          span={20}
          className={`absolute top-2 right-2 transform ${
            showMobileMenu ? "flex" : "hidden"
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
                <span className="relative">
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
              <span className="relative">
                <ActiveNavLink
                  to="/auth"
                  className="text-xl font-semibold text-white"
                >
                  Login
                </ActiveNavLink>
              </span>
            </Col>
            <RxCross1
              onClick={() => setShowMobileMenu(false)}
              className="text-orange text-3xl absolute top-2 right-2"
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
