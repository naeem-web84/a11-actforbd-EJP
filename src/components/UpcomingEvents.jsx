import React from 'react';
import EventSearchFilter from '../components/EventSearchFilter';
import useTitle from '../pages/shared/useTitle';

const UpcomingEvents = () => {
  useTitle("Upcoming");
  return (
    <div>
      <EventSearchFilter></EventSearchFilter>
    </div>
  );
};

export default UpcomingEvents;
