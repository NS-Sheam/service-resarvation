import { Col, Row } from "antd";
import { useState } from "react";
import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";
import HamburgerToggler from "../../components/ui/HamburgerToggler";

const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <HamburgerToggler className="md:hidden text-black" />
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", position: "relative" }}
        className="shadow-md py-14 md:py-16 lg:py-20"
      >
        <Col
          span={22}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          className="bg-white shadow-lg space-y-4 rounded-lg"
        >
          <Row
            justify="center"
            align="middle"
          >
            <Col
              onClick={() => setShowRegister(false)}
              span={12}
              className="border-b-4 border-darkPrimary"
            >
              <p
                className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
                  !showRegister ? "bg-grayWhite" : ""
                }`}
              >
                Login
              </p>
              <hr className={`h-2 w-full bg-darkPrimary ${!showRegister ? "visible" : "hidden"}`} />
            </Col>
            <Col
              onClick={() => setShowRegister(true)}
              span={12}
            >
              <p
                className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
                  showRegister ? "bg-grayWhite" : ""
                }`}
              >
                Register
              </p>
              <hr className={`h-2 w-full bg-darkPrimary ${showRegister ? "visible" : "hidden"}`} />
            </Col>
          </Row>
          {showRegister ? <Register /> : <Login />}
        </Col>
      </Row>
    </>
  );
};

export default Auth;
