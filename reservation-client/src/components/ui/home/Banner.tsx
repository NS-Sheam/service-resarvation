import Search from "antd/es/input/Search";
import "../../../styles/Banner.css";
import { Col, Flex, Row } from "antd";
import HamburgerToggler from "../HamburgerToggler";
import { FaSearchPlus } from "react-icons/fa";
import { ChangeEvent } from "react";
import CommonSearchBar from "../../CommonSearchBar";

const Banner = () => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

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
          style={{ height: "100%", position: "relative" }}
        >
          <CommonSearchBar
            size="large"
            onChange={onChange}
          />

          <div className="scrollable-content absolute w-full mt-1 space-y-1 max-h-44 overflow-x-scroll">
            {Array.from({ length: 10 }).map((_, index) => (
              <Row
                key={index}
                align="middle"
                justify="center"
                className="bg-white p-4 rounded-md shadow-md"
                gutter={[0, 4]}
              >
                <Col
                  span={24}
                  md={{ span: 20 }}
                  className="text-left"
                >
                  <h3 className="text-lg font-semibold text-darkPrimary">This is a service</h3>
                  <p className="text-gray">
                    <span className="font-bold text-grayBlack">Provider:</span> Provider Name{" "}
                    <span className="font-bold text-grayBlack">Location:</span> New York
                  </p>
                </Col>
                <Col
                  span={24}
                  md={{ span: 4 }}
                >
                  <Flex justify="end">
                    <button className="bg-warning text-black font-semibold px-6 py-2 rounded-md outline-none border-none shadow-lg hover:bg-orange transform duration-300">
                      Details
                    </button>
                  </Flex>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
