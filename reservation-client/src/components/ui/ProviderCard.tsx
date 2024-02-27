import { Col, Flex, Row } from "antd";
import { TProvider } from "../../types";

type TProviderCardProps = {
  provider: TProvider;
};

const ProviderCard = ({ provider }: TProviderCardProps) => {
  return (
    <Row
      align="middle"
      justify="center"
      className="bg-white p-4 rounded-md shadow-md"
      gutter={[8, 8]}
    >
      <Col
        span={24}
        md={{ span: 4 }}
        className="w-24 h-24 rounded-lg overflow-hidden"
      >
        <img
          className="w-full h-full"
          src={provider.image}
          alt=""
        />
      </Col>

      <Col
        span={24}
        md={{ span: 16 }}
        className="text-left"
      >
        <h3 className="text-lg font-semibold text-darkPrimary">{provider.name}</h3>
        <p className="text-gray">
          <p className="font-bold text-grayBlack">Provider:</p> {provider.name}{" "}
          <p className="font-bold text-grayBlack">Location:</p> {provider.location}
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

export default ProviderCard;
