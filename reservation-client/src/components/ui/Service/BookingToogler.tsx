import { Col, Row } from "antd";
import { Dispatch } from "react";

type BookingTooglerProps = {
  tabItem: string;
  setTabItem: Dispatch<React.SetStateAction<string>>;
};

const BookingToogler = ({ tabItem, setTabItem }: BookingTooglerProps) => {
  const tabItems = ["Details", "Gallery", "Book"];
  return (
    <Row
      gutter={[0, 8]}
      justify="center"
      align="middle"
    >
      {tabItems?.map((item, index) => (
        <Col
          onClick={() => setTabItem(item)}
          span={6}
          key={index}
          className="border-b-4 border-darkPrimary"
        >
          <p
            className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
              tabItem === item ? "bg-grayWhite" : ""
            }`}
          >
            {item}
          </p>
          <hr className={`h-2 w-full bg-darkPrimary ${tabItem === item ? "visible" : "hidden"}`} />
        </Col>
      ))}
    </Row>
  );
};

export default BookingToogler;
