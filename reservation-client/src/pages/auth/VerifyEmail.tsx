import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "../../redux/auth/auth.api";

import { useLocation } from "react-router-dom";
import { TResponse } from "../../types";

const VerifyEmail = () => {
  const [VerifyEmail] = useVerifyEmailMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";

  const handleVerify = async () => {
    const toastId = toast.loading("Email verification in progress...");
    try {
      const res = (await VerifyEmail({ token })) as TResponse<any>;

      if (res.error) {
        console.log("res.error", res.error);

        toast.error("Verification Unsuccessful", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Email verified successfully", { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId, duration: 2000 });
    }
  };

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
            gutter={[0, 8]}
          >
            <Col span={24}>
              <h1 className="text-center text-2xl font-bold text-darkPrimary">Verify Your Email</h1>
              <p className="text-center font-bold">Click the button below to verify your email</p>
            </Col>

            <Col span={24}>
              <Button
                onClick={handleVerify}
                style={{ width: "100%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
              >
                Verify
              </Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default VerifyEmail;
