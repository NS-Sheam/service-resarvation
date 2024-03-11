import { Button, Col, Row } from "antd";
import { FaExclamationTriangle } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", backgroundColor: "" }}
      className="shadow-md py-6 md:py-10 lg:py-16"
    >
      <Col
        span={22}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        className="bg-white shadow-lg space-y-4  rounded-lg"
      >
        <div className="p-4">
          <Row
            justify="center"
            align="middle"
          >
            <Col span={24}>
              <div className="flex flex-col justify-center items-center text-center">
                <FaExclamationTriangle className="text-7xl text-darkPrimary" />
                <h1 className="text-xl font-bold">No such page found at {pathname}</h1>
              </div>
            </Col>
          </Row>
          <Button
            onClick={() => navigate("/")}
            style={{ width: "100%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
          >
            Return Home
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ErrorPage;
