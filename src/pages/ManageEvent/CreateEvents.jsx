import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../shared/useTitle";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import createLottie from "../../assets/lotties/createLottie.json";

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const CreateEvents = () => {
  useTitle("Create Event");
  const { user } = useContext(AuthContext);
  const [eventDate, setEventDate] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || formData.title.length < 5) {
      return Swal.fire("Invalid Title", "Title must be at least 5 characters.", "warning");
    }

    if (!formData.description || formData.description.length < 15) {
      return Swal.fire("Invalid Description", "Description should be at least 15 characters.", "warning");
    }

    if (!formData.eventType) {
      return Swal.fire("Missing Type", "Please select an event type.", "error");
    }

    if (!formData.thumbnail || !isValidURL(formData.thumbnail)) {
      return Swal.fire("Invalid URL", "Enter a valid image URL.", "error");
    }

    if (!formData.location) {
      return Swal.fire("Missing Location", "Please enter event location.", "error");
    }

    if (!eventDate || eventDate < new Date()) {
      return Swal.fire("Invalid Date", "Please select a future date.", "error");
    }

    const newEvent = {
      ...formData,
      eventDate,
      email: user?.email,
    };

    try {
      const res = await axiosSecure.post("/events", newEvent);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success!", "Event created successfully.", "success").then(() => {
          navigate("/upcomingEvents");
        });
      } else {
        throw new Error("Failed to insert event");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 flex flex-col lg:flex-row items-center justify-center gap-10">

      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Lottie animationData={createLottie} loop={true} />
      </motion.div>


      <motion.div
        className="w-full lg:w-1/2 p-6 bg-white text-gray-800 rounded-3xl shadow-xl border border-orange-300 dark:bg-white dark:text-gray-800"
        style={{ boxShadow: "0 12px 24px rgba(255, 126, 51, 0.2)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-center text-[#FF7E33] drop-shadow-md">
          Create Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="title" className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              autoComplete="off"
              className="input input-bordered w-full rounded-lg border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300 bg-white text-gray-800"
            />
          </div>


          <div>
            <label htmlFor="description" className="block mb-1 font-semibold">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full rounded-lg border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300 resize-none bg-white text-gray-800"
            />
          </div>


          <div>
            <label htmlFor="eventType" className="block mb-1 font-semibold">Event Type</label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="select select-bordered w-full rounded-lg border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300 bg-white text-gray-800"
            >
              <option value="" disabled>Select Event Type</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
              <option value="Awareness Campaign">Awareness Campaign</option>
              <option value="Blood Donation">Blood Donation</option>
              <option value="Workshop">Workshop</option>
              <option value="Food Distribution">Food Distribution</option>
              <option value="Tree Plantation Drive">Tree Plantation Drive</option>
              <option value="Health Camp">Health Camp</option>
              <option value="Education Outreach">Education Outreach</option>
              <option value="Community Meet-up">Community Meet-up</option>
            </select>
          </div>

          <div>
            <label htmlFor="thumbnail" className="block mb-1 font-semibold">Thumbnail Image URL</label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnail}
              onChange={handleChange}
              autoComplete="off"
              className="input input-bordered w-full rounded-lg border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300 bg-white text-gray-800"
            />
          </div>


          <div>
            <label htmlFor="location" className="block mb-1 font-semibold">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
              autoComplete="off"
              className="input input-bordered w-full rounded-lg border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300 bg-white text-gray-800"
            />
          </div>

          <div>
            <label htmlFor="eventDate" className="block mb-1 font-semibold">Event Date</label>
            <DatePicker
              id="eventDate"
              name="eventDate"
              selected={eventDate}
              onChange={setEventDate}
              minDate={tomorrow}
              placeholderText="Select Event Date"
              className="input input-bordered w-full rounded-lg border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300 bg-white text-gray-800"
              dateFormat="MMMM d, yyyy"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-[#FF7E33] font-extrabold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
          >
            Create Event
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEvents;
