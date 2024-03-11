import { Col, Row, Skeleton } from "antd";
import { useAppSelector } from "../../redux/hooks";
import BookingCard from "../../components/ui/BookingCard";
import NoItemCard from "../../components/ui/NoItemCard";
import { useGetMyBookingsQuery } from "../../redux/features/bookingManagement/bookingApi.api";
import HamburgerToggler from "../../components/ui/HamburgerToggler";
import PageHead from "../../components/PageHead";

const MyBookings = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: bookings, isFetching: isBookingFetching } = useGetMyBookingsQuery(user?.role);

  const bookingData = bookings?.data;

  return (
    <div className="min-h-screen">
      <PageHead title="Booking" />
      <HamburgerToggler className="text-white" />
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
            align="top"
            gutter={[8, 8]}
          >
            {isBookingFetching ? (
              <Col
                className=" shadow-lg bg-white rounded-md p-4"
                span={24}
                md={{ span: 16 }}
              >
                <Skeleton active />
              </Col>
            ) : bookingData?.length ? (
              bookingData?.map((booking, index) => (
                <Col
                  className=" shadow-lg"
                  key={index}
                  span={24}
                  md={{ span: 16 }}
                >
                  <BookingCard
                    key={index}
                    booking={booking}
                  />
                </Col>
              ))
            ) : (
              <Col
                className=" shadow-lg"
                span={24}
                md={{ span: 16 }}
              >
                <NoItemCard title="Booking" />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MyBookings;
