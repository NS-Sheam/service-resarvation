import CommonButton from "../ui/CommonButton";

type TFooterTemplateProps = {
  handleBooking: () => void;
};

const FooterTemplate = ({ handleBooking }: TFooterTemplateProps) => {
  return (
    <div className="quick-info-footer">
      <CommonButton
        width="30%"
        onClick={handleBooking}
      >
        Book Now
      </CommonButton>
    </div>
  );
};
export default FooterTemplate;
