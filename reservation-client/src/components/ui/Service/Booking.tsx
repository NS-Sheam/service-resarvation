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

// Set your provided Syncfusion license key here
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

interface BookingData {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  IsReadonly: boolean;
}

function Booking() {
  let startTimeObj = useRef<TimePickerComponent>(null);
  let endTimeObj = useRef<TimePickerComponent>(null);

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
              disabled
            />
          </div>
          <div className="content-area">
            <TimePickerComponent
              placeholder="End Time"
              format="hh:mm a"
              cssClass="time-picker"
            />
          </div>
        </div>
      </div>
    );
  };

  const buttonClickActions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("Clicked Event Data: ");
  };

  const handleBooking = (e: { data: BookingData }) => {
    console.log("Event Data: ", e.data);
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
      actionComplete={handleBooking}
      eventClick={contentTemplate}
      quickInfoTemplates={{
        content: contentTemplate,
      }}
      editorHeaderTemplate={null}
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
