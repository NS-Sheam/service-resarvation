import { useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../../redux/features/serviceManagement/service.api";
import { Col, Row } from "antd";
import { useState } from "react";
import BookingToogler from "../../components/ui/Service/BookingToogler";
import { MdAddCall, MdEmail, MdLocationPin } from "react-icons/md";
import CommonButton from "../../components/ui/CommonButton";
import ServiceDetails from "../../components/ui/Service/ServiceDetails";
import PhotoAlbum from "react-photo-album";
const Service = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, isFetching } = useGetSingleServiceQuery(id || "");
  const [tabItem, setTabItem] = useState("Details");
  const providerContactInfos = [
    {
      icon: <MdLocationPin />,
      info: service?.provider.location,
    },
    {
      icon: <MdEmail />,
      info: service?.provider.email,
    },
    {
      icon: <MdAddCall />,
      info: service?.provider.phone,
    },
  ];
  console.log(service);

  if (isLoading || isFetching) {
    return <p>loading...</p>;
  }

  const photos = service?.images.map((image) => ({
    src: image,
    width: 1000,
    height: 800,
    srcSet: [
      { src: image, width: 400, height: 300 },
      { src: image, width: 200, height: 150 },
    ],
  }));

  return (
    <Row
      justify="center"
      align="top"
      gutter={[0, 8]}
      className="my-container my-5 shadow-lg p-4 rounded-md min-h-[calc(100vh-20vh)]"
    >
      {/* service information side */}
      <Col
        span={24}
        md={{ span: 16 }}
      >
        <Col
          span={24}
          className="mb-2"
        >
          <BookingToogler
            tabItem={tabItem}
            setTabItem={setTabItem}
          />
        </Col>

        {tabItem === "Details" && (
          <Col
            span={24}
            className="space-y-1"
          >
            <ServiceDetails service={service} />
            <Col span={6}>
              <CommonButton
                size="large"
                onClick={() => setTabItem("Book")}
              >
                Book Now
              </CommonButton>
            </Col>
          </Col>
        )}
        {tabItem === "Gallery" && (
          <Col
            span={24}
            md={{ span: 16 }}
          >
            <PhotoAlbum
              layout="rows"
              photos={photos!}
            />
          </Col>
        )}
      </Col>
      {/* provider information side */}
      <Col
        span={24}
        md={{ span: 8 }}
        className="space-y-4"
      >
        <h3 className="font-bold text-darkPrimary">Service Provider</h3>
        <Row
          gutter={[8, 8]}
          align="middle"
          justify="space-around"
          className="bg-grayWhite p-4 rounded-md shadow-md "
        >
          <Col span={16}>
            <h2 className="text-xl md:text-2xl font-semibold text-nevyBlue">{service?.provider.name}</h2>
            {providerContactInfos.map((contactInfo, index) => (
              <p
                key={index}
                className="flex items-center gap-2"
              >
                <span className="text-darkPrimary text-xl">{contactInfo.icon}</span>
                <span className="text-gray">{contactInfo.info}</span>
              </p>
            ))}
            <CommonButton>More Details</CommonButton>
          </Col>
          <Col
            span={8}
            style={{
              border: "3px solid #0096c7",
            }}
            className="rounded-md p-2 shadow-sm shadow-darkPrimary w-32 h-32"
          >
            <img
              src={service?.provider.image}
              alt={service?.provider.name}
              className="w-full h-full object-cover rounded-md"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Service;
