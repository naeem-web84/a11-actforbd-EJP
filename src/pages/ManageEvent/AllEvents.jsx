import React from 'react';
import AllEventsCard from '../shared/AllEventsCard';

const AllEvents = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className="text-center text-gray-500">No events found.</p>;
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {
          events.map((event, index) => (
            <AllEventsCard key={event._id} event={event} index={index} />
          ))
        }
      </div>
    </div>
  );
};

export default AllEvents;
