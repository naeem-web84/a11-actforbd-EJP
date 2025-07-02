import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const HighlightsSection = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://a11-act-for-bd-server.vercel.app/events')
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().split('T')[0];

        const upcoming = data
          .filter(event => event.eventDate >= today)
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        setHighlights(upcoming.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10 text-[#FF7E33]">Loading highlights...</div>;
  if (!highlights.length) return <div className="text-center py-10 text-gray-400">No upcoming highlights found.</div>;

  return (
    <section className="text-[#ECF0F1] px-4 py-12 font-poppins bg-[#2C3E50] rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: '#F1C40F' }}>
        Community Highlights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {highlights.map((event) => (
          <div
            key={event._id}
            className="rounded-xl border px-3 py-4 flex flex-col transition duration-300 hover:shadow-lg overflow-hidden"
            style={{
              backgroundColor: '#34495E',
              borderColor: '#E67E22',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-32 object-cover rounded-lg mb-2"
              onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
            />
            <h3 className="text-base font-semibold mb-1" style={{ color: '#E67E22' }}>
              {event.title}
            </h3>
            <p className="text-sm text-[#ECF0F1] opacity-80 flex-1">
              {event.description?.slice(0, 60)}...
            </p>
            <Link to={`/events/${event._id}`}>
              <button
                className="mt-3 btn btn-xs text-white border-none transition-all duration-300"
                style={{ backgroundColor: '#FF7E33' }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E67300')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF7E33')}
              >
                See More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighlightsSection;
