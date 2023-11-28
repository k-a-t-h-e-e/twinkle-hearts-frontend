import PropTypes from "prop-types";
import HeaderFour from "../wrappers/header/HeaderFour";
import FooterTwo from "../wrappers/footer/FooterTwo";
import ScrollToTop from "../components/scroll-to-top"

const LayoutFive = ({ children }) => {
  return (
    <div className="wrapper">
      {/* header */}
      <HeaderFour />
      {children}
      <FooterTwo
        backgroundColorClass="bg-black"
        footerTopBackgroundColorClass="bg-black"
        footerTopSpaceTopClass="pt-80"
        spaceBottomClass="pb-25"
        footerLogo="/assets/img/logo/1 card tag-02.png"
      />
      <ScrollToTop/>
    </div>
  );
};

LayoutFive.propTypes = {
  children: PropTypes.node
};

export default LayoutFive;
