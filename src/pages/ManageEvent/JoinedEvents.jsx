import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../shared/useTitle";
import { FaRegSmileWink, FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const JoinedEvents = () => {
  useTitle("JoinedEvents");
  const { user, loading } = useAuth();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const handleRemoveEvent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/joinedEvent/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setJoinedEvents((prev) =>
                prev.filter((event) => event._id !== id)
              );
              Swal.fire("Removed!", "Your event has been removed.", "success");
            }
          })
          .catch((err) => {
            console.error("Error deleting event:", err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  useEffect(() => {
    if (user?.email) {
      setEventsLoading(true);
      axiosSecure
        .get(`/joinedEvent?email=${user.email}`)
        .then((res) => setJoinedEvents(res.data))
        .catch((error) => console.error(error))
        .finally(() => setEventsLoading(false));
    }
  }, [user, axiosSecure]);

  if (loading || eventsLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaRegSmileWink className="text-orange-500" /> Your Joined Events
      </h2>

      {joinedEvents.length === 0 ? (
        <p className="text-gray-500">You haven’t joined any events yet.</p>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {joinedEvents.map((event) => (
            <motion.div
              key={event._id}
              className="bg-white p-4 rounded-lg shadow-md"
              variants={cardVariants}
            >
              <img
                src={event.thumbnail || "https://via.placeholder.com/400"}
                alt={event.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <FaCalendarAlt />{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">{event.eventType}</p>

              <button
                onClick={() => handleRemoveEvent(event._id)}
                className="mt-3 px-4 py-2 bg-[#FF7E33] text-white rounded hover:bg-orange-600 flex items-center gap-2 cursor-pointer"
              >
                <MdDelete className="text-lg" /> Remove Event
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default JoinedEvents;
