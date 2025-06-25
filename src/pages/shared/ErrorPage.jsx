import { Link } from "react-router"; 
import Lottie from "lottie-react";
import errorLottie from "../../assets/errorLottieTwo.json"; 
const ErrorPage = () => {
    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-64 h-64 mb-6">
                <Lottie animationData={errorLottie} loop={true} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                404 - Page Not Found
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-md drop-shadow-md">
                Sorry, the page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-[#FF7E33] text-white rounded-full hover:bg-orange-500 transition-all shadow-md"
            >
                ⬅ Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
