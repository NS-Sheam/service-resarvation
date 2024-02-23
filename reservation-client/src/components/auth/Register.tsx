import { FieldValues, SubmitHandler } from "react-hook-form";

import { Button, Col, Row } from "antd";

import RForm from "../form/RForm";
import RInput from "../form/RInput";
import RStartAndEndTimePicker from "../form/RStartAndEndTimePicker";
import RSelect from "../form/RSelect";
import { useState } from "react";
import RProfileImageUploader from "../form/RProfileImageUploader";
/** TODO:
 * - Add google Login
 * - Add autmatic login after registration
 * - Automatically redirect to page where user was before login or want to go
 *
 */
const defaultValues = {
  userName: "customer321",
  name: "Test User",
  email: "sakib@gmail.com",
  phone: "012323232323",
  location: "Dhaka",
  password: "customer321",
};

// availableSchedule: {
//   day: TDay;
//   startTime: string;
//   endTime: string;
// }[];

const Register = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  // const [registerUser] = useRegistrationMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const availableSchedule = data?.day?.map((day: string) => {
      return {
        day,
        startTime: data.startAndEndTime[0].format("HH:mm:ss"),
        endTime: data.startAndEndTime[1].format("HH:mm:ss"),
      };
    });

    const userInfo = {
      ...data,
    };
    if (!isCustomer) {
      userInfo["availableSchedule"] = availableSchedule;
      delete userInfo.day;
      delete userInfo.startAndEndTime;
    }

    console.log(userInfo);

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
        style={{ minHeight: "100vh" }}
      >
        <Col
          span={24}
          style={{ textAlign: "center" }}
        >
          <Button
            htmlType="submit"
            onClick={() => setIsCustomer(true)}
            style={{
              backgroundColor: isCustomer ? "#00509d" : "#ffffff",
              color: isCustomer ? "white" : "#000000",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Customer
          </Button>
          <Button
            htmlType="submit"
            onClick={() => setIsCustomer(false)}
            style={{
              backgroundColor: !isCustomer ? "#00509d" : "#ffffff",
              color: !isCustomer ? "white" : "#000000",
              fontWeight: "bold",
            }}
          >
            Provider
          </Button>
        </Col>

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
                  name="userName"
                  label="User Name"
                />
              </Col>
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="name"
                  label="Name"
                />
              </Col>
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
                  name="phone"
                  label="Mobile No"
                />
              </Col>
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="location"
                  label="Location"
                />
              </Col>
              {!isCustomer && (
                <Col span={24}>
                  <RSelect
                    label="Day"
                    name="day"
                    options={[
                      { value: "Saturday", label: "Saturday" },
                      { value: "Sunday", label: "Sunday" },
                      { value: "Monday", label: "Monday" },
                      { value: "Tuesday", label: "Tuesday" },
                      { value: "Wednesday", label: "Wednesday" },
                      { value: "Thursday", label: "Thursday" },
                      { value: "Friday", label: "Friday" },
                    ]}
                    mode="multiple"
                  />

                  <RStartAndEndTimePicker
                    style={commonInputStyle}
                    name="startAndEndTime"
                  />
                </Col>
              )}
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="password"
                  label="Password"
                />
              </Col>
              <Col span={24}>
                <RProfileImageUploader
                  name="image"
                  label="Profile Image"
                />
              </Col>
            </Row>
            <Button
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#00509d", color: "white", fontWeight: "bold" }}
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
