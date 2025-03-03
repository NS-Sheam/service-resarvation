import { Col, Flex, Pagination, Row, Skeleton } from "antd";
import HamburgerToggler from "../../components/ui/HamburgerToggler";
import CommonSearchBar from "../../components/ui/CommonSearchBar";
import "../../styles/Services.css";
import { useGetServicesQuery } from "../../redux/features/serviceManagement/service.api";
import ServiceCard from "../../components/ui/ServiceCard";
import { FormEvent, useState } from "react";
import NoItemCard from "../../components/ui/NoItemCard";
import { Link } from "react-router-dom";
import CommonButton from "../../components/ui/CommonButton";
import { useAppSelector } from "../../redux/hooks";
import { useGetMyInfoQuery } from "../../redux/auth/auth.api";
import PageHead from "../../components/PageHead";
const Services = () => {
  const searchParams = new URLSearchParams(location.search);

  const { user } = useAppSelector((state) => state.auth);
  const { data: pData, isFetching: isUserFetching, isLoading } = useGetMyInfoQuery(undefined);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [providerId, setProviderId] = useState("");
  const [page, setPage] = useState<number>(1);
  const searchQuery = [
    {
      name: "searchTerm",
      value: searchTerm,
    },
    {
      name: "page",
      value: page,
    },
    {
      name: "limit",
      value: 5,
    },
  ];

  if (providerId) {
    searchQuery.push({
      name: "provider",
      value: providerId,
    });
  }
  const { data, isFetching: isServiceFetching } = useGetServicesQuery(searchQuery, {
    skip: isUserFetching || isLoading,
  });
  const serviceData = data?.data;
  const metaData = data?.meta;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <div className="services-container min-h-screen">
      <PageHead title="Services" />
      <HamburgerToggler className="text-white" />
      <Row
        justify="center"
        align="middle"
        gutter={[0, 8]}
        className=" bg-opacity-20 w-full md:w-3/4 mx-auto px-2 py-5"
      >
        <Col
          span={24}
          md={{ span: 16 }}
          className="shadow-lg "
        >
          <CommonSearchBar onChange={onChange} />
        </Col>
        {user?.role === "provider" && (
          <Col
            span={24}
            md={{ span: 16 }}
            className="shadow-lg"
          >
            <Row
              justify="space-between"
              align="middle"
              gutter={[8, 0]}
            >
              <Col span={8}>
                <Link to="/provider/add-service">
                  <CommonButton>Add Service</CommonButton>
                </Link>
              </Col>
              <Col
                span={8}
                onClick={() => setProviderId(pData?.data?._id as string)}
              >
                <CommonButton>My Service</CommonButton>
              </Col>
            </Row>
          </Col>
        )}

        {isServiceFetching ? (
          <Col
            className=" shadow-lg bg-white rounded-md p-4"
            span={24}
            md={{ span: 16 }}
          >
            <Skeleton active />
          </Col>
        ) : serviceData?.length ? (
          serviceData?.map((service, index) => (
            <Col
              className=" shadow-lg"
              key={index}
              span={24}
              md={{ span: 16 }}
            >
              <ServiceCard
                key={index}
                service={service}
              />
            </Col>
          ))
        ) : (
          <Col
            className=" shadow-lg"
            span={24}
            md={{ span: 16 }}
          >
            <NoItemCard title="Service" />
          </Col>
        )}
        <Col
          span={24}
          md={{ span: 16 }}
        >
          <Flex justify="end">
            <Pagination
              className="bg-white shadow-lg rounded-md py-2"
              current={page}
              onChange={(value) => setPage(value)}
              total={metaData?.total}
              pageSize={metaData?.limit}
            />
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default Services;
