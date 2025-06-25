import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../shared/useTitle";
import Loading from "../shared/Loading";
import { motion } from "framer-motion";

const ManageEvents = () => {
  useTitle("Manage Events");
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const fetchMyEvents = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/myEvents?email=${user.email}`);
      setMyEvents(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch your events.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyEvents();
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#FFA500",
      cancelButtonColor: "#777",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/events/${id}?email=${user.email}`);
          Swal.fire("Deleted!", "Your event has been deleted.", "success");
          fetchMyEvents();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete event.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <style>{`
        .btn-gold {
          background-color: #FFB347;
          color: white;
          font-weight: 600;
          padding: 0.4rem 1rem;
          border-radius: 0.375rem;
          border: 2px solid transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .btn-gold:hover {
          background-color: #FFA500;
          border-color: #FFA500;
          box-shadow: 0 0 8px 2px rgba(255, 165, 0, 0.6);
        }
        .btn-gold:focus {
          outline: none;
          box-shadow: 0 0 12px 3px rgba(255, 165, 0, 0.8);
        }
      `}</style>

      <motion.div
        className="w-full mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center text-[#FF8C00]">
          My Created Events
        </h2>
      </motion.div>

      {loading ? (
        <Loading />
      ) : myEvents.length === 0 ? (
        <p className="text-center text-gray-600">No events found. Create some!</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {myEvents.map((event) => (
            <motion.div
              key={event._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-[#FF8C00]">
                  {event.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => navigate(`/updateEvent/${event._id}`)}
                    className="btn-gold"
                    aria-label={`Update event ${event.title}`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="btn-gold"
                    style={{ backgroundColor: "#FF6B6B", borderColor: "#FF6B6B" }}
                    aria-label={`Delete event ${event.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ManageEvents;
