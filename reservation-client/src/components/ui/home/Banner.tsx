import Search from "antd/es/input/Search";
import "../../../styles/Banner.css";
import { Col, Row } from "antd";
import HamburgerToggler from "../HamburgerToggler";

const Banner = () => {
  return (
    <div className="banner min-h-[calc(100vh-20vh)] bg-fixed inner-container">
      <HamburgerToggler className="text-white md:hidden" />
      <Row
        align="middle"
        justify="center"
        className="text-center min-h-[calc(100vh-20vh)] "
      >
        <Col
          span={24}
          md={{ span: 12 }}
          style={{ height: "100%" }}
        >
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={(value) => console.log(value)}
            onChange={(e) => console.log(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
