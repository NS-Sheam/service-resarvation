import { useRef } from "react";
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
import { Button, Input } from "antd";

// Set your provided Syncfusion license key here
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

function Booking() {
  let titleObj = useRef(null);
  let startTimeObj = useRef(null);
  let endTimeObj = useRef(null);

  const contentTemplate = (props) => {
    const isCell = props.elementType === "cell";

    return (
      <div className="quick-info-content">
        {!isCell && (
          <div className="e-cell-content">
            <div className="content-area">
              <Input
                id="title"
                ref={titleObj}
                placeholder="Title"
              />
            </div>
            <div className="content-area">
              <Input
                id="startTime"
                ref={startTimeObj}
                placeholder="Start Time"
              />
            </div>
            <div className="content-area">
              <Input
                id="endTime"
                ref={endTimeObj}
                placeholder="End Time"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const buttonClickActions = (e) => {
    console.log("Clicked Event Data: ");
    console.log("Title:", titleObj.current.value);
    console.log("Start Time:", startTimeObj.current.value);
    console.log("End Time:", endTimeObj.current.value);
  };

  const footerTemplate = (props) => {
    const isCell = props.elementType === "cell";

    return (
      <div className="quick-info-footer">
        {isCell && (
          <div className="cell-footer">
            <Button onClick={buttonClickActions}>Save</Button>
          </div>
        )}
      </div>
    );
  };

  const handleBooking = (e) => {
    console.log(e.data);
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
        footer: footerTemplate,
      }}
    >
      <Inject services={[Day, Week, Month]} />
    </ScheduleComponent>
  );
}

export default Booking;
