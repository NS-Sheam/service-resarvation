import { useAppSelector } from "../../redux/hooks";
import CommonButton from "./CommonButton";

type TUserContactCardProps = {
  name: string;
  contactInfo: {
    icon: JSX.Element;
    info: string | undefined;
  }[];
};

const UserContactCard = ({ name, contactInfo }: TUserContactCardProps) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold text-nevyBlue">{name}</h2>
      {contactInfo.map((contactInfo, index) => (
        <p
          key={index}
          className="flex items-center gap-2"
        >
          <span className="text-darkPrimary text-xl">{contactInfo.icon}</span>
          <span className="text-gray">{contactInfo.info}</span>
        </p>
      ))}
      {user?.role === "customer" && <CommonButton>More Details</CommonButton>}
    </>
  );
};

export default UserContactCard;
