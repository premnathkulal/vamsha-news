import { useEffect, useState } from "react";
import "./Admin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faRectangleAd,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store/app-store";
import { useDispatch, useSelector } from "react-redux";
import { setIsSideBarOpen } from "../../store/slices/ui-controls";

const Admin = () => {
  const dispatch = useDispatch();
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [dayVisitors, setDayVisitors] = useState<number>(0);
  const isSideBarOpen =
    useSelector<RootState>((state) => state.uiControls.isSideBarOpen) ?? false;

  useEffect(() => {
    setTotalVisitors(0);
    setDayVisitors(0);
  }, []);

  const handleManageAdvertisement = () => {
    // Handle manage advertisement
  };

  const handleManageNewspapers = () => {
    // Handle manage newspapers
  };

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSideBarOpen]);

  useEffect(() => {
    if (isSideBarOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const sidebar = document.querySelector(".sidebar");
        const menuIcon = document.querySelector(".menu-icon");
        if (
          sidebar &&
          !sidebar.contains(event.target as Node) &&
          menuIcon &&
          !menuIcon.contains(event.target as Node)
        ) {
          dispatch(setIsSideBarOpen());
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSideBarOpen]);

  return (
    <div className="admin-page">
      <div className={`sidebar sidebar-mobile ${isSideBarOpen ? "open" : ""}`}>
        <ul className="options">
          <li className="option">
            <div
              onClick={handleManageNewspapers}
              className="action-btn primary-btn"
            >
              Home
              <FontAwesomeIcon className="icon" icon={faHome} />
            </div>
          </li>
          <li className="option selected">
            <div
              onClick={handleManageNewspapers}
              className="action-btn primary-btn"
            >
              Manage Newspapers
              <FontAwesomeIcon className="icon" icon={faNewspaper} />
            </div>
          </li>
          <li className="option">
            <div
              onClick={handleManageAdvertisement}
              className="action-btn primary-btn"
            >
              Manage Advertisement
              <FontAwesomeIcon className="icon" icon={faRectangleAd} />
            </div>
          </li>
          <li className="option bottom-option">
            <div
              onClick={handleManageAdvertisement}
              className="action-btn primary-btn"
            >
              Logout
              <FontAwesomeIcon
                className="icon logout-icon"
                icon={faRightFromBracket}
              />
            </div>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="admin-header">
          <p className="page-title">Admin Dashboard</p>
          <p>
            Welcome back <span className="hand-wave">👋</span>, Admin! Manage
            your content and website here.
          </p>
        </div>

        <div className="visitor-info">
          <div className="info-card">
            <h2>Total Visitors</h2>
            <p>{totalVisitors}</p>
          </div>
          <div className="info-card">
            <h2>Visitors Today</h2>
            <p>{dayVisitors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
