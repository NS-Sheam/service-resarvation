import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProviderMutation,
  useGetSingleProviderQuery,
} from "../../redux/features/userManagement/userManagement.api";
import { Col, Row } from "antd";
import { useGetServicesQuery } from "../../redux/features/serviceManagement/service.api";
import ServiceCard from "../../components/ui/ServiceCard";
import { MdAddCall, MdEmail, MdLocationPin } from "react-icons/md";
import NoItemCard from "../../components/ui/NoItemCard";
import CommonButton from "../../components/ui/CommonButton";
import { useAppSelector } from "../../redux/hooks";
import { TResponse } from "../../types";
import { toast } from "sonner";
import Swal from "sweetalert2";
import HamburgerToggler from "../../components/ui/HamburgerToggler";
import PageHead from "../../components/PageHead";

const Provider = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: provider,
    isLoading: isProviderLoading,
    isFetching: isProviderFetching,
  } = useGetSingleProviderQuery(id || "");
  const [deleteProvider] = useDeleteProviderMutation();
  const navigate = useNavigate();
  const { data: services } = useGetServicesQuery([{ name: "provider", value: id || "" }], {
    skip: isProviderLoading || isProviderFetching,
  });
  const contactInfo = [
    {
      icon: <MdEmail />,
      info: provider?.email,
    },
    {
      icon: <MdAddCall />,
      info: provider?.phone,
    },
    {
      icon: <MdLocationPin />,
      info: provider?.location,
    },
  ];

  const handleDeleteProvider = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${provider?.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        container: "booking-sweetalert-container",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting...");
        const res = (await deleteProvider(id as string)) as TResponse<any>;

        if (!res.error) {
          toast.success(res?.message || "Provider Deleted successfully", {
            id: toastId,
            duration: 2000,
          });
          navigate("/providers");
        } else {
          toast.error(
            res?.error?.data?.errorSources[0].message || res?.error?.data?.message || "Something went wrong",
            {
              id: toastId,
            }
          );
        }
      }
    });
  };

  return (
    <div className="min-h-screen">
      <PageHead title="Provider" />
      <HamburgerToggler className="text-white" />
      <Row
        justify="space-between"
        align="top"
        gutter={[0, 8]}
        className="my-container shadow-lg py-8 rounded-md min-h-screen"
      >
        {/* provider information side */}
        <Col
          span={24}
          md={{ span: 16 }}
          className="bg-white p-4 rounded-md min-h-[calc(100vh-20vh)]"
        >
          <Row
            justify="start"
            align="middle"
            gutter={[8, 8]}
          >
            <Col
              span={24}
              className="space-y-1 "
            >
              <h2>Provider Details</h2>
              <div className="rounded-md p-2 shadow-sm shadow-darkPrimary w-48 h-48">
                <img
                  src={provider?.image}
                  alt={provider?.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-nevyBlue ">{provider?.name}</h1>
              {contactInfo.map(({ info, icon }, index) => (
                <p
                  key={index}
                  className="flex items-center gap-1"
                >
                  <span className="text-darkPrimary text-2xl flex items-center justify-center">{icon}</span>
                  <span className="text-grayBlack font-bold">{info}</span>
                </p>
              ))}
            </Col>
            {user?.role === "admin" && (
              <Col
                span={12}
                md={{ span: 8 }}
              >
                <CommonButton
                  size="large"
                  backgroundColor="#ff4d4f"
                  onClick={handleDeleteProvider}
                >
                  Delete Provider
                </CommonButton>
              </Col>
            )}
          </Row>
        </Col>
        {/* provider or customer information side */}
        <Col
          span={24}
          md={{ span: 7 }}
          className="space-y-4 bg-grayWhite p-4 rounded-md md:min-h-[calc(100vh-20vh)] "
        >
          <h3 className="font-bold text-darkPrimary">Provider Services</h3>

          <div className="scrollable-content w-full mt-1 space-y-1 max-h-96 overflow-x-scroll">
            {services?.data && services?.data?.length > 0 ? (
              services?.data?.map((service: any) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                />
              ))
            ) : (
              <NoItemCard title="Service" />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Provider;
