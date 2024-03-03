import { useGetMyInfoQuery } from "../../redux/auth/auth.api";
import { useGetServicesQuery } from "../../redux/features/serviceManagement/service.api";
import { useAppSelector } from "../../redux/hooks";

const MyServices = () => {
  const { data: userData } = useGetMyInfoQuery(undefined);
  console.log(userData);

  const { user } = useAppSelector((state) => state.auth);

  const { data, isFetching: isServiceFetching } = useGetServicesQuery([
    {
      name: "provider",
      value: userData?.data?._id,
    },
  ]);
  console.log(data);

  return (
    <div>
      <h1>MyServices</h1>
    </div>
  );
};

export default MyServices;
