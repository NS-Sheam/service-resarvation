import { Col, Row, Skeleton } from "antd";

const CardLoader = () => {
  return (
    <Row
      align="middle"
      justify="center"
      className="bg-white p-4 rounded-md shadow-md"
      gutter={[0, 4]}
    >
      <Col span={24}>
        <Skeleton active />
      </Col>
    </Row>
  );
};

export default CardLoader;
