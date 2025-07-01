import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import ThemeToggle from '../components/ThemeToggle';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handlesignOut = () => {
    signOutUser()
      .then(() => console.log("Signed out user"))
      .catch((error) => console.log(error.message));
  };

  const navItemBaseColor = "text-gray-300";
  const navItemActiveColor = "text-[#FF7E33] underline decoration-2 underline-offset-4 font-semibold";
  const navItemHoverColor = "hover:text-[#FF7E33] transition-colors duration-300";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${isActive ? navItemActiveColor : `${navItemBaseColor} ${navItemHoverColor}`}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/upcomingEvents"
          className={({ isActive }) =>
            `${isActive ? navItemActiveColor : `${navItemBaseColor} ${navItemHoverColor}`}`
          }
        >
          Upcoming Events
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/createEvents"
          className={({ isActive }) =>
            `${isActive ? navItemActiveColor : `${navItemBaseColor} ${navItemHoverColor}`}`
          }
        >
          Create Events
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manageEvents"
          className={({ isActive }) =>
            `${isActive ? navItemActiveColor : `${navItemBaseColor} ${navItemHoverColor}`}`
          }
        >
          Manage Events
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/joinedEvents"
          className={({ isActive }) =>
            `${isActive ? navItemActiveColor : `${navItemBaseColor} ${navItemHoverColor}`}`
          }
        >
          Joined Events
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `${isActive ? navItemActiveColor : `${navItemBaseColor} ${navItemHoverColor}`}`
          }
        >
          Blogs
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className="navbar shadow-md px-4 md:px-8 sticky top-0 z-50"
      style={{ backgroundColor: '#1F2937', color: '#E5E7EB' }}
    >
      <div className="navbar-start">

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            style={{ color: '#E5E7EB' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#E5E7EB"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow"
            style={{ backgroundColor: '#1F2937', color: '#E5E7EB' }}
          >
            {links}
          </ul>
        </div>


        <NavLink to="/" className="select-none flex items-center gap-2 overflow-hidden">
          <motion.img
            src="/walking.svg"
            alt="Logo"
            className="w-10 h-10 drop-shadow-md"
            animate={{ x: [0, 10, 0] }} 
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.h2
            className="text-2xl font-bold tracking-wide"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <span style={{ color: '#FF7E33' }}>Act</span>
            <span style={{ color: '#E5E7EB' }}>ForBD</span>
          </motion.h2>
        </NavLink>

      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={handlesignOut}
              className="btn transition-all duration-300 text-white border-none"
              style={{ backgroundColor: '#FF7E33' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E67300')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF7E33')}
            >
              Sign Out
            </button>
            <img
              src={user.photoURL}
              alt={user.displayName}
              title={user.displayName}
              className="rounded-full w-10 h-10 cursor-pointer border-2 border-[#FF7E33]"
            />
          </>
        ) : (
          <NavLink
            to="/signIn"
            className="btn text-white border-none transition-all duration-300"
            style={{ backgroundColor: '#FF7E33' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E67300')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF7E33')}
          >
            Sign In
          </NavLink>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
