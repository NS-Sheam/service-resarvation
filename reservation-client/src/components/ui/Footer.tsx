import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 bg-grayBlack text-white text-center cursor-pointer">
      <h3
        onClick={() => navigate("/")}
        className="text-white text-4xl"
      >
        <span className="text-orange">B</span>oo<span className=" text-primary">K</span>Ease
      </h3>
      <p>&copy; 2021 All rights reserved</p>
    </div>
  );
};

export default Footer;
