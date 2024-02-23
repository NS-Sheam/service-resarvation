import { Col, Row } from "antd";
import "../../styles/Navbar.css";
import ActiveNavLink from "../ActiveNavLink";
const Navbar = () => {
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
    <Row
      align="middle"
      justify="space-between"
      className="navbar text-center py-6 bg-primary"
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
  );
};

export default Navbar;
