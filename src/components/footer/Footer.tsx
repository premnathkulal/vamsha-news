import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.scss";
import {
  faFacebookF,
  faSquareFacebook,
  faSquareTwitter,
  faSquareWhatsapp,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faHammer, faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="share-links">
        <p>Share news options</p>
        <div className="share-options">
          <FontAwesomeIcon className="fa-brands" icon={faSquareWhatsapp} />
          <FontAwesomeIcon className="fa-brands" icon={faSquareFacebook} />
          <FontAwesomeIcon className="fa-brands" icon={faSquareTwitter} />
        </div>
      </div>
      <div className="footer">
        <p>
          Made with &nbsp;
          <FontAwesomeIcon icon={faHeart} />
          &nbsp; and&nbsp;
          <FontAwesomeIcon icon={faHammer} />
          &nbsp; by Vamsha News
        </p>
        <p className="copy-right">
          All rights reserved&nbsp;&nbsp;
          <FontAwesomeIcon icon={faCopyright} />
          &nbsp;
          <span> Vamsha News</span>
        </p>
        <div className="social-links">
          <FontAwesomeIcon className="fa-brands" icon={faFacebookF} />
          <FontAwesomeIcon className="fa-brands" icon={faXTwitter} />
          <FontAwesomeIcon className="fa-brands" icon={faYoutube} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
