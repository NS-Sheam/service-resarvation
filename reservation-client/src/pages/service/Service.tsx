import { Link, useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../../redux/features/serviceManagement/service.api";
import { Col, Modal, Row, Spin } from "antd";
import { useState } from "react";
import BookingToogler from "../../components/ui/Service/BookingToogler";
import { MdAddCall, MdEmail, MdLocationPin } from "react-icons/md";
import CommonButton from "../../components/ui/CommonButton";
import ServiceDetails from "../../components/ui/Service/ServiceDetails";
import Booking from "../../components/ui/Service/Booking";
import { useGetMyInfoQuery } from "../../redux/auth/auth.api";
const Service = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading } = useGetSingleServiceQuery(id || "");
  const { data: user } = useGetMyInfoQuery(undefined);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const showViewer = (src: string) => {
    setCurrentImage(src);
    setViewerVisible(true);
  };
  const closeViewer = () => {
    setViewerVisible(false);
  };
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

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-20vh)] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

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
            <Col
              span={12}
              md={{ span: 8 }}
              className="space-y-2"
            >
              {user?.data?._id === service?.provider._id ? (
                <>
                  <Link to={`/provider/edit-service/${service?._id}`}>
                    <CommonButton
                      size="large"
                      backgroundColor="#0096c7"
                    >
                      Edit Service
                    </CommonButton>
                  </Link>
                  <CommonButton
                    size="large"
                    backgroundColor="#ff4d4f"
                  >
                    Delete Service
                  </CommonButton>
                </>
              ) : (
                <CommonButton
                  size="large"
                  onClick={() => setTabItem("Book")}
                >
                  Book Now
                </CommonButton>
              )}
            </Col>
          </Col>
        )}
        {tabItem === "Gallery" && (
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {service?.images &&
                service?.images.map((src, index) => (
                  <Col
                    key={index}
                    span={24}
                    md={{ span: 8 }}
                  >
                    <div onClick={() => showViewer(src)}>
                      <img
                        src={src}
                        alt={`Photo ${index}`}
                        style={{ width: "100%", height: "10rem", cursor: "pointer" }}
                      />
                    </div>
                  </Col>
                ))}
            </Row>
          </Col>
        )}
        {tabItem === "Book" && (
          <Col
            span={24}
            md={{ span: 22 }}
          >
            <Booking />
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
            <Link to={`/providers/${service?.provider._id}`}>
              <CommonButton>More Details</CommonButton>
            </Link>
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
      <Modal
        open={viewerVisible}
        onCancel={closeViewer}
        footer={null}
        centered
        style={{ top: 20 }}
      >
        <img
          src={currentImage}
          alt="Current"
          style={{ width: "100%", height: "100%" }}
        />
      </Modal>
    </Row>
  );
};

export default Service;
