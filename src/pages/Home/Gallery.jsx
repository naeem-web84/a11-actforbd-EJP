import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://a11-act-for-bd-server.vercel.app/events")
      .then((res) => {
        const upcoming = res.data.filter(
          (event) => new Date(event.eventDate) > new Date()
        );
        setEvents(upcoming);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 1, behavior: "smooth" });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <section className="my-12">
      {/* Title Animation */}
      <motion.h2
        className="text-3xl font-semibold mb-10 text-center"
        style={{ color: "#FF7E33" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Upcoming Events Highlights
      </motion.h2>

      {/* Cards Animation */}
      <motion.div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-60 rounded-lg border-2 shadow-md"
            style={{ borderColor: "#E67E22", backgroundColor: "#34495E" }}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="h-32 w-full object-cover rounded-t"
            />
            <div className="p-3 text-sm">
              <h3 className="font-semibold text-[#ECF0F1]">{event.title}</h3>
              <p className="text-[#BDC3C7]">
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Gallery;
