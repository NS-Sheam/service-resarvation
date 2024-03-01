import { useRef, useState } from "react";
import { ScheduleComponent, Day, Week, Month, Inject } from "@syncfusion/ej2-react-schedule";
import * as React from "react";
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
import { Button, Input, TimePicker, DatePicker } from "antd";
import moment from "moment";
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { toast } from "sonner";

// Set your provided Syncfusion license key here
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

function Booking() {
  let titleObj = useRef(null);
  let startTimeObj = useRef(null);
  let endTimeObj = useRef(null);

  const contentTemplate = (props) => {
    return (
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

  const buttonClickActions = (e) => {
    console.log("Clicked Event Data: ");
  };

  const handleBooking = (e) => {
    console.log("Event Data: ");
  };

  const alreadyBooked = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
      isBlock: true,
    },
    {
      Id: 2,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 13, 0),
      EndTime: new Date(2023, 1, 15, 14, 30),
      IsReadonly: true,
    },
    {
      Id: 3,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 15, 0),
      EndTime: new Date(2023, 1, 15, 16, 30),
      IsReadonly: true,
    },
    {
      Id: 4,
      Subject: "Meeting",
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
          subject: { name: "Subject" },
          startTime: { name: "StartTime" },
          endTime: { name: "EndTime" },
        },
      }}
      editorTemplate={contentTemplate}
      actionComplete={handleBooking}
      eventClick={contentTemplate}
      quickInfoTemplates={{
        content: contentTemplate,
      }}
      editorHeaderTemplate={null}
    >
      <Inject services={[Day, Week, Month]} />
    </ScheduleComponent>
  );
}

export default Booking;
