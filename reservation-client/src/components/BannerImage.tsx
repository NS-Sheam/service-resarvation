import bannerImg from "../assets/images/banner.jpg";

const BannerImage = () => {
  return (
    <div className="absolute right-0 left-0 top-0 bottom-0 bg-fixed ">
      <div className="absolute w-full h-full bg-primary bg-opacity-25"></div>
      <img
        src={bannerImg}
        alt="banner"
        className="w-full h-full object-cover bg-fixed"
      />
    </div>
  );
};

export default BannerImage;
