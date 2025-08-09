import Lottie from "lottie-react";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import registerLottie from "../../assets/lotties/registerAnime.json";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import useTitle from "../shared/useTitle";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

// ✅ Animation Variants
const leftSlideVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const rightSlideVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const Register = () => {
  useTitle("Register");
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    const { name, email, password, photoUrl } = data;

    if (!name.trim()) {
      return Swal.fire("Validation Error", "Name is required.", "error");
    }
    if (!email.trim() || !validateEmail(email)) {
      return Swal.fire("Validation Error", "Please enter a valid email.", "error");
    }
    if (!password || password.length < 6) {
      return Swal.fire("Validation Error", "Password must be at least 6 characters.", "error");
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photoUrl || null,
        });
      })
      .then(() => {
        Swal.fire("Success", "Registered successfully!", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full max-w-5xl gap-6">
        
        {/* Form - slides from left */}
        <motion.div
          className="card bg-base-100 w-full lg:w-1/2 shadow-2xl p-6"
          variants={leftSlideVariant}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="text-4xl font-bold mb-6 text-center lg:text-left"
            style={{ color: "#FF7E33", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
          >
            Register Now!
          </h1>

          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            <div>
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Photo URL (optional)</label>
              <input
                name="photoUrl"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
              style={{ backgroundColor: "#FF7E33" }}
            >
              Register
            </button>
          </form>

          <div className="w-full mt-4">
            <SocialLogin from={from} />
          </div>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>

        {/* Lottie Animation - slides from right */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center"
          variants={rightSlideVariant}
          initial="hidden"
          animate="visible"
        >
          <Lottie
            animationData={registerLottie}
            loop={true}
            className="w-3/4 sm:w-2/3 lg:w-full max-w-xs sm:max-w-md lg:max-w-md h-auto"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Register;
