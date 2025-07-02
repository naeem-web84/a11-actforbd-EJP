import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const CampaignCard = ({ event, index }) => {
  const { _id, title, description, eventDate, eventType, thumbnail } = event;
  const isPast = new Date(eventDate) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="bg-[#2C3E50] text-white p-4 rounded-xl border border-orange-400 shadow-lg hover:shadow-xl transition-all"
    >
      {thumbnail && (
        <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded mb-3" />
      )}

      <h3 className="text-lg font-semibold mb-1 text-yellow-300">{title}</h3>

      <p className="text-sm opacity-80 mb-4">
        {description?.slice(0, 80)}...
      </p>

      <div className="pt-2 flex justify-between items-center">
        <Link to={`/events/${_id}`} className="inline-block">
          <button
            className="btn btn-sm text-white flex items-center gap-2 px-4"
            disabled={isPast}
            style={{
              backgroundColor: isPast ? '#7f8c8d' : '#FF7E33',
              cursor: isPast ? 'not-allowed' : 'pointer',
            }}
          >
            {isPast ? 'Expired' : 'View Campaign'}
          </button>
        </Link>
        <span className="text-xs text-orange-200">#{eventType || 'Campaign'}</span>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
