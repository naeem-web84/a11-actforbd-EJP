import Lottie from "lottie-react";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import loginLottie from "../../assets/lotties/loginAnime.json";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import Swal from "sweetalert2";
import useTitle from "../shared/useTitle";
import { motion } from "framer-motion";

const leftSlideVarient = {
  hidden: { opacity: 0, x: -100 },
  visible: {opacity: 1, x: 0, transition: {duration: 0.8}}
}

const rightSlideVariant = {
  hidden: { opacity: 0, x: 100 }, // start invisible & shifted right
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const SignIn = () => {
  useTitle("SignIn");
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !validateEmail(email)) {
      return Swal.fire("Validation Error", "Please enter a valid email.", "error");
    }
    if (!password) {
      return Swal.fire("Validation Error", "Password is required.", "error");
    }

    signInUser(email, password)
      .then(() => {
        Swal.fire("Success", "Signed in successfully!", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie animationData={loginLottie} loop={true} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1
              className="text-5xl font-bold text-center"
              style={{ color: "#FF7E33", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
            >
              Sign In Now!
            </h1>
            <form onSubmit={handleSignIn} noValidate>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="btn w-full text-white mt-4 cursor-pointer"
                  style={{ backgroundColor: "#FF7E33" }}
                >
                  Sign In
                </button>
              </fieldset>
            </form>

            <div className="w-full">
              <SocialLogin from={from} />
            </div>

            <p className="text-center mt-4 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500 font-semibold hover:underline cursor-pointer">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
