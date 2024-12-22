import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/app-store";
import { setIsSideBarOpen } from "../../store/slices/ui-controls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNewspaper,
  faRectangleAd,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const isSideBarOpen =
    useSelector<RootState>((state) => state.uiControls.isSideBarOpen) ?? false;
  const dispatch = useDispatch();

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

  const handleManageAdvertisement = () => {
    // Handle manage advertisement
  };

  const handleManageNewspapers = () => {
    // Handle manage newspapers
  };

  return (
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
  );
};

export default SideBar;
