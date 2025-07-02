import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import Loading from '../shared/Loading';

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

const AllCampaigns = () => {
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchEvents = (url) => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const futureEvents = data.filter(event => new Date(event.eventDate) >= new Date());
        setEvents(futureEvents);
        setNoResults(futureEvents.length === 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNoResults(true);
      });
  };

  useEffect(() => {
    let url = 'https://a11-act-for-bd-server.vercel.app/events';
    if (selectedType !== 'All') {
      url += `?eventType=${encodeURIComponent(selectedType)}`;
    }
    fetchEvents(url);
  }, [selectedType]);

  const handleSearch = () => {
    if (searchText.trim() === '') return;
    const params = new URLSearchParams({ search: searchText.trim() });
    fetchEvents(`https://a11-act-for-bd-server.vercel.app/events?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedType('All');
    setSearchText('');
    fetchEvents('https://a11-act-for-bd-server.vercel.app/events');
  };

  return (
    <div className="mt-10 px-4 md:px-16 font-poppins max-w-7xl mx-auto pb-14">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">All Campaigns</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="select select-bordered border-orange-400"
        >
          {eventTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input
          type="text"
          className="input input-bordered w-full md:w-80 border-gray-300"
          placeholder="Search by event name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button onClick={handleSearch} className="btn bg-orange-500 text-white hover:bg-orange-600">Search</button>

        {(searchText || selectedType !== 'All') && (
          <button onClick={handleReset} className="btn bg-gray-500 text-white hover:bg-gray-600">Reset</button>
        )}
      </div>

      {loading && <Loading />}
      {!loading && noResults && <p className="text-center text-red-600 font-semibold">No campaigns found.</p>}
      {!loading && !noResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <CampaignCard key={event._id} event={event} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;
