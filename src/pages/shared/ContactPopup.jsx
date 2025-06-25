import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"; // 👈 Import the cross icon

const ContactPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          <RxCross2 />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
          Contact Us
        </h2>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center gap-3">
            <FaPhoneAlt className="text-orange-500" />
            <a href="tel:+880123456789" className="hover:underline">
              +880 1234 56789
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FaEnvelope className="text-orange-500" />
            <a href="mailto:info@actforbd.org" className="hover:underline">
              info@actforbd.org
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-orange-500" />
            <span>123 Social St, Dhaka, Bangladesh</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPopup;
