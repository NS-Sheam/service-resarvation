import { Col, Flex, Row } from "antd";
import { TService } from "../../types";
import { Link } from "react-router-dom";

type TServiceCardProps = {
  service: TService;
};

const ServiceCard = ({ service }: TServiceCardProps) => {
  return (
    <Row
      align="middle"
      justify="center"
      className="item-card relative bg-white p-4 rounded-md shadow-md overflow-hidden"
      gutter={[8, 8]}
    >
      <div className="triangle triangle1"></div>
      <div className="triangle triangle2"></div>
      <Col
        span={8}
        md={{ span: 4 }}
        className="w-24 h-24 rounded-lg overflow-hidden"
      >
        <img
          className="w-full h-full"
          src={service?.images[0]}
          alt=""
        />
      </Col>
      <Col
        span={16}
        className="text-left"
      >
        <h3 className="text-lg font-semibold text-darkPrimary">{service.name}</h3>
        <div className="text-gray">
          <p className="font-bold text-grayBlack">Provider:</p> {service.provider.name}{" "}
          <p className="font-bold text-grayBlack">Location:</p> {service.provider.location}
        </div>
      </Col>
      <Col
        span={24}
        md={{ span: 4 }}
      >
        <Flex justify="end">
          <Link to={`/services/${service._id}`}>
            <button className="bg-darkPrimary text-white font-semibold px-6 py-2 rounded-md outline-none border-none shadow-lg hover:bg-primary transform duration-300">
              Details
            </button>
          </Link>
        </Flex>
      </Col>
    </Row>
  );
};

export default ServiceCard;
