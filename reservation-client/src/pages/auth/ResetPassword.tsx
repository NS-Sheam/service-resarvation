import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../redux/auth/auth.api";

import RForm from "../../components/form/RForm";
import RInput from "../../components/form/RInput";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Resetting password...");
    try {
      const res: any = await resetPassword({ data, token });
      console.log(res);

      if (!res.error) {
        toast.success("Password reset successfully", { id: toastId });
      } else {
        toast.error(res?.error?.data?.errorSources[0].message || res?.error?.data?.message || res.error.message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };
  const commonInputStyle = {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "5px",
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
          >
            <Col span={24}>
              <RForm onSubmit={onSubmit}>
                <Row gutter={8}>
                  <Col span={24}>
                    <RInput
                      style={commonInputStyle}
                      type="email"
                      name="email"
                      label="Email"
                    />
                  </Col>
                  <Col span={24}>
                    <RInput
                      style={commonInputStyle}
                      type="password"
                      name="newPassword"
                      label="New Password"
                    />
                  </Col>
                </Row>
                <Button
                  htmlType="submit"
                  style={{ width: "100%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
                >
                  Reset Password
                </Button>
              </RForm>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
