import { Col, Row } from "antd";

const Footer = () => {
  return (
    <Row
      align="middle"
      justify="center"
      className="py-6 bg-orange text-primary"
      gutter={[16, 16]}
    >
      <Col
        span={12}
        className="text-right "
      >
        <h3 className="text-3xl">Logo</h3>
        <p>&copy; 2021 All rights reserved</p>
      </Col>
      <Col span={12}>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Cookie Policy</p>
      </Col>
    </Row>
  );
};

export default Footer;
