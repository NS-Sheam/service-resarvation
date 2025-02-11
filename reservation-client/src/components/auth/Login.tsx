import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
import RForm from "../form/RForm";
import RInput from "../form/RInput";
import { useLoginMutation } from "../../redux/auth/auth.api";
import { TUser } from "../../types";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/auth/auth.Slice";
import { Link, useNavigate } from "react-router-dom";
import CommonButton from "../ui/CommonButton";
const loginCredintials: { [key: string]: { email: string; password: string } } = {
  admin: {
    email: "cardik360degree@gmail.com",
    password: "superAdmin",
  },
  provider: {
    email: "7582mnsakibs@gmail.com",
    password: "123456",
  },
  customer: {
    email: "8625sakib@gmail.com",
    password: "123456",
  },
};
const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res: any = await login(data);
      const user = verifyToken(res.data.data.accessToken) as TUser;
      const userData = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          authorization: res.data.data.accessToken,
        },
      });
      const userInfo = await userData.json();
      dispatch(setUser({ user: { ...user, image: userInfo?.data?.image }, token: res.data.data.accessToken }));
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error: any) {
      toast.error(error.message, { id: toastId, duration: 2000 });
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
                  type="password"
                  name="password"
                  label="Password"
                />
                <Link to="/auth/forget-password">
                  <Button
                    style={{
                      marginBottom: "1rem",
                      backgroundColor: "transparent",
                    }}
                    type="link"
                  >
                    Forget Password
                  </Button>
                </Link>
              </Col>
            </Row>
            <CommonButton htmlType="submit">Login</CommonButton>
            {Object.keys(loginCredintials).map((key) => (
              <CommonButton
                className="mt-1"
                key={key}
                onClick={() => {
                  onSubmit(loginCredintials[key]);
                }}
              >
                Login as {key}
              </CommonButton>
            ))}
          </RForm>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
