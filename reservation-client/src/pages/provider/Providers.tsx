import { Col, Flex, Pagination, Row, Skeleton } from "antd";
import HamburgerToggler from "../../components/ui/HamburgerToggler";
import CommonSearchBar from "../../components/ui/CommonSearchBar";
import "../../styles/Providers.css";
import ProviderCard from "../../components/ui/ProviderCard";
import { FormEvent, useState } from "react";
import NoItemCard from "../../components/ui/NoItemCard";
import { useGetProvidersQuery } from "../../redux/features/userManagement/userManagement.api";
/**
 * TODO:
 * 1. Fix the layout of the providers page
 */
const Providers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState<number>(1);
  const { data, isFetching: isProviderFetching } = useGetProvidersQuery([
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
  ]);
  const providerData = data?.data;
  const metaData = data?.meta;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <div className="providers-container min-h-screen">
      <HamburgerToggler />
      <Row
        justify="center"
        align="middle"
        gutter={[0, 8]}
        className=" bg-opacity-20 w-full md:w-3/4 mx-auto px-2 py-5"
      >
        <Col
          span={24}
          md={{ span: 16 }}
          className="shadow-lg"
        >
          <CommonSearchBar onChange={onChange} />
        </Col>
        {isProviderFetching ? (
          <Col
            className=" shadow-lg bg-white rounded-md p-4"
            span={24}
            md={{ span: 16 }}
          >
            <Skeleton active />
          </Col>
        ) : providerData?.length ? (
          providerData?.map((provider, index) => (
            <Col
              className=" shadow-lg"
              key={index}
              span={24}
              md={{ span: 16 }}
            >
              <ProviderCard
                key={index}
                provider={provider}
              />
            </Col>
          ))
        ) : (
          <Col
            className=" shadow-lg"
            span={24}
            md={{ span: 16 }}
          >
            <NoItemCard title="Provider" />
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

export default Providers;
