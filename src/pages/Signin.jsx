import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="page-container">
        <header>
          <p className="page-header">Welcome back!</p>
        </header>
        <main>
          <form>
            <input
              className="email-input"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="password-input-container">
              <input
                className="password-input"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={onChange}
              />

              <img
                className="show-password"
                src={visibilityIcon}
                alt="show password"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signIn-bar">
              <p className="signIn-text">Sign In</p>
              <button className="signIn-button">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google OAuth */}

          <Link to="/sign-up" className="register-link">
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default Signin;
