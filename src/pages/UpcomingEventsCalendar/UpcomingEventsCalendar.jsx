import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UpcomingEventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState([]);

  useEffect(() => {
    fetch('https://a11-act-for-bd-server.vercel.app/events')
      .then(res => res.json())
      .then(data => {
        const today = new Date().toISOString().split('T')[0];
        const filteredEvents = data
          .filter(event => event.eventDate >= today) // ✅ Only today and future
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        setEvents(filteredEvents);
        setLoading(false);
        filterEventsByDate(selectedDate, filteredEvents);
      })
      .catch(() => setLoading(false));
  }, []);

  const filterEventsByDate = (date, allEvents = events) => {
    const dateStr = date.toISOString().split('T')[0];
    const filtered = allEvents.filter(event => event.eventDate === dateStr);
    setEventsOnSelectedDate(filtered);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    filterEventsByDate(date);
  };

  if (loading) return <p className="text-center py-10 text-yellow-400">Loading events...</p>;
  if (!events.length) return <p className="text-center py-10 text-gray-400">No upcoming events found.</p>;

  return (
    <section className="max-w-7xl mx-auto p-6 bg-[#2C3E50] rounded-2xl text-[#ECF0F1] font-poppins">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Upcoming Events Calendar</h2>

      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            if (events.some(ev => ev.eventDate === dateStr)) {
              return <div className="mx-auto mt-1 w-2 h-2 rounded-full bg-yellow-400"></div>;
            }
          }
          return null;
        }}
        className="mx-auto max-w-md rounded-md border border-yellow-600"
        calendarType="ISO 8601" // ✅ FIXED here
        tileClassName={() => "bg-[#2C3E50] text-[#F1C40F]"} // consistent theme
      />

      <style>{`
        .react-calendar {
          background-color: #2C3E50;
          border: 1px solid #E67E22;
          color: #F1C40F;
          border-radius: 0.75rem;
        }
        .react-calendar__tile {
          background-color: #2C3E50 !important;
          color: #F1C40F !important;
          border-radius: 0.5rem;
          transition: background-color 0.3s ease;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #E67E22 !important;
          color: #1F2937 !important;
        }
        .react-calendar__tile--now {
          background: #FF7E33 !important;
          color: #1F2937 !important;
          font-weight: bold;
        }
        .react-calendar__tile--active {
          background: #E67300 !important;
          color: #fff !important;
        }
      `}</style>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-yellow-300 mb-3">
          Events on {selectedDate.toDateString()}
        </h3>
        {eventsOnSelectedDate.length ? (
          <ul>
            {eventsOnSelectedDate.map(event => (
              <li
                key={event._id}
                className="mb-4 p-4 border border-yellow-600 rounded-lg hover:shadow-lg transition-shadow bg-[#34495E]"
              >
                <h4 className="text-lg font-semibold mb-1 text-yellow-300">{event.title}</h4>
                <p className="text-sm mb-2 opacity-90">{event.description.slice(0, 100)}...</p>
                <p className="text-xs text-yellow-200 mb-2">
                  Date: {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => window.location.href = `/events/${event._id}`}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 rounded text-[#1F2937] font-semibold transition"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No events on this day.</p>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsCalendar;
