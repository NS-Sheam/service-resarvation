import { Helmet } from "react-helmet";

type TPageHeadProps = {
  title: string;
};

const PageHead = ({ title }: TPageHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content="Reservation"
      />
    </Helmet>
  );
};

export default PageHead;
