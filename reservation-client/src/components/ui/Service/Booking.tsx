import { useRef } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  ViewDirective,
  ViewsDirective,
  EventFieldsMapping,
} from "@syncfusion/ej2-react-schedule";
import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import { registerLicense } from "@syncfusion/ej2-base";
import "../../../styles/Booking.css";
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { TBooking, TReduxResponse, TService } from "../../../types";
import moment from "moment";
import Swal from "sweetalert2";
import CommonButton from "../CommonButton";
import { toast } from "sonner";
import {
  useAddBookingMutation,
  useGetProviderBookingByProviderIdQuery,
} from "../../../redux/features/bookingManagement/bookingApi.api";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { weekDayNumbers } from "../../../utils/booking.utils";
import { Spin } from "antd";

// Set your provided Syncfusion license key here
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

interface BookingData {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  IsReadonly: boolean;
}
type TBookingProps = {
  service: TService;
};

function Booking({ service }: TBookingProps) {
  const startTimeObj = useRef<DatePickerComponent>(null); // Ref for DatePickerComponent
  const endTimeObj = useRef<TimePickerComponent>(null); // Ref for TimePickerComponent
  const [addbooking] = useAddBookingMutation();
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: bookings,
    isLoading: isBooking,
    isFetching: isBookingFetching,
  } = useGetProviderBookingByProviderIdQuery(service?.provider._id);

  const navigate = useNavigate();

  const handleBooking = async () => {
    const booking = {
      service: service?._id,
      schedule: {
        date: moment(startTimeObj.current?.value).format("YYYY-MM-DD"),
        startTime: moment(startTimeObj.current?.value).format("HH:mm"),
        endTime: moment(endTimeObj.current?.value).format("HH:mm"),
      },
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to book ${service?.name} on ${moment(booking.schedule.date).format("LL")} from ${moment(
        booking.schedule.startTime,
        "HH:mm"
      ).format("hh:mm A")} to ${moment(booking.schedule.endTime, "HH:mm").format("hh:mm A")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!",
      customClass: {
        container: "booking-sweetalert-container",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!user) {
          toast.error("You need to login to book a service");
          navigate("/auth");
          return;
        }

        const toastId = toast.loading("Booking...");
        const res = (await addbooking(booking as any)) as TReduxResponse<TBooking>;

        if (!res.error) {
          toast.success(res?.message || "Booking successful", {
            id: toastId,
            duration: 2000,
          });
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
  const contentTemplate = (props: { StartTime: Date; IsReadonly: boolean }) => {
    return (
      <div className="quick-info-content">
        <div className="e-cell-content">
          <div className="content-area">
            <DatePickerComponent
              value={props.StartTime}
              placeholder="Date"
              format="yyyy-MMMM-dd hh:mm a"
              ref={startTimeObj}
              disabled={props.IsReadonly}
              readOnly
            />
          </div>
          <div className="content-area">
            <TimePickerComponent
              placeholder="End Time"
              format="hh:mm a"
              cssClass="time-picker"
              ref={endTimeObj}
              enabled={!props.IsReadonly}
            />
          </div>
        </div>
      </div>
    );
  };

  const footerTemplate = () => {
    return (
      <div className="quick-info-footer">
        <CommonButton
          width="30%"
          onClick={handleBooking}
        >
          Book Now
        </CommonButton>
      </div>
    );
  };

  const alreadyBooked: BookingData[] | undefined = bookings?.map((booking, index) => {
    const { schedule } = booking;
    const startTimeParts = schedule.startTime.split(":").map((part) => parseInt(part, 10));
    const endTimeParts = schedule.endTime.split(":").map((part) => parseInt(part, 10));

    return {
      Id: index + 1,
      Subject: "Booked",
      StartTime: new Date(
        new Date(schedule.date).getFullYear(),
        new Date(schedule.date).getMonth(),
        new Date(schedule.date).getDate(),
        startTimeParts[0],
        startTimeParts[1]
      ),
      EndTime: new Date(
        new Date(schedule.date).getFullYear(),
        new Date(schedule.date).getMonth(),
        new Date(schedule.date).getDate(),
        endTimeParts[0],
        endTimeParts[1]
      ),
      IsReadonly: true,
    };
  });

  if (isBooking || isBookingFetching) {
    return (
      <div className="min-h-[calc(100vh-20vh)] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ScheduleComponent
      selectedDate={new Date()}
      eventSettings={{
        dataSource: alreadyBooked,
        fields: {
          subject: "Subject",
          startTime: "StartTime",
          endTime: "EndTime",
          isReadonly: "IsReadonly",
          cssClass: "CustomCssClass",
        } as EventFieldsMapping,
      }}
      editorTemplate={contentTemplate}
      eventClick={contentTemplate}
      quickInfoTemplates={{
        content: contentTemplate,
        footer: footerTemplate,
      }}
      editorFooterTemplate={footerTemplate}
      workDays={weekDayNumbers(service)}
      showWeekend={false}
      startHour={service.provider.availableSchedule[0].startTime}
      endHour={service.provider.availableSchedule[0].endTime}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="Month" />
      </ViewsDirective>
      <Inject services={[Day, Week, Month]} />
    </ScheduleComponent>
  );
}

export default Booking;
