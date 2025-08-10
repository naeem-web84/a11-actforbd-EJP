import Lottie from "lottie-react";
import React from "react";
import planBoom from "../../assets/lotties/planBoom.json";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";
import { motion } from "framer-motion";

const textContainer = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const Banner = () => {
  return (
    <motion.section
      className="rounded-lg p-10 flex flex-col md:flex-row items-center justify-between"
      style={{ backgroundColor: "#2C3E50", color: "#E5E7EB" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Text Side */}
      <motion.div
        className="md:w-1/2 space-y-6"
        variants={textContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          variants={textItem}
        >
          <Typewriter
            words={["Connect & Empower Your Community"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl opacity-90"
          variants={textItem}
        >
          Join and create social development events that bring positive change.
        </motion.p>

        <motion.div variants={textItem}>
          <Link
            to="/upcomingEvents"
            className="btn btn-lg text-white"
            style={{ backgroundColor: "#FF7E33", borderColor: "#FF7E33" }}
          >
            Explore Events
          </Link>
        </motion.div>
      </motion.div>

      {/* Lottie Side */}
      <motion.div
        className="md:w-1/2 mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <Lottie animationData={planBoom} loop={true} />
      </motion.div>
    </motion.section>
  );
};

export default Banner;
