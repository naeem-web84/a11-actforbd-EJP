import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateEvents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
  });

  const [eventDate, setEventDate] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/events/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          title: data.title,
          description: data.description,
          eventType: data.eventType,
          thumbnail: data.thumbnail,
          location: data.location,
        });
        setEventDate(new Date(data.eventDate));
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load event data.", "error");
      });
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!eventDate || eventDate < new Date()) {
      Swal.fire("Invalid Date", "Please select a valid future date.", "error");
      return;
    }

    const updatedEvent = {
      ...formData,
      eventDate,
      email: user.email,
    };

    try {
      const res = await axiosSecure.put(`/events/${id}`, updatedEvent);

      const result = res.data;

      if (result.modifiedCount > 0 || result.matchedCount > 0) {
        Swal.fire("Success", "Event updated successfully!", "success");
        navigate("/manage-events");
      } else {
        Swal.fire("Error", "Update failed or you're not authorized.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while updating.", "error");
    }
  };

  return (
    <div
      className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-orange-300"
      style={{ boxShadow: "0 12px 24px rgba(255, 126, 51, 0.2)" }}
    >
      <h2 className="text-4xl font-extrabold mb-10 text-center text-[#FF7E33] drop-shadow-md">
        Update Event
      </h2>
      <form onSubmit={handleUpdate} className="space-y-7">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
          className="input input-bordered w-full rounded-xl border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          rows={4}
          required
          className="textarea textarea-bordered w-full rounded-xl border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300 resize-none"
        />
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          className="select select-bordered w-full rounded-xl border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300"
        >
          <option value="" disabled>
            Select Event Type
          </option>
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
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail Image URL"
          required
          className="input input-bordered w-full rounded-xl border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Event Location"
          required
          className="input input-bordered w-full rounded-xl border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300"
        />
        <DatePicker
          selected={eventDate}
          onChange={setEventDate}
          placeholderText="Select Event Date"
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
          required
          className="input input-bordered w-full rounded-xl border-orange-300 focus:border-[#FF7E33] focus:ring-4 focus:ring-orange-200 transition duration-300"
        />
        <button
          type="submit"
          className="w-full py-4 mt-6 bg-[#FF7E33] font-extrabold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvents;
