import React, { useState, useEffect } from 'react';
import AllEvents from '../pages/ManageEvent/AllEvents';
import Loading from '../pages/shared/Loading';

const eventTypes = [
  'All',
  'Cleanup',
  'Plantation',
  'Donation',
  'Awareness Campaign',
  'Blood Donation',
  'Workshop',
  'Food Distribution',
  'Tree Plantation Drive',
  'Health Camp',
  'Education Outreach',
  'Community Meet-up'
];

const EventSearchFilter = () => {
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setLoading(true);
    let url = 'https://a11-act-for-bd-server.vercel.app/events';

    if (selectedType !== 'All') {
      url += `?eventType=${encodeURIComponent(selectedType)}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const upcomingEvents = data.filter(event => new Date(event.eventDate) >= new Date());
        setEvents(upcomingEvents);
        setLoading(false);
        setNoResults(upcomingEvents.length === 0);
      })
      .catch(() => {
        setLoading(false);
        setNoResults(true);
      });
  }, [selectedType]);

  const handleSearch = () => {
    if (searchText.trim() === '') return;

    setLoading(true);
    setNoResults(false);

    const params = new URLSearchParams();
    params.append('search', searchText.trim());

    fetch(`https://a11-act-for-bd-server.vercel.app/events?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        const upcomingEvents = data.filter(event => new Date(event.eventDate) >= new Date());
        setEvents(upcomingEvents);
        setLoading(false);
        setNoResults(upcomingEvents.length === 0);
      })
      .catch(() => {
        setLoading(false);
        setNoResults(true);
      });
  };

  const handleReset = () => {
    setSelectedType('All');
    setSearchText('');
    setNoResults(false);
    setLoading(true);
    fetch('https://a11-act-for-bd-server.vercel.app/events')
      .then(res => res.json())
      .then(data => {
        const upcomingEvents = data.filter(event => new Date(event.eventDate) >= new Date());
        setEvents(upcomingEvents);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNoResults(true);
      });
  };

  const isFilterActive = selectedType !== 'All' || searchText.trim() !== '';

  return (
    <div className="mt-6 px-4 md:px-10">
      <h2 className="text-2xl font-bold text-center mb-4">Upcoming Events</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <select
          className="select select-bordered rounded-lg border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition w-48"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {eventTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 flex-grow max-w-xl"
          placeholder="Search event by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Search
        </button>

        {isFilterActive && (
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Reset
          </button>
        )}
      </div>

      {loading && <Loading></Loading>}

      {!loading && noResults && (
        <p className="text-center text-red-600 font-semibold">No events found matching your criteria.</p>
      )}

      {!loading && !noResults && <AllEvents events={events} />}
    </div>
  );
};

export default EventSearchFilter;
