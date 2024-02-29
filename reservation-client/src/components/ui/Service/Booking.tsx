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

// Set your provided Syncfusion license key here
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

function Booking() {
  const alreadyBooked = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
    {
      Id: 2,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 13, 0),
      EndTime: new Date(2023, 1, 15, 14, 30),
    },
    {
      Id: 3,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 15, 0),
      EndTime: new Date(2023, 1, 15, 16, 30),
    },
    {
      Id: 4,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 17, 0),
      EndTime: new Date(2023, 1, 15, 18, 30),
    },
  ];

  const eventTemplate = (props) => {
    if (alreadyBooked.some((event) => event.StartTime === props.StartTime && event.EndTime === props.EndTime)) {
      return <div style={{ backgroundColor: "lightgray" }}>{props.Subject}</div>;
    }
    return <div>{props.Subject}</div>;
  };

  return (
    <ScheduleComponent
      showHeaderBar
      selectedDate={new Date(2023, 1, 15)}
      eventSettings={{
        dataSource: alreadyBooked,
        fields: {
          subject: { name: "Subject" },
          startTime: { name: "StartTime" },
          endTime: { name: "EndTime" },
          isReadonly: { name: "IsReadonly" }, // new field for readonly events
        },
      }}
      readonly // make the whole schedule readonly
      eventRendered={eventTemplate} // custom event template
      className="w-full"
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Booking;
