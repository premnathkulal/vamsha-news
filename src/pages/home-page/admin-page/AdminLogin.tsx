import "./AdminLogin.scss";

const AdminLogin = () => {
  return (
    <div className="admin-login">
      <form className="login-form">
        <h1>Login</h1>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <a href="#" className="forgot-password">
          Forgot password?
        </a>
      </form>
    </div>
  );
};

export default AdminLogin;
