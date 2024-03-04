import moment from "moment";
import { TBooking } from "../../../types";
import { Tag } from "antd";

type TBookingDetailsProps = {
  booking: TBooking | undefined;
};

const BookingDetails = ({ booking }: TBookingDetailsProps) => {
  return (
    <>
      <h2>Booking Details</h2>
      <h1 className="text-3xl lg:text-4xl font-semibold text-nevyBlue ">{booking?.service?.name}</h1>
      <p className="font-bold text-2xl text-darkPrimary">
        ${booking?.service?.pricePerHour} <span className="text-gray font-semibold">per hour</span>
      </p>
      <p className="text-gray text-xl">{booking?.service?.description}</p>
      <p className="font-bold">Date: {moment(booking?.schedule.date).format("LL")}</p>
      <p className="font-bold">
        Start Time: <Tag color="blue">{moment(booking?.schedule.startTime, "HH:mm").format("hh:mm A")}</Tag>
      </p>
      <p className="font-bold">
        End Time: <Tag color="blue">{moment(booking?.schedule.endTime, "HH:mm").format("hh:mm A")}</Tag>
      </p>
    </>
  );
};

export default BookingDetails;
