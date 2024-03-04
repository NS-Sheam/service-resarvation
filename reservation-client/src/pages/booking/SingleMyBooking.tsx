import { Link, useParams } from "react-router-dom";
import { useGetSingleBookingQuery } from "../../redux/features/bookingManagement/bookingApi.api";
import { Col, Row, Tag } from "antd";
import CommonButton from "../../components/ui/CommonButton";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";
import { MdAddCall, MdEmail, MdLocationPin } from "react-icons/md";

const SingleMyBooking = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bookingData } = useGetSingleBookingQuery(id || "");
  const { user } = useAppSelector((state) => state.auth);
  const contactInfo = [
    {
      icon: <MdEmail />,
      info: user?.role === "provider" ? bookingData?.customer?.email : bookingData?.service?.provider.email,
    },
    {
      icon: <MdAddCall />,
      info: user?.role === "provider" ? bookingData?.customer?.phone : bookingData?.service?.provider.phone,
    },
  ];
  if (user?.role === "provider") {
    contactInfo.unshift({
      icon: <MdLocationPin />,
      info: bookingData?.provider?.location,
    });
  }
  return (
    <Row
      justify="center"
      align="top"
      gutter={[0, 8]}
      className="my-container my-5 shadow-lg p-4 rounded-md min-h-[calc(100vh-20vh)]"
    >
      {/* service information side */}
      <Col
        span={24}
        md={{ span: 16 }}
      >
        <Row
          justify="start"
          align="middle"
          gutter={[8, 8]}
        >
          <Col
            span={24}
            className="space-y-1"
          >
            <h2>Booking Details</h2>
            <h1 className="text-3xl lg:text-4xl font-semibold text-nevyBlue ">{bookingData?.service?.name}</h1>
            <p className="font-bold text-2xl text-darkPrimary">
              ${bookingData?.service?.pricePerHour} <span className="text-gray font-semibold">per hour</span>
            </p>
            <p className="text-gray text-xl">{bookingData?.service?.description}</p>
            <p className="font-bold">Date: {moment(bookingData?.schedule.date).format("LL")}</p>
            <p className="font-bold">
              Start Time: <Tag color="blue">{moment(bookingData?.schedule.startTime, "HH:mm").format("hh:mm A")}</Tag>
            </p>
            <p className="font-bold">
              End Time: <Tag color="blue">{moment(bookingData?.schedule.endTime, "HH:mm").format("hh:mm A")}</Tag>
            </p>
          </Col>
          <Col
            span={12}
            md={{ span: 8 }}
            className="space-y-2"
          >
            <Link to={`/services/${bookingData?.service?._id}`}>
              <CommonButton
                size="large"
                backgroundColor="#0096c7"
              >
                More Details
              </CommonButton>
            </Link>
            <CommonButton
              size="large"
              backgroundColor="#ff4d4f"
            >
              Cancel Booking
            </CommonButton>
          </Col>
        </Row>
      </Col>
      {/* provider or customer information side */}
      <Col
        span={24}
        md={{ span: 8 }}
        className="space-y-4"
      >
        <h3 className="font-bold text-darkPrimary">{user?.role === "provider" ? "Customer" : "Service Provider"}</h3>
        <Row
          gutter={[8, 8]}
          align="middle"
          justify="space-around"
          className="bg-grayWhite p-4 rounded-md shadow-md "
        >
          <Col span={16}>
            <h2 className="text-xl md:text-2xl font-semibold text-nevyBlue">
              {user?.role === "provider" ? bookingData?.customer?.name : bookingData?.service?.provider.name}
            </h2>
            {contactInfo.map((contactInfo, index) => (
              <p
                key={index}
                className="flex items-center gap-2"
              >
                <span className="text-darkPrimary text-xl">{contactInfo.icon}</span>
                <span className="text-gray">{contactInfo.info}</span>
              </p>
            ))}
            <CommonButton>More Details</CommonButton>
          </Col>
          <Col
            span={8}
            style={{
              border: "3px solid #0096c7",
            }}
            className="rounded-md p-2 shadow-sm shadow-darkPrimary w-32 h-32"
          >
            <img
              src={user?.role === "provider" ? bookingData?.customer?.image : bookingData?.service?.provider.image}
              alt={user?.role === "provider" ? bookingData?.customer?.name : bookingData?.service?.provider.name}
              className="w-full h-full object-cover rounded-md"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleMyBooking;
