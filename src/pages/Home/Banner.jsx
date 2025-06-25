import Lottie from 'lottie-react';
import React from 'react';
import planBoom from "../../assets/lotties/planBoom.json";
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div>
      <section
        className="rounded-lg p-10 flex flex-col md:flex-row items-center justify-between"
        style={{ backgroundColor: '#2C3E50', color: '#E5E7EB' }}
      >
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <Typewriter
              words={['Connect & Empower Your Community']}
              loop={true} 
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000} 
            />
          </h1>

          <p className="text-lg md:text-xl opacity-90">
            Join and create social development events that bring positive change.
          </p>

          <Link
            to="/upcomingEvents"
            className="btn btn-lg text-white"
            style={{ backgroundColor: '#FF7E33', borderColor: '#FF7E33' }}
          >
            Explore Events
          </Link>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0">
          <Lottie animationData={planBoom} loop={true} />
        </div>
      </section>
    </div>
  );
};

export default Banner;
