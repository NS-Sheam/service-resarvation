import { useParams } from "react-router-dom";
import { useGetSingleProviderQuery } from "../../redux/features/userManagement/userManagement.api";
import { Col, Row } from "antd";
import { useGetServicesQuery } from "../../redux/features/serviceManagement/service.api";
import ServiceCard from "../../components/ui/ServiceCard";
import { MdAddCall, MdEmail, MdLocationPin } from "react-icons/md";
import NoItemCard from "../../components/ui/NoItemCard";

const Provider = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: provider,
    isLoading: isProviderLoading,
    isFetching: isProviderFetching,
  } = useGetSingleProviderQuery(id || "");
  const { data: services } = useGetServicesQuery([{ name: "provider", value: id || "" }], {
    skip: isProviderLoading || isProviderFetching,
  });
  const contactInfo = [
    {
      icon: <MdEmail />,
      info: provider?.email,
    },
    {
      icon: <MdAddCall />,
      info: provider?.phone,
    },
    {
      icon: <MdLocationPin />,
      info: provider?.location,
    },
  ];

  return (
    <Row
      justify="space-between"
      align="top"
      gutter={[0, 8]}
      className="my-container shadow-lg py-8 rounded-md min-h-screen"
    >
      {/* provider information side */}
      <Col
        span={24}
        md={{ span: 16 }}
        className="bg-white p-4 rounded-md min-h-[calc(100vh-20vh)]"
      >
        <Row
          justify="start"
          align="middle"
          gutter={[8, 8]}
        >
          <Col
            span={24}
            className="space-y-1 "
          >
            <h2>Provider Details</h2>
            <div className="rounded-md p-2 shadow-sm shadow-darkPrimary w-48 h-48">
              <img
                src={provider?.image}
                alt={provider?.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-nevyBlue ">{provider?.name}</h1>
            {contactInfo.map(({ info, icon }, index) => (
              <p
                key={index}
                className="flex items-center gap-1"
              >
                <span className="text-darkPrimary text-2xl flex items-center justify-center">{icon}</span>
                <span className="text-grayBlack font-bold">{info}</span>
              </p>
            ))}
          </Col>
        </Row>
      </Col>
      {/* provider or customer information side */}
      <Col
        span={24}
        md={{ span: 7 }}
        className="space-y-4 bg-grayWhite p-4 rounded-md md:min-h-[calc(100vh-20vh)] "
      >
        <h3 className="font-bold text-darkPrimary">Provider Services</h3>

        <div className="scrollable-content w-full mt-1 space-y-1 max-h-96 overflow-x-scroll">
          {services?.data && services?.data?.length > 0 ? (
            services?.data?.map((service: any) => (
              <ServiceCard
                key={service._id}
                service={service}
              />
            ))
          ) : (
            <NoItemCard title="Service" />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Provider;
