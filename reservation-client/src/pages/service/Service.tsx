import { useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../../redux/features/serviceManagement/service.api";
import { Col, Row, Tag } from "antd";
import { useState } from "react";
import BookingToogler from "../../components/ui/Service/BookingToogler";

const Service = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service } = useGetSingleServiceQuery(id || "");
  const [tabItem, setTabItem] = useState("Details");

  console.log(service);

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 8]}
      className="my-container my-5 shadow-lg p-4 rounded-md"
    >
      {/* service information side */}
      <Col
        span={24}
        md={{ span: 16 }}
      >
        <Col span={24}>
          <BookingToogler
            tabItem={tabItem}
            setTabItem={setTabItem}
          />
        </Col>

        <Col
          span={24}
          className="space-y-2"
        >
          <h1 className="text-3xl lg:text-4xl font-semibold text-nevyBlue ">{service?.name}</h1>
          <p className="font-bold text-2xl text-darkPrimary">
            ${service?.pricePerHour} <span className="text-gray font-semibold">per hour</span>
          </p>
          <p className="text-gray text-xl">{service?.description}</p>
          <div>
            <p className="font-semibold pb-2">Available Days:</p>
            {service?.provider?.availableSchedule?.map((schedule, index) => (
              <p className="mb-2 font-bold">
                <Tag
                  key={index}
                  color="blue"
                >
                  {schedule?.day}
                </Tag>
              </p>
            ))}
          </div>
        </Col>
        {/* <Col
          span={24}
          md={{ span: 16 }}
        >
          <img
            src={service?.images[0]}
            alt={service?.name}
            className="w-full h-96 object-cover rounded-md"
          />
        </Col> */}
      </Col>
      {/* provider information side */}
      <Col
        span={24}
        md={{ span: 8 }}
      >
        <h3 className="font-bold text-darkPrimary">Service Provider</h3>
        <h2 className="text-xl md:text-2xl font-semibold text-nevyBlue">{service?.provider.name}</h2>
        <p>{service?.provider.location}</p>
      </Col>
    </Row>
  );
};

export default Service;
