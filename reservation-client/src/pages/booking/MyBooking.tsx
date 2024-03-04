import { Col, Row } from "antd";

const MyBooking = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", position: "relative" }}
      className="shadow-md py-14 md:py-16 lg:py-20"
    >
      <Col
        span={22}
        md={{ span: 16 }}
        className="p-4 bg-white shadow-lg space-y-4 rounded-lg"
      >
        <Row
          justify="center"
          align="middle"
        >
          <Col
            span={24}
            className="border-b-4 border-darkPrimary"
          >
            <p className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer bg-grayWhite`}>
              My Booking
            </p>
            <hr className={`h-2 w-full bg-darkPrimary`} />
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh" }}
        >
          <Col span={24}>
            <h1>My Booking</h1>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MyBooking;
