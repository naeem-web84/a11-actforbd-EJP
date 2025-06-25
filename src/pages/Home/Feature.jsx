import React, { useRef } from "react";
import { FaUsers, FaCalendarAlt, FaGlobeAmericas, FaCheckCircle, FaLock, FaThLarge } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: <FaUsers size={40} style={{ color: "#F1C40F" }} />,
    title: "Connect With People",
    description: "Meet like-minded individuals and collaborate on social causes.",
  },
  {
    icon: <FaCalendarAlt size={40} style={{ color: "#F1C40F" }} />,
    title: "Create & Manage Events",
    description: "Easily create, update, and manage your social development events.",
  },
  {
    icon: <FaGlobeAmericas size={40} style={{ color: "#F1C40F" }} />,
    title: "Make an Impact",
    description: "Contribute to your community by joining impactful events.",
  },
  {
    icon: <FaCheckCircle size={40} style={{ color: "#F1C40F" }} />,
    title: "Trusted & Verified Events",
    description: "All events go through verification to ensure quality and authenticity.",
  },
  {
    icon: <FaLock size={40} style={{ color: "#F1C40F" }} />,
    title: "Safe & Secure Access",
    description: "Your account is protected with robust authentication systems.",
  },
  {
    icon: <FaThLarge size={40} style={{ color: "#F1C40F" }} />,
    title: "Diverse Event Categories",
    description: "Explore a wide range of events tailored to your interests.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Feature = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="text-[#ECF0F1] px-6 py-16 font-poppins bg-[#2C3E50] rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#F1C40F" }}>
        Why Choose Our Platform?
      </h2>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            style={{ borderColor: "#E67E22", backgroundColor: "#34495E" }}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(230, 126, 34, 0.4)" }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 font-poppins" style={{ color: "#E67E22" }}>
              {feature.title}
            </h3>
            <p className="opacity-80">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Feature;
