import { Col, Flex, Row } from "antd";
import { TService } from "../../types";

type TServiceCardProps = {
  service: TService;
};

const ServiceCard = ({ service }: TServiceCardProps) => {
  return (
    <Row
      align="middle"
      justify="center"
      className="bg-white p-4 rounded-md shadow-md"
      gutter={[0, 4]}
    >
      <Col
        span={24}
        md={{ span: 20 }}
        className="text-left"
      >
        <h3 className="text-lg font-semibold text-darkPrimary">{service.name}</h3>
        <p className="text-gray">
          <p className="font-bold text-grayBlack">Provider:</p> {service.provider.name}{" "}
          <p className="font-bold text-grayBlack">Location:</p> {service.provider.location}
        </p>
      </Col>
      <Col
        span={24}
        md={{ span: 4 }}
      >
        <Flex justify="end">
          <button className="bg-darkPrimary text-white font-semibold px-6 py-2 rounded-md outline-none border-none shadow-lg hover:bg-primary transform duration-300">
            Details
          </button>
        </Flex>
      </Col>
    </Row>
  );
};

export default ServiceCard;
