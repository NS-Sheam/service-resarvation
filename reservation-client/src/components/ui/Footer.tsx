const Footer = () => {
  return (
    <div className="py-6 bg-grayBlack text-white flex justify-center items-start gap-6">
      <div className="text-right ">
        <h3 className="text-white text-4xl">
          Lo<span className=" text-primary">G</span>o
        </h3>
        <p>&copy; 2021 All rights reserved</p>
      </div>
      <div>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Cookie Policy</p>
      </div>
    </div>
  );
};

export default Footer;
