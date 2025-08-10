import React from "react";
import Lottie from "lottie-react";
import loadingHand from "../../assets/lotties/loadingHandLotti.json";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-6 bg-base-100">
            {/* Lottie animation with fade-in & slight scale */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Lottie
                    animationData={loadingHand}
                    loop={true}
                    className="w-72 md:w-96"
                />
            </motion.div>

            {/* Loading text with fade-up effect */}
            <motion.div
                className="flex items-center gap-2 text-orange-500 text-lg font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                >
                    <FaSpinner className="text-xl" />
                </motion.div>
                Please wait, loading content...
            </motion.div>
        </div>
    );
};

export default Loading;
