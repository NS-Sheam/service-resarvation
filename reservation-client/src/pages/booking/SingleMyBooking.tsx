import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCancelBookingMutation,
  useGetSingleBookingQuery,
} from "../../redux/features/bookingManagement/bookingApi.api";
import { Col, Row, Spin } from "antd";
import CommonButton from "../../components/ui/CommonButton";
import { useAppSelector } from "../../redux/hooks";
import { MdAddCall, MdEmail, MdLocationPin } from "react-icons/md";
import BookingDetails from "../../components/ui/booking/BookingDetails";
import UserContactCard from "../../components/ui/UserContactCard";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { TResponse } from "../../types";
import PageHead from "../../components/PageHead";

const SingleMyBooking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    isFetching: isBookingFetching,
  } = useGetSingleBookingQuery(id || "");
  const { user } = useAppSelector((state) => state.auth);
  const [cancelBooking] = useCancelBookingMutation();
  const contactInfo = [
    {
      icon: <MdEmail />,
      info: user?.role === "provider" ? bookingData?.customer?.email : bookingData?.provider.email,
    },
    {
      icon: <MdAddCall />,
      info: user?.role === "provider" ? bookingData?.customer?.phone : bookingData?.provider.phone,
    },
  ];
  if (user?.role === "customer") {
    contactInfo.unshift({
      icon: <MdLocationPin />,
      info: bookingData?.provider?.location,
    });
  }
  if (isBookingLoading || isBookingFetching) {
    return (
      <div className="min-h-[calc(100vh-20vh)] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const handleCancelBooking = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to cancel this booking?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      customClass: {
        container: "booking-sweetalert-container",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Cancelling...");
        const res = (await cancelBooking(id as string)) as TResponse<any>;

        if (!res.error) {
          toast.success(res?.message || "Service Deleted successfully", {
            id: toastId,
            duration: 2000,
          });
          navigate("/my-bookings");
        } else {
          toast.error(
            res?.error?.data?.errorSources[0].message || res?.error?.data?.message || "Something went wrong",
            {
              id: toastId,
            }
          );
        }
      }
    });
  };

  return (
    <Row
      justify="space-between"
      align="top"
      gutter={[0, 8]}
      className="my-container shadow-lg py-8 rounded-md min-h-screen"
    >
      <PageHead title={`Booking | ${bookingData?.service?.name}`} />
      {/* service information side */}
      <Col
        span={24}
        md={{ span: 15 }}
        className="bg-white p-4 rounded-md min-h-[calc(100vh-20vh)]"
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
            <BookingDetails booking={bookingData} />
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
              onClick={handleCancelBooking}
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
        className="space-y-4 bg-grayWhite p-4 rounded-md"
      >
        <h3 className="font-bold text-darkPrimary">{user?.role === "provider" ? "Customer" : "Service Provider"}</h3>
        <Row
          gutter={[8, 8]}
          align="middle"
          justify="space-around"
          className="bg-white p-4 rounded-md shadow-md "
        >
          <Col span={16}>
            <UserContactCard
              name={`${user?.role === "provider" ? bookingData?.customer?.name : bookingData?.provider.name}`}
              contactInfo={contactInfo}
            />
          </Col>
          <Col
            span={8}
            style={{
              border: "3px solid #0096c7",
            }}
            className="rounded-md p-2 shadow-sm shadow-darkPrimary w-32 h-32"
          >
            <img
              src={user?.role === "provider" ? bookingData?.customer?.image : bookingData?.provider.image}
              alt={user?.role === "provider" ? bookingData?.customer?.name : bookingData?.provider.name}
              className="w-full h-full object-cover rounded-md"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleMyBooking;
