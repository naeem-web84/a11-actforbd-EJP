import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useTitle from "../shared/useTitle";

const EventDetails = () => {
  useTitle("EventDetails");
  const event = useLoaderData();
  const {
    _id,
    title = "",
    description = "",
    eventType = "",
    thumbnail = "",
    eventDate = "",
    creatorEmail = "",
  } = event || {};

  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleJoinedEvent = async () => {
    if (!user) {
      Swal.fire("You must be logged in to join an event");
      return navigate("/signIn");
    }

    const joinedData = {
      eventId: _id,
      title,
      eventDate,
      eventType,
      thumbnail,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
    };

    console.log("Sending joined event:", joinedData);

    try {
      const res = await axiosSecure.post("/joinedEvent", joinedData);

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          title: "🎉 Joined Successfully!",
          text: "You have successfully joined the event.",
          icon: "success",
          confirmButtonText: "Go to Joined Events",
        }).then(() => {
          navigate("/joinedEvents");
        });
      } else {
        throw new Error("Join event failed");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Something went wrong!",
        text: error.response?.data?.message || "Could not join the event.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 mb-16 px-6 lg:px-12">
      <div className="bg-gradient-to-r from-white/80 to-gray-100/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-10 items-center p-6 lg:p-10 transition-transform duration-500 ease-in-out font-poppins">


        <div className="w-full lg:w-1/2">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-[300px] lg:h-[420px] object-cover rounded-2xl shadow-md"
          />
        </div>


        <div className="w-full lg:w-1/2 space-y-6 text-gray-800">
          <h1 className="text-4xl font-extrabold text-[#2e2e2e] leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <FaCalendarAlt className="text-orange-500" />
              <span>{new Date(eventDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
              <FaUser className="text-orange-500" />
              <span>{creatorEmail}</span>
            </div>
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full font-semibold shadow-sm">
              {eventType}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed text-base tracking-wide">
            {description}
          </p>

          <div className="pt-4">
            <button
              onClick={handleJoinedEvent}
              className="bg-gradient-to-r from-[#FF7E33] to-orange-400 hover:from-orange-500 hover:to-[#FF7E33] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-300 hover:cursor-pointer"
            >
              Join This Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
