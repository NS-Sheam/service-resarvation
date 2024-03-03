import { Col, Row, Skeleton } from "antd";
import HamburgerToggler from "../../components/ui/HamburgerToggler";
import { useGetMyInfoQuery } from "../../redux/auth/auth.api";
import { useGetServicesQuery } from "../../redux/features/serviceManagement/service.api";
import CommonButton from "../../components/ui/CommonButton";
import ServiceCard from "../../components/ui/ServiceCard";
import NoItemCard from "../../components/ui/NoItemCard";

const MyServices = () => {
  const { data: user, isFetching: isUserFetching, isLoading } = useGetMyInfoQuery(undefined);

  const { data, isFetching: isServiceFetching } = useGetServicesQuery(
    [
      {
        name: "provider",
        value: user?.data?._id as string,
      },
    ],
    {
      skip: !user?.data?._id || isUserFetching || isLoading,
    }
  );
  const serviceData = data?.data;
  return (
    <div className="services-container min-h-[80vh]">
      <HamburgerToggler className="text-white" />
      <Row
        justify="center"
        align="middle"
        gutter={[0, 8]}
        className=" bg-opacity-20 w-full md:w-3/4 mx-auto px-2 py-3"
      >
        <Col
          span={24}
          md={{ span: 16 }}
          className="shadow-lg"
        >
          <Row justify="start">
            <Col>
              <CommonButton
                type="primary"
                to="/services/add"
              >
                Add Service
              </CommonButton>
            </Col>
          </Row>
        </Col>

        {isServiceFetching ? (
          <Col
            className=" shadow-lg bg-white rounded-md p-4"
            span={24}
            md={{ span: 16 }}
          >
            <Skeleton active />
          </Col>
        ) : serviceData?.length ? (
          serviceData?.map((service, index) => (
            <Col
              className=" shadow-lg"
              key={index}
              span={24}
              md={{ span: 16 }}
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
            md={{ span: 16 }}
          >
            <NoItemCard title="Service" />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MyServices;
