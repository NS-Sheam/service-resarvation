import "../../../styles/Banner.css";
import { Col, Row, Skeleton } from "antd";
import HamburgerToggler from "../HamburgerToggler";
import { ChangeEvent, useState } from "react";
import CommonSearchBar from "../CommonSearchBar";
import { useGetServicesQuery } from "../../../redux/features/serviceManagement/service.api";
import ServiceCard from "../ServiceCard";
import NoItemCard from "../NoItemCard";
const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchQuery = [
    {
      name: "searchTerm",
      value: searchTerm,
    },
  ];
  const { data, isFetching: isServiceFetching } = useGetServicesQuery(searchQuery);
  const serviceData = data?.data;

  const handleSetSerchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <div className="container max-w-7xl mx-auto">
      <HamburgerToggler />
      <Row
        align="middle"
        justify="center"
        className="text-center min-h-screen px-2"
      >
        <Col
          span={24}
          md={{ span: 14 }}
          style={{ height: "100%", position: "relative" }}
        >
          <CommonSearchBar
            size="large"
            navigation={true}
            onChange={handleSetSerchQuery}
          />

          {searchTerm.length > 0 && (
            <div className="scrollable-content absolute w-full mt-1 space-y-1 max-h-44 overflow-x-scroll">
              {isServiceFetching ? (
                <Col
                  className=" shadow-lg bg-white rounded-md p-4"
                  span={24}
                >
                  <Skeleton active />
                </Col>
              ) : serviceData?.length ? (
                serviceData?.map((service, index) => (
                  <Col
                    className=" shadow-lg"
                    key={index}
                    span={24}
                  >
                    <ServiceCard
                      key={index}
                      service={service}
                    />
                  </Col>
                ))
              ) : (
                <Col
                  className=" shadow-lg"
                  span={24}
                >
                  <NoItemCard title="Service" />
                </Col>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
