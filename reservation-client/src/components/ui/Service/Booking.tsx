import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from "@syncfusion/ej2-react-schedule";
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

// Set your provided Syncfusion license key here
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

function Booking() {
  const handleBooking = (e: any) => {
    console.log(e);
  };
  //   {
  //     "Id": 1,
  //     "Subject": "New Year",
  //     "StartTime": "2024-01-01T00:00:00Z",
  //     "EndTime": "2024-01-01T00:00:00Z",
  //     "IsAllDay": true,
  //     "IsBlock": false,
  //     "IsReadonly": false,
  //     "RoomId": 1,
  //     "ResourceId": 1
  //     },
  //     {
  //     "Id": 2,
  //     "Subject": "May Day",
  //     "StartTime": "2024-02-29T00:00:00Z",
  //     "EndTime": "2024-05-01T00:00:00Z",
  //     "IsAllDay": true,
  //     "IsBlock": false,
  //     "IsReadonly": false,
  //     "RoomId": 1,
  //     "ResourceId": 1
  //     },
  //     {
  //     "Id": 3,
  //     "Subject": "Bering Sea Gold",
  //     "StartTime": "2024-05-02T09:00:00Z",
  //     "EndTime": "2024-05-02T10:30:00Z",
  //     "IsAllDay": false,
  //     "IsBlock": false,
  //     "IsReadonly": false,
  //     "RecurrenceRule": "FREQ=DAILY;INTERVAL=2;COUNT=10",
  //     "RoomId": 1,
  //     "ResourceId": 1
  //     },
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

  const data = [
    {
      Id: 5,
      Subject: "Your Meeting", // Custom Event for Client
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
  ];

  const eventTemplate = (props) => {
    if (props.isReadonly) {
      return <div style={{ backgroundColor: "lightgray" }}>{props.Subject}</div>;
    }
    return <div>{props.Subject}</div>;
  };

  const handlePopupClose = (e: any) => {
    console.log(e);
  };

  const buttonClickActions = (e: any) => {
    console.log("Clicked Event Data: ");
  };

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
      popupClose={handlePopupClose}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Booking;
