import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import VamshaLogo from "../../assets/vamsha-logo.png";
import { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    manageDate();
  }, []);

  const manageDate = () => {
    const date = new Date();
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
    setCurrentDate(formattedDate);
  };

  return (
    <div className="header">
      <FontAwesomeIcon icon={faBars} className="menu-icon" />
      <img src={VamshaLogo} alt="brand-logo" className="brand-logo" />
      <div className="menu"></div>
      <div className="date-picker">
        <FontAwesomeIcon icon={faCalendarDays} />
        <span>{currentDate}</span>
      </div>
    </div>
  );
};

export default Header;
