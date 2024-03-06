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
import { TService } from "../../../types";
import moment from "moment";
import Swal from "sweetalert2";
import CommonButton from "../CommonButton";

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
  const contentTemplate = (props: { StartTime: Date; IsReadonly: boolean }) => {
    return props.IsReadonly ? (
      <div className="text-center">Already Booked</div>
    ) : (
      <div className="quick-info-content">
        <div className="e-cell-content">
          <div className="content-area">
            <DatePickerComponent
              value={props.StartTime}
              placeholder="Date"
              format="yyyy-MMMM-dd hh:mm a"
              ref={startTimeObj}
              disabled
            />
          </div>
          <div className="content-area">
            <TimePickerComponent
              placeholder="End Time"
              format="hh:mm a"
              cssClass="time-picker"
              ref={endTimeObj}
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

  const handleBooking = () => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Booked!",
          text: `You have successfully booked ${service?.name} on ${moment(booking.schedule.date).format(
            "LL"
          )} from ${moment(booking.schedule.startTime, "HH:mm").format("hh:mm A")} to ${moment(
            booking.schedule.endTime,
            "HH:mm"
          ).format("hh:mm A")}`,
          icon: "success",
        });
      }
    });
  };

  const alreadyBooked: BookingData[] = [
    {
      Id: 1,
      Subject: "Booked",
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
      IsReadonly: true,
    },
    {
      Id: 2,
      Subject: "Booked",
      StartTime: new Date(2023, 1, 15, 13, 0),
      EndTime: new Date(2023, 1, 15, 14, 30),
      IsReadonly: true,
    },
    {
      Id: 3,
      Subject: "Booked",
      StartTime: new Date(2023, 1, 15, 15, 0),
      EndTime: new Date(2023, 1, 15, 16, 30),
      IsReadonly: true,
    },
    {
      Id: 4,
      Subject: "Booked",
      StartTime: new Date(2023, 1, 15, 17, 0),
      EndTime: new Date(2023, 1, 15, 18, 30),
      IsReadonly: true,
    },
  ];

  return (
    <ScheduleComponent
      selectedDate={new Date(2023, 1, 15)}
      eventSettings={{
        dataSource: alreadyBooked,
        fields: {
          subject: "Subject",
          startTime: "StartTime",
          endTime: "EndTime",
        } as EventFieldsMapping,
      }}
      editorTemplate={contentTemplate}
      eventClick={contentTemplate}
      quickInfoTemplates={{
        content: contentTemplate,
        footer: footerTemplate,
      }}
      editorFooterTemplate={footerTemplate}
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
