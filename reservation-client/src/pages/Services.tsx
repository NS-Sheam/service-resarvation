import { Col, Row } from "antd";
import HamburgerToggler from "../components/ui/HamburgerToggler";
import CommonSearchBar from "../components/CommonSearchBar";
import "../styles/Services.css";
import { useGetServicesQuery } from "../redux/features/serviceManagement/service.api";
import ServiceCard from "../components/ui/ServiceCard";
import { FormEvent, useState } from "react";
/**
 * TODO:
 * 1. Fix the layout of the services page
 */
const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetServicesQuery([
    {
      name: "searchTerm",
      value: searchTerm,
    },
  ]);
  const serviceData = data?.data;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <div>
      <HamburgerToggler className="md:hidden text-black sticky top-0 right-0 " />
      <div className="services-container min-h-[80vh]">
        <Row
          justify="center"
          align="middle"
          gutter={[0, 8]}
          className=" bg-opacity-20 w-full md:w-3/4 mx-auto px-2 py-3"
        >
          <Col
            span={24}
            md={{ span: 16 }}
            className="sticky top-0 z-10 shadow-lg"
          >
            <CommonSearchBar onChange={onChange} />
          </Col>

          {serviceData?.map((service, index) => (
            <Col
              key={index}
              span={24}
              md={{ span: 16 }}
            >
              <ServiceCard
                key={index}
                service={service}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Services;
