import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = { ...formData, createdAt: new Date().toISOString() };

    try {
      const res = await fetch('https://a11-act-for-bd-server.vercel.app/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Feedback submitted!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Error submitting feedback');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#2C3E50] text-white rounded-xl mt-10 font-poppins">
      <h2 className="text-2xl font-bold text-center text-[#F1C40F] mb-6">Give Us Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded bg-[#34495E] border border-[#E67E22] placeholder-gray-300"
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 rounded bg-[#34495E] border border-[#E67E22] placeholder-gray-300"
          placeholder="Your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full p-3 h-32 rounded bg-[#34495E] border border-[#E67E22] placeholder-gray-300"
          placeholder="Your Feedback"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          className="btn btn-block bg-[#FF7E33] text-white hover:bg-[#E67300] border-none"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
