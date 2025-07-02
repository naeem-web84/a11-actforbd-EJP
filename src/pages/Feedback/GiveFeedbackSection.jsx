import { Link } from "react-router";

const GiveFeedbackSection = () => {
  return (
    <section className="bg-[#2C3E50] text-white py-12 px-6 rounded-2xl font-poppins max-w-6xl mx-auto mt-10">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#F1C40F]">
          We Value Your Feedback
        </h2>
        <p className="mb-6 text-[#ECF0F1] opacity-80">
          Let us know your thoughts, suggestions, or issues to help improve ActForBD.
        </p>
        <Link to="/feedback">
          <button className="btn bg-[#FF7E33] hover:bg-[#E67300] text-white border-none px-6 py-2 rounded-lg text-sm md:text-base">
            Give Us Your Feedback
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GiveFeedbackSection;
