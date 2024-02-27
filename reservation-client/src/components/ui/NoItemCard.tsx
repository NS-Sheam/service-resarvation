import { Col, Row } from "antd";

const NoItemCard = ({ title }: { title: string }) => {
  return (
    <Row
      align="middle"
      justify="center"
      className="bg-white p-4 rounded-md shadow-md"
      gutter={[0, 4]}
    >
      <Col
        span={24}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-darkPrimary">No {title} Found</h3>
      </Col>
    </Row>
  );
};

export default NoItemCard;
