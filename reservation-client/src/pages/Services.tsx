import { Col, Row } from "antd";
import HamburgerToggler from "../components/ui/HamburgerToggler";

const Services = () => {
  return (
    <div>
      <HamburgerToggler className="md:hidden text-black" />
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col
          span={24}
          md={{ span: 16 }}
        ></Col>
      </Row>
    </div>
  );
};

export default Services;
