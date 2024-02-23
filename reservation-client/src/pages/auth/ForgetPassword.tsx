import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import { useForgetPasswordMutation } from "../../redux/redux/features/auth/auth.api";

import RForm from "../../components/form/RForm";
import RInput from "../../components/form/RInput";
import { useState } from "react";
import { IoIosCloudDone } from "react-icons/io";

const ForgetPassword = () => {
  const [sentEmail, setSentEmail] = useState(false);

  const [forgetPassword] = useForgetPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing password...");

    try {
      const res: any = await forgetPassword(data);

      if (!res.error) {
        toast.success("Password changed successfully", { id: toastId });
        setSentEmail(true);
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
              {sentEmail ? (
                <div className="flex flex-col justify-center items-center text-center">
                  <IoIosCloudDone className="text-7xl text-primary" />
                  <h1 className="text-xl font-bold">Reset password link send to the email</h1>
                </div>
              ) : (
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
                  </Row>
                  <Button
                    htmlType="submit"
                    style={{ width: "100%", backgroundColor: "#00509d", color: "white", fontWeight: "bold" }}
                  >
                    Send Reset Password Link
                  </Button>
                </RForm>
              )}
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ForgetPassword;
