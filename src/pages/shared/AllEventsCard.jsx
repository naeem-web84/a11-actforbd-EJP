import React from 'react';
import { Link } from 'react-router';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AllEventsCard = ({ event, index }) => {
  const { _id, title, description, eventType, eventDate, creatorEmail, thumbnail } = event;
 
  const directionX = index % 2 === 0 ? -50 : 50;
  const directionY = index % 3 === 0 ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: directionX, y: directionY }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-orange-300 transform hover:scale-[1.02]"
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 space-y-3 font-poppins">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: '#FFF6E0',
              color: '#FF8C00',
            }}
          >
            {eventType}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {description.length > 70 ? `${description.slice(0, 70)}...` : description}
        </p>

        <div className="text-sm text-gray-500 space-y-1">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" />
            <span className="text-gray-700">{new Date(eventDate).toLocaleDateString()}</span>
          </p>
          <p className="flex items-center gap-2">
            <FaUser className="text-orange-500" />
            <span className="text-gray-700">{creatorEmail}</span>
          </p>
        </div>

        <div className="pt-3 flex justify-between items-center">
          <Link to={`/events/${_id}`}>
            <button
              className="text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition hover:cursor-pointer"
              style={{
                backgroundColor: '#FF7E33',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FF7E33')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF7E33')}
            >
              View Event
            </button>
          </Link>

          <span className="text-xs text-gray-400">#Event</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AllEventsCard;
