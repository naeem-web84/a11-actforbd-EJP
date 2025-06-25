import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'You have successfully subscribed to our newsletter.',
        confirmButtonColor: '#10B981',
      }).then(() => {
        navigate('/');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonColor: '#EF4444',
      });
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto my-12 p-1 rounded-lg overflow-hidden">
       
      <motion.div
        className="absolute inset-0 z-0 rounded-lg"
        style={{
          background: 'linear-gradient(270deg, #FF6B6B,#FF7F7F,#FA8072)',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      ></motion.div>

      
      <div className="relative z-10 bg-[#1f1f1f] text-gray-100 rounded-lg p-10 shadow-md">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#FF7E33' }}>
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6 text-gray-400">
          Get updates about new events, activities, and community news delivered directly to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-auto flex-grow bg-[#2c2c2c] text-white border border-[#FF7E33]placeholder-gray-400"
          />
          <button
            type="submit"
            className="btn text-white border-none"
            style={{
              backgroundColor: '#FF7E33',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FF8C00')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FFA500')}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
