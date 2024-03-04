import { Col, Flex, Row } from "antd";
import { TBooking } from "../../types";
import moment from "moment";
import { Link } from "react-router-dom";

type TBookingCardProps = {
  booking: TBooking;
};

const BookingCard = ({ booking }: TBookingCardProps) => {
  return (
    <Row
      align="middle"
      justify="center"
      className="bg-white p-4 rounded-md shadow-md"
      gutter={[8, 8]}
    >
      <Col
        span={8}
        md={{ span: 4 }}
        className="w-24 h-24 rounded-lg overflow-hidden"
      >
        <img
          className="w-full h-full"
          src={booking.service?.images[0] || ""}
          alt=""
        />
      </Col>

      <Col
        span={16}
        className="text-left"
      >
        <h1 className="text-lg font-semibold">{booking.service?.name}</h1>
        <p className="text-sm">{booking.service?.description}</p>
        <p className="text-sm">Date: {moment(booking.schedule.date).format("LL")}</p>
        <p className="text-sm">
          From {moment(booking.schedule.startTime, "HH:mm").format("hh:mm A")} &nbsp; to{" "}
          {moment(booking.schedule.endTime, "HH:mm").format("hh:mm A")}
        </p>
      </Col>
      <Col
        span={24}
        md={{ span: 4 }}
      >
        <Flex justify="end">
          <Link to={`/my-bookings/${booking._id}`}>
            <button className="bg-darkPrimary text-white font-semibold px-6 py-2 rounded-md outline-none border-none shadow-lg hover:bg-primary transform duration-300">
              Details
            </button>
          </Link>
        </Flex>
      </Col>
    </Row>
  );
};

export default BookingCard;
