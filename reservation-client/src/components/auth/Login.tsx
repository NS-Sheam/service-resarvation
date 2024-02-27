import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { useAppDispatch } from "../../redux/redux/hooks";
import { toast } from "sonner";
import RForm from "../form/RForm";
import RInput from "../form/RInput";
import { useLoginMutation } from "../../redux/redux/features/auth/auth.api";
import { TUser } from "../../types";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/redux/features/auth/auth.Slice";
import { Link } from "react-router-dom";
import CommonButton from "../ui/CommonButton";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res: any = await login(data);
      if (!res.error) {
        const user = verifyToken(res.data.data.accessToken) as TUser;
        const data = await fetch("http://localhost:4000/api/v1/users/me", {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: res.data.data.accessToken,
          },
        });
        const userInfo = await data.json();
        dispatch(setUser({ user: { ...user, image: userInfo?.data?.image }, token: res.data.data.accessToken }));
        toast.success("Logged in successfully", { id: toastId });
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
                  type="text"
                  name="email"
                  label="Email"
                />
              </Col>
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="password"
                  label="Password"
                />
                <Link to="/auth/forget-password">
                  <Button
                    style={{
                      marginBottom: "1rem",
                    }}
                    type="link"
                  >
                    Forget Password
                  </Button>
                </Link>
              </Col>
            </Row>
            <CommonButton htmlType="submit">Login</CommonButton>
          </RForm>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
