import "./AdminLogin.scss";
import VamshaLogo from "../../assets/vamsha-logo.png";
import { FormEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowError(false);
  }, [userName, password]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", userName);
    console.log("Password:", password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login">
      <div className={`login-container ${showError ? "error-warn" : ""}`}>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-title">
            <p>Admin Login</p>
            <img src={VamshaLogo} alt="brand-logo" className="brand-logo" />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group form-group-password">
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {!showPassword && (
              <FontAwesomeIcon
                icon={faEye}
                className="eye-icon"
                onClick={handleShowPassword}
              />
            )}
            {showPassword && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="eye-icon"
                onClick={handleShowPassword}
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {showError && (
            <p className="warn-message">
              <FontAwesomeIcon icon={faCircleInfo} />
              <span>Invalid Credentials</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
