import { Col, Row } from "antd";
import HamburgerToggler from "../components/ui/HamburgerToggler";
import CommonSearchBar from "../components/CommonSearchBar";
import "../styles/Services.css";
/**
 * TODO:
 * 1. Fix the layout of the services page
 */
const Services = () => {
  return (
    <div>
      <HamburgerToggler className="md:hidden text-black " />
      <div className="services-container">
        <Row
          justify="center"
          align="middle"
          className=" min-h-[calc(100vh-20vh)] bg-primary bg-opacity-20 w-full md:w-3/4 mx-auto px-2 py-3"
        >
          <Col
            span={24}
            md={{ span: 16 }}
          >
            <CommonSearchBar />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Services;
