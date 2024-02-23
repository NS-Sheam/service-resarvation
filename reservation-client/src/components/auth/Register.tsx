import { FieldValues, SubmitHandler } from "react-hook-form";

import { Button, Col, Row } from "antd";

import RForm from "../form/RForm";
import RInput from "../form/RInput";
/** TODO:
 * - Add google Login
 * - Add autmatic login after registration
 * - Automatically redirect to page where user was before login or want to go
 *
 */
const defaultValues = {
  userName: "customer321",
  name: {
    firstName: "Customer",
    middleName: "Nazmus",
    lastName: "Sakib",
  },
  email: "sakib@gmail.com",
  mobileNo: "012323232323",
  gender: "male",
};

const Register = () => {
  // const [registerUser] = useRegistrationMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      password: data.password,
      customer: {
        ...data,
      },
    };

    // const formData = new FormData();
    // formData.append("data", JSON.stringify(userInfo));
    // if (data.image) formData.append("file", data.image?.originFileObj);
    // try {
    //   const res = (await registerUser(formData)) as TReduxResponse<any>;
    //   if (!res.error) {
    //     toast.success("Registered successfully");
    //   }
    // } catch (error: any) {
    //   toast.error(error.message || "Something went wrong");
    // }
  };
  return (
    <div className="p-4">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col span={24}>
          <RForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
            <Row gutter={8}>
              <Col span={24}>
                <RInput
                  type="text"
                  name="userName"
                  label="User Name"
                />
              </Col>
              <Col span={24}>
                <RInput
                  type="text"
                  name="name"
                  label="Name"
                />
              </Col>
              <Col span={24}>
                <RInput
                  type="text"
                  name="email"
                  label="Email"
                />
              </Col>
              <Col span={24}>
                <RInput
                  type="text"
                  name="phone"
                  label="Mobile No"
                />
              </Col>
              <Col span={24}>
                <RInput
                  type="text"
                  name="location"
                  label="Location"
                />
              </Col>
              <Col span={24}>
                <RInput
                  type="text"
                  name="password"
                  label="Password"
                />
              </Col>
            </Row>
            <Button
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#fa8232", color: "white", fontWeight: "bold" }}
            >
              Register
            </Button>
          </RForm>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
