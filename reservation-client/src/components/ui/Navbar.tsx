import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
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
        <h1>Logo</h1>
      </Col>
      <Col span={12}>
        <Row justify="center">
          {mainMenuItems.map((item, index) => (
            <Col
              key={index}
              span={8}
            >
              <Link
                className="relative"
                to={item.path}
              >
                <span className="menu-link">{item.title}</span>
              </Link>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={6}>
        <Link
          className="relative"
          to="/auth"
        >
          <span className="active-menu-link">Login</span>
        </Link>
      </Col>
    </Row>
  );
};

export default Navbar;
