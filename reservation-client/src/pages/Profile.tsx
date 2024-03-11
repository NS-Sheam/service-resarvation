import { Button, Col, Flex, Row, Spin } from "antd";
import RInput from "../components/form/RInput";
import RForm from "../components/form/RForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import RProfileImageUploader from "../components/form/RProfileImageUploader";
import { useNavigate } from "react-router-dom";
import { useGetMyInfoQuery } from "../redux/auth/auth.api";
import { useEffect, useState } from "react";
import { TProvider, TResponse } from "../types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  useUpdateCustomerMutation,
  useUpdateProviderMutation,
} from "../redux/features/userManagement/userManagement.api";
import { setUser } from "../redux/auth/auth.Slice";

const Profile = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  const [updateCustomer] = useUpdateCustomerMutation();
  const [updateProvider] = useUpdateProviderMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading: isProfileLoading, isFetching: isProfileFetching, refetch } = useGetMyInfoQuery(undefined);
  const [imageUploader, setImageUploader] = useState<boolean>(false);
  const profileData = data?.data;
  useEffect(() => {
    refetch();
  }, [user, refetch]);
  if (isProfileLoading || isProfileFetching) {
    return (
      <div className="min-h-[calc(100vh-20vh)] flex justify-center items-center bg-white">
        <Spin size="large" />
      </div>
    );
  }

  const defaultValues = {
    userName: profileData?.user?.userName,
    name: profileData?.name,
    email: profileData?.email,
    phone: profileData?.phone,
    location: (profileData as TProvider)?.location,
    day: (profileData as TProvider)?.availableSchedule?.map((schedule: any) => schedule.day),
    startAndEndTime: (profileData as TProvider)?.availableSchedule?.map((schedule: any) => {
      return {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      };
    }),
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    try {
      const res =
        user?.role === "provider"
          ? ((await updateProvider({
              id: profileData!._id,
              body: data,
            })) as TResponse<any>)
          : ((await updateCustomer({
              id: profileData!._id,
              body: data,
            })) as TResponse<any>);
      if (!res.error) {
        toast.success("Profile updated successfully", { id: toastId, duration: 2000 });
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
  const handleImageChange: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    const formData = new FormData();
    formData.append("file", data.image?.originFileObj);
    try {
      const res =
        user?.role === "provider"
          ? ((await updateProvider({
              id: profileData!._id,
              body: formData,
            })) as TResponse<any>)
          : ((await updateCustomer({
              id: profileData!._id,
              body: formData,
            })) as TResponse<any>);
      if (!res.error) {
        console.log(res);
        dispatch(setUser({ user: { ...user, image: res.data.image }, token }));
        toast.success("Profile Picture updated successfully", { id: toastId, duration: 2000 });
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
    <div className="py-8">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col
          span={24}
          md={{ span: 16 }}
          className="bg-white p-4 "
        >
          <RForm onSubmit={handleImageChange}>
            <Row
              gutter={0}
              justify="start"
              align="middle"
            >
              <Col
                span={12}
                className="flex justify-start items-center gap-2"
              >
                {imageUploader ? (
                  <>
                    <RProfileImageUploader
                      name="image"
                      label="Image"
                    />
                    <Button
                      htmlType="submit"
                      style={{ width: "20%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setImageUploader(false)}
                      htmlType="submit"
                      style={{ width: "20%" }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <img
                    onClick={() => setImageUploader(true)}
                    src={profileData?.image}
                    alt="profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "1rem",
                    }}
                  />
                )}
              </Col>
            </Row>
          </RForm>
          <RForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
            <Row gutter={8}>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="userName"
                  label="User Name"
                  readOnly
                  required
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="name"
                  label="Name"
                  required
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="email"
                  label="Email"
                  readOnly
                  required
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
              >
                <RInput
                  style={commonInputStyle}
                  type="text"
                  name="phone"
                  label="Mobile No"
                  required
                />
              </Col>
              {user?.role === "provider" && (
                <>
                  <Col
                    span={24}
                    md={{ span: 12 }}
                  >
                    <RInput
                      style={commonInputStyle}
                      type="text"
                      name="location"
                      label="Location"
                      required
                    />
                  </Col>
                </>
              )}
              <Col span={24}>
                <Flex justify="start">
                  <Button
                    onClick={() => navigate("/auth/change-password")}
                    style={{ width: "20%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
                  >
                    Change Password
                  </Button>
                </Flex>
              </Col>
            </Row>
            <Col span={24}>
              <Flex justify="end">
                <Button
                  htmlType="submit"
                  style={{ width: "20%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
                >
                  Save
                </Button>
              </Flex>
            </Col>
          </RForm>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
