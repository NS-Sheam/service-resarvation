import { Col, Row, Spin } from "antd";
import RForm from "../../components/form/RForm";
import RInput from "../../components/form/RInput";
import CommonButton from "../../components/ui/CommonButton";
import RMultipleImageUploader from "../../components/form/RMultipleImageUploader";
import { useGetMyInfoQuery } from "../../redux/auth/auth.api";
import RTextAreaInput from "../../components/form/RTextAreaInput";
import { TReduxResponse, TService } from "../../types";
import { useAddServiceMutation } from "../../redux/features/serviceManagement/service.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

const AddService = () => {
  const { data: user, isLoading: isUserLoading, isFetching: isUserFetching } = useGetMyInfoQuery(undefined);
  const [addService] = useAddServiceMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Product...");
    const serviceInfo = {
      ...data,
    };

    const formData = new FormData() as any;
    formData.append("data", JSON.stringify(serviceInfo));

    await data?.images?.forEach((image: any) => {
      formData.append("file", image);
    });
    try {
      const res = (await addService(formData)) as TReduxResponse<TService>;

      if (!res.error) {
        toast.success(res.message || "Product added successfully", { id: toastId, duration: 2000 });
      } else {
        toast.error(res.error.message || "Product adding failed", { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error(error.message || "Product adding failed", { id: toastId, duration: 2000 });
    }
  };

  const commonInputStyle = {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "5px",
  };

  if (isUserLoading || isUserFetching) {
    return (
      <div className="min-h-[calc(100vh-20vh)] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", position: "relative" }}
      className="shadow-md py-14 md:py-16 lg:py-20"
    >
      <Col
        span={22}
        md={{ span: 16 }}
        className="p-4 bg-white shadow-lg space-y-4 rounded-lg"
      >
        <Row
          justify="center"
          align="middle"
        >
          <Col
            span={24}
            className="border-b-4 border-darkPrimary"
          >
            <p className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer bg-grayWhite`}>
              Add Service
            </p>
            <hr className={`h-2 w-full bg-darkPrimary`} />
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh" }}
        >
          <Col span={24}>
            <RForm onSubmit={onSubmit}>
              <Row gutter={8}>
                <Col
                  span={24}
                  md={12}
                >
                  <RInput
                    style={commonInputStyle}
                    type="text"
                    name="name"
                    label="Service Name"
                    required
                  />
                </Col>
                <Col
                  span={24}
                  md={12}
                >
                  <RInput
                    style={commonInputStyle}
                    type="text"
                    name="location"
                    label="Location"
                    defaultValue={user?.data?.location}
                    required
                  />
                </Col>
                <Col
                  span={24}
                  md={12}
                >
                  <RInput
                    style={commonInputStyle}
                    type="text"
                    name="phone"
                    label="Mobile No"
                    required
                  />
                </Col>
                <Col
                  span={24}
                  md={12}
                >
                  <RInput
                    style={commonInputStyle}
                    type="number"
                    name="pricePerHour"
                    label="Price Per Hour"
                    required
                  />
                </Col>
                <Col span={24}>
                  <RTextAreaInput
                    style={commonInputStyle}
                    name="description"
                    label="Description"
                    required
                  />
                </Col>
                <Col span={24}>
                  <RMultipleImageUploader
                    name="images"
                    label="Image"
                  />
                </Col>
              </Row>
              <CommonButton htmlType="submit">Register</CommonButton>
            </RForm>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AddService;
