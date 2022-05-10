import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className="page-container">
      <header>
        <p className="page-header">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            className="email-input"
            id="email"
            type="email"
            value={email}
            onChange={onChange}
            placeholder="email"
          />
          <Link className="forgot-password-link" to="/sign-in">
            Sign In
          </Link>
          <div className="signIn-bar">
            <div className="signIn-text">Send Reset Link</div>
            <button className="signIn-button">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
