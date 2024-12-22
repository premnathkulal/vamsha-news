import { useEffect, useState } from "react";
import "./Admin.scss";
import SideBar from "../../components/side-bar/SideBar";

const Admin = () => {
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [dayVisitors, setDayVisitors] = useState<number>(0);

  useEffect(() => {
    setTotalVisitors(0);
    setDayVisitors(0);
  }, []);

  return (
    <div className="admin-page">
      <SideBar />

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
