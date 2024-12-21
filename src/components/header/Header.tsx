import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import VamshaLogo from "../../assets/vamsha-logo.png";
import { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Routes } from "../../routes/main-route";
import { useDispatch, useSelector } from "react-redux";
import { setIsSideBarOpen } from "../../store/slices/ui-controls";
import { RootState } from "../../store/app-store";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState("");
  const isMobileDevice =
    useSelector<RootState>((state) => state.uiControls.isMobileDevice) ?? false;

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

  const handleSideBar = () => {
    dispatch(setIsSideBarOpen());
  };

  return (
    <div className="header">
      {location.pathname === Routes.ADMIN_PAGE && isMobileDevice && (
        <FontAwesomeIcon
          icon={faBars}
          className="menu-icon"
          onClick={handleSideBar}
        />
      )}
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
