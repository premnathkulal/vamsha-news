import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";
import VamshaLogo from "../../assets/vamsha-logo.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Routes } from "../../routes/main-route";
import { useDispatch, useSelector } from "react-redux";
import { setIsSideBarOpen } from "../../store/slices/ui-controls";
import { RootState } from "../../store/app-store";
import DatePicker from "../date-picker/DatePicker";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobileDevice =
    useSelector<RootState>((state) => state.uiControls.isMobileDevice) ?? false;

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
        <DatePicker />
      </div>
    </div>
  );
};

export default Header;
