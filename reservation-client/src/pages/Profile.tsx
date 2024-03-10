import { Button, Col, Flex, Row } from "antd";
import RInput from "../components/form/RInput";
import RForm from "../components/form/RForm";
import { useAppSelector } from "../redux/hooks";
import RSelect from "../components/form/RSelect";
import RStartAndEndTimePicker from "../components/form/RStartAndEndTimePicker";
import RProfileImageUploader from "../components/form/RProfileImageUploader";
import { useNavigate } from "react-router-dom";
import { useGetMyInfoQuery } from "../redux/auth/auth.api";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data } = useGetMyInfoQuery(undefined);
  const profileData = data?.data;

  const onSubmit = (data: any) => {
    console.log(data);
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
          <RForm onSubmit={onSubmit}>
            <Row
              gutter={0}
              justify="start"
              align="middle"
            >
              <Col
                span={12}
                className="flex justify-start items-center"
              >
                <RProfileImageUploader
                  defaultImage={profileData?.image}
                  name="image"
                  label="Image"
                />
                <Button
                  onClick={() => navigate("/auth/change-password")}
                  htmlType="submit"
                  style={{ width: "20%", backgroundColor: "#0096c7", color: "white", fontWeight: "bold" }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </RForm>
          <RForm onSubmit={onSubmit}>
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
              {user?.role === "Provider" && (
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

                  <Col
                    span={24}
                    md={{ span: 12 }}
                  >
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
                <Flex justify="start">
                  <Button
                    onClick={() => navigate("/auth/change-password")}
                    htmlType="submit"
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
