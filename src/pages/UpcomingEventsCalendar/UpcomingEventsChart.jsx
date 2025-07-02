import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const UpcomingEventsLineChart = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://a11-act-for-bd-server.vercel.app/events')
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().split('T')[0];
        const upcoming = data
          .filter(event => event.eventDate >= today)
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        const dateCountMap = {};
        upcoming.forEach(event => {
          const dateKey = new Date(event.eventDate).toLocaleDateString();
          dateCountMap[dateKey] = (dateCountMap[dateKey] || 0) + 1;
        });

        const chartData = Object.entries(dateCountMap).map(([date, count]) => ({
          date,
          events: count,
        }));

        setEvents(chartData);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-poppins text-[#ECF0F1]">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
        Upcoming Events Line Chart
      </h2>
      <div className="bg-[#2C3E50] p-6 rounded-2xl shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={events} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis
              dataKey="date"
              stroke="#F1C40F"
              tick={{ fontSize: 12, fill: '#F1C40F' }}
              angle={-15}
              textAnchor="end"
            />
            <YAxis
              stroke="#F1C40F"
              tick={{ fontSize: 12, fill: '#F1C40F' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#34495E', border: 'none', color: '#ECF0F1' }}
              labelStyle={{ color: '#F1C40F' }}
            />
            <Line
              type="monotone"
              dataKey="events"
              stroke="#FF7E33"
              strokeWidth={3}
              strokeLinecap="round"
              dot={{ r: 5, fill: '#FF7E33', stroke: '#2C3E50', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#FF7E33' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default UpcomingEventsLineChart;
