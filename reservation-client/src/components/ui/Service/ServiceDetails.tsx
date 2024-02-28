import { Tag } from "antd";
import { TService } from "../../../types";
type TServiceDetailsProps = {
  service: TService | undefined;
};

const ServiceDetails = ({ service }: TServiceDetailsProps) => {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-semibold text-nevyBlue ">{service?.name}</h1>
      <p className="font-bold text-2xl text-darkPrimary">
        ${service?.pricePerHour} <span className="text-gray font-semibold">per hour</span>
      </p>
      <p className="text-gray text-xl">{service?.description}</p>
      <div>
        <p className="font-semibold pb-2">Available Days:</p>
        {service?.provider?.availableSchedule?.map((schedule, index) => (
          <p className="mb-2 font-bold">
            <Tag
              key={index}
              color="blue"
            >
              {schedule?.day}
            </Tag>
          </p>
        ))}
      </div>
    </>
  );
};

export default ServiceDetails;
