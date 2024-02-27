import Search from "antd/es/input/Search";
import { FaSearchPlus } from "react-icons/fa";

type TCommonSearchBarProps = {
  size?: "large" | "middle" | "small";
  [key: string]: any;
};

const CommonSearchBar = ({ size, ...remaining }: TCommonSearchBarProps) => {
  return (
    <Search
      {...remaining}
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
