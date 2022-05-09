import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

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
              className="name-input"
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
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
                type={showPassword ? "text" : "password"}
                placeholder="password"
                id="password"
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

            <div className="signUp-bar">
              <p className="signUp-text">Sign Up</p>
              <button className="signUp-button">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google OAuth */}

          <Link to="/sign-in" className="register-link">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
