import Search from "antd/es/input/Search";
import { FaSearchPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type TCommonSearchBarProps = {
  size?: "large" | "middle" | "small";
  [key: string]: any;
  navigation?: boolean;
};

const CommonSearchBar = ({ size, navigation, ...remaining }: TCommonSearchBarProps) => {
  const navigate = useNavigate();
  return (
    <Search
      {...remaining}
      onSearch={(e) => {
        if (navigation) {
          navigate(`/services?searchTerm=${e}`);
        }
      }}
      placeholder="Search by service name or location"
      enterButton={
        <p className="flex justify-center items-center gap-2 font-semibold text-white">
          <span>Search</span> <FaSearchPlus />
        </p>
      }
      size={size || "large"}
    />
  );
};

export default CommonSearchBar;
