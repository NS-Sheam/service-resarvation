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
  useLoginMutation,
  useProviderRegistrationMutation,
} from "../../redux/auth/auth.api";
import { toast } from "sonner";
import { TResponse, TUser } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/auth/auth.Slice";
import { verifyToken } from "../../utils/verifyToken";
/** TODO:
 * - Add autmatic login after registration
 * - Automatically redirect to page where user was before login or want to go
 *
 */

const Register = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const [customerRegistration] = useCustomerRegistrationMutation();
  const [providerRegistration] = useProviderRegistrationMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        ? ((await customerRegistration(formData)) as TResponse<any>)
        : ((await providerRegistration(formData)) as TResponse<any>);

      if (!res.error) {
        const res: any = await login({ email: data.email, password: data.password });
        const user = verifyToken(res.data.data.accessToken) as TUser;
        const userData = await fetch("http://localhost:4000/api/v1/users/me", {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: res.data.data.accessToken,
          },
        });
        const userInfo = await userData.json();
        dispatch(setUser({ user: { ...user, image: userInfo?.data?.image }, token: res.data.data.accessToken }));
        toast.success("Registered successfully. Check your email for verify.", {
          id: toastId,
          duration: 2000,
        });
        navigate("/");
      } else {
        toast.error(res?.error?.data?.errorSources[0].message || res?.error?.data?.message || "Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId, duration: 2000 });
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
              backgroundColor: isCustomer ? "#0096c7" : "#ffffff",
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
              backgroundColor: !isCustomer ? "#0096c7" : "#ffffff",
              color: !isCustomer ? "white" : "#000000",
              fontWeight: "bold",
            }}
          >
            Provider
          </Button>
        </Col>

        <Col span={24}>
          <RForm onSubmit={onSubmit}>
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
              {!isCustomer && (
                <>
                  <Col span={24}>
                    <RInput
                      style={commonInputStyle}
                      type="text"
                      name="location"
                      label="Location"
                      required
                    />
                  </Col>

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
                </>
              )}
              <Col span={24}>
                <RInput
                  style={commonInputStyle}
                  type="password"
                  name="password"
                  label="Password"
                  required
                />
              </Col>
              <Col span={24}>
                <RProfileImageUploader
                  name="image"
                  label="Image"
                />
              </Col>
            </Row>
            <Button
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
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
