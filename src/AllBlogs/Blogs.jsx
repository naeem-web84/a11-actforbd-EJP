import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaBroom, FaSeedling, FaRecycle, FaWater } from 'react-icons/fa';
import useTitle from '../pages/shared/useTitle';

const blogs = [
  {
    id: 1,
    icon: <FaLeaf className="text-3xl text-green-600" />,
    title: 'Why Tree Plantation Drives Matter in 2025',
    content:
      'Planting trees is no longer a seasonal activity—it’s a necessity. Discover how our Hossainpur event helped restore local greenery and involved over 300 volunteers across all age groups.',
  },
  {
    id: 2,
    icon: <FaHandsHelping className="text-3xl text-yellow-500" />,
    title: 'The Joy of Giving: Donation Drives in Chittagong',
    content:
      'From warm clothes to school supplies, learn how communities in Chittagong united to provide for orphans. Read the inspiring stories of young volunteers making a big difference.',
  },
  {
    id: 3,
    icon: <FaBroom className="text-3xl text-blue-500" />,
    title: 'Cleaning Mirpur 10: A Community Rises Together',
    content:
      'The Road Cleaning event in Mirpur wasn’t just about sweeping streets—it was about reclaiming pride in our public spaces. Here’s what we learned from 100+ residents joining hands.',
  },
  {
    id: 4,
    icon: <FaSeedling className="text-3xl text-green-500" />,
    title: 'Sylhet’s Green Awakening: A Plantation Effort',
    content:
      'Sylhet locals came together this spring to plant over 1,000 native saplings in public parks. The project emphasized biodiversity and long-term community care.',
  },
  {
    id: 5,
    icon: <FaRecycle className="text-3xl text-lime-500" />,
    title: 'Recycling for a Cleaner Kishoreganj',
    content:
      'In Hossainpur, students from three local schools participated in a recycling challenge that collected 400 kg of plastic waste in a week. A great start to a cleaner town!',
  },
  {
    id: 6,
    icon: <FaWater className="text-3xl text-sky-500" />,
    title: 'Safe Water Distribution Drive in Rajshahi',
    content:
      'Facing water shortages in summer, Rajshahi’s volunteers distributed filtered water in underserved neighborhoods—impacting over 500 households in two days.',
  },
];

const Blogs = () => {
    useTitle('Blogs');
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h2
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#FF7E33]">Act</span>
        <span className="text-gray-800 dark:text-gray-200">ForBD Blogs</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 border border-orange-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div>{blog.icon}</div>
              <h3 className="text-xl font-semibold text-[#FF7E33]">{blog.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{blog.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
