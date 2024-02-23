import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { useAppDispatch } from "../../redux/redux/hooks";
import { toast } from "sonner";
import RForm from "../form/RForm";
import RInput from "../form/RInput";

const defaultValues = {
  // email: "admin@example.com",
  // password: "admin123",
  email: "customer321@gmail.com",
  password: "customer321",
};
const Login = () => {
  // const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      // const res: any = await login(data);
      // if (!res.error) {
      //   const user = verifyToken(res.data.data.accessToken) as TUser;
      //   const data = await fetch("http://localhost:4000/api/v1/users/me", {
      //     method: "GET",
      //     credentials: "include",
      //     headers: {
      //       authorization: res.data.data.accessToken,
      //     },
      //   });
      //   const userInfo = await data.json();
      //   dispatch(setUser({ user: { ...user, image: userInfo?.data?.image }, token: res.data.data.accessToken }));
      //   toast.success("Logged in successfully", { id: toastId });
      // } else {
      //   toast.error(res.error.message, { id: toastId });
      // }
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
          <RForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
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
              </Col>
            </Row>
            <Button
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#00509d", color: "white", fontWeight: "bold" }}
            >
              Login
            </Button>
          </RForm>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
