import { Button } from "antd";
import { ReactNode } from "react";
import "../../styles/CommonSearchBar.css";
type TCommonButtonProps = {
  width?: string;
  backgroundColor?: string;
  color?: string;
  children: ReactNode;
  [key: string]: any;
};

const CommonButton = ({ width, backgroundColor, color, children, ...remaining }: TCommonButtonProps) => {
  return (
    <Button
      {...remaining}
      style={{
        width: width || "100%",
        backgroundColor: backgroundColor || "#0096c7",
        color: color || "white",
        fontWeight: "bold",
      }}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
