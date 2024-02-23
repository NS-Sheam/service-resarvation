import { FieldValues, SubmitHandler } from "react-hook-form";

import { Button, Col, Row } from "antd";

import RForm from "../form/RForm";
import RInput from "../form/RInput";
import RStartAndEndTimePicker from "../form/RStartAndEndTimePicker";
import RSelect from "../form/RSelect";
import { useState } from "react";
import RProfileImageUploader from "../form/RProfileImageUploader";
import {
  useCustomerRegistrationMutation,
  useProviderRegistrationMutation,
} from "../../redux/redux/features/auth/auth.api";
import { toast } from "sonner";
import { TReduxResponse, TResponse } from "../../types";
/** TODO:
 * - Add google Login
 * - Add autmatic login after registration
 * - Automatically redirect to page where user was before login or want to go
 *
 */
const defaultValues = {
  userName: "testUser",
  name: "Test User",
  email: "testuser@gmail.com",
  phone: "012323232323",
  location: "Dhaka",
  password: "testUser",
};

// availableSchedule: {
//   day: TDay;
//   startTime: string;
//   endTime: string;
// }[];

const Register = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const [customerRegistration] = useCustomerRegistrationMutation();
  const [providerRegistration] = useProviderRegistrationMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering...");

    const availableSchedule = data?.day?.map((day: string) => {
      return {
        day,
        startTime: data.startAndEndTime[0].format("HH:mm:ss"),
        endTime: data.startAndEndTime[1].format("HH:mm:ss"),
      };
    });

    const userInfo: any = {
      password: data.password,
    };

    if (!isCustomer) {
      userInfo.provider = {
        ...data,
      };
      delete userInfo.provider.image;
    } else {
      userInfo.customer = {
        ...data,
      };
      delete userInfo.customer.image;
    }

    if (!isCustomer) {
      userInfo.provider["availableSchedule"] = availableSchedule;
      delete userInfo.provider.day;
      delete userInfo.provider.startAndEndTime;
      delete userInfo.provider.password;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(userInfo));
    if (data.image) formData.append("file", data.image?.originFileObj);
    try {
      const res = isCustomer
        ? ((await customerRegistration(userInfo)) as TResponse<any>)
        : ((await providerRegistration(userInfo)) as TResponse<any>);

      console.log(res);

      if (!res.error) {
        toast.success("Registered successfully");
      } else {
        toast.error(res?.error?.data?.errorSources[0].message || res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId });
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
                  required
                />
              </Col>
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="name"
                  label="Name"
                  required
                />
              </Col>
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="email"
                  label="Email"
                  required
                />
              </Col>
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="phone"
                  label="Mobile No"
                  required
                />
              </Col>
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="location"
                  label="Location"
                  required
                />
              </Col>
              {!isCustomer && (
                <Col span={24}>
                  <RSelect
                    required
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
                    required
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
                  required
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
