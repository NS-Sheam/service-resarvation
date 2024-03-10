import { Col, Row, Skeleton } from "antd";
import HamburgerToggler from "../../components/ui/HamburgerToggler";
import CommonSearchBar from "../../components/ui/CommonSearchBar";
import "../../styles/Providers.css";
import ProviderCard from "../../components/ui/ProviderCard";
import { FormEvent, useState } from "react";
import NoItemCard from "../../components/ui/NoItemCard";
import { useGetProvidersQuery } from "../../redux/features/userManagement/userManagement.api";
import BannerImage from "../../components/BannerImage";
/**
 * TODO:
 * 1. Fix the layout of the providers page
 */
const Providers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching: isProviderFetching } = useGetProvidersQuery([
    {
      name: "searchTerm",
      value: searchTerm,
    },
  ]);
  const providerData = data?.data;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <div className="providers-container">
      <div className="relative h-screen">
        <HamburgerToggler className="text-white" />
        <BannerImage />
        <Row
          justify="center"
          align="middle"
          gutter={[0, 8]}
          className=" bg-opacity-20 w-full md:w-3/4 mx-auto px-2 py-5"
        >
          <Col
            span={24}
            md={{ span: 16 }}
            className="sticky top-0 z-10 shadow-lg"
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
        </Row>
      </div>
    </div>
  );
};

export default Providers;
