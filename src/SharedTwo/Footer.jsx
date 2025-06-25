import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false); // For contact popup

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}! (Demo only)`);
    setEmail("");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/upcomingEvents", label: "Events" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebookF />, label: "Facebook" },
    { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
    { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
    { href: "https://linkedin.com", icon: <FaLinkedinIn />, label: "LinkedIn" },
  ];

  return (
    <>
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t-4 border-orange-500 shadow-lg py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-widest">
              <span className="text-orange-500">Act</span>
              <span className="text-gray-300">ForBD</span>
            </h2>
            <p className="text-sm opacity-70 max-w-sm">
              Connecting communities through social service events and actions.
            </p>
            <p className="text-xs opacity-50">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-orange-500 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={label}>
                  {label === "Contact" ? (
                    <button
                      onClick={() => setShowPopup(true)}
                      className="hover:text-orange-400 transition w-full text-left"
                    >
                      {label}
                    </button>
                  ) : (
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `relative group hover:text-orange-400 ${isActive ? "text-orange-500" : ""
                        }`
                      }
                    >
                      {label}
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-orange-500"></span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-orange-500 pb-2">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-orange-500" />
                <a href="tel:+880123456789" className="hover:text-orange-400 transition">+880 1234 56789</a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-orange-500" />
                <a href="mailto:info@actforbd.org" className="hover:text-orange-400 transition">info@actforbd.org</a>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>123 Social St, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-orange-500 pb-2">Subscribe</h3>
            <p className="text-sm opacity-70 mb-4">
              Get the latest updates and upcoming event news.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-md transition"
              >
                Subscribe
              </button>
            </form>

            <div className="flex space-x-6 mt-6 text-orange-500 text-2xl">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transform hover:scale-110 hover:text-orange-400 transition-transform duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              onClick={() => setShowPopup(false)}
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
      )}
    </>
  );
};

export default Footer;
