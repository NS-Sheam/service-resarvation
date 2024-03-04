import { Col, Row, Spin } from "antd";
import RForm from "../../components/form/RForm";
import RInput from "../../components/form/RInput";
import CommonButton from "../../components/ui/CommonButton";
import RMultipleImageUploader from "../../components/form/RMultipleImageUploader";
import { useGetMyInfoQuery } from "../../redux/auth/auth.api";
import RTextAreaInput from "../../components/form/RTextAreaInput";
import { TReduxResponse, TService } from "../../types";
import {
  useAddServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "../../redux/features/serviceManagement/service.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
/**
 * TODO: Fix update service for image upload
 */
const AddService = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: service,
    isLoading: isServiceLoading,
    isFetching: isServiceFetching,
  } = useGetSingleServiceQuery(id || "");

  const { data: user, isLoading: isUserLoading, isFetching: isUserFetching } = useGetMyInfoQuery(undefined);
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(`${service ? "Updating" : "Adding"} service...`);

    const serviceInfo = {
      ...data,
      pricePerHour: Number(data.pricePerHour),
    };

    const formData = new FormData() as any;
    formData.append("data", JSON.stringify(serviceInfo));

    // Array to hold all image fetching promises
    const imagePromises: Promise<any>[] = [];

    // service?.images?.forEach(async (image: any) => {
    //   const imagePromise = fetch(image)
    //     .then((res) => res.blob())
    //     .then((blob) => {
    //       const file = new File([blob], image.substring(image.lastIndexOf("/") + 1), { type: blob.type });
    //       console.log(file);
    //       return file;
    //     });

    //   imagePromises.push(imagePromise);
    // });

    // Wait for all image promises to resolve
    const resolvedImages = await Promise.all(imagePromises);

    // Update data.images with resolved images

    console.log(data.images);

    // Append all images to formData
    for (const image of data.images) {
      // await data.images.forEach((image: any) => {
      console.log(typeof image);

      if (typeof image === "string" || typeof image === "undefined") {
        console.log("String or undefined");

        const res = await fetch(image);
        const blob = await res.blob();
        const file = new File([blob], image.substring(image.lastIndexOf("/") + 1), { type: blob.type });
        formData.append("files", file);
      } else formData.append("files", image);
      //   });
    }
    console.log("after append");

    try {
      const res = service
        ? ((await updateService({ id: service?._id, data: formData })) as TReduxResponse<TService>)
        : ((await addService(formData)) as TReduxResponse<TService>);
      console.log(res);
      if (!res.error) {
        toast.success(res.message || `Service ${service ? "updated" : "added"} successfully`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(res?.error?.data?.errorSources[0].message || res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error.message || `Service ${service ? "updating" : "adding"} failed`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const commonInputStyle = {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "5px",
  };

  if (isUserLoading || isUserFetching || isServiceLoading || isServiceFetching) {
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
              {service ? "Update Service" : "Add Service"}
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
            <RForm
              onSubmit={onSubmit}
              defaultValues={service}
            >
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
                    defaultValue={user?.data?.phone}
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
                    defaultImages={service?.images || []}
                  />
                </Col>
              </Row>
              <Row
                justify="end"
                align="middle"
              >
                <Col
                  span={8}
                  className="text-center"
                >
                  <CommonButton htmlType="submit">{service ? "Update" : "Add"}</CommonButton>
                </Col>
              </Row>
            </RForm>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AddService;
