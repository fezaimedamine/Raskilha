import animation from '../Images/animation.json'
import Lottie from "lottie-react";
const Loading = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
        <Lottie animationData={animation} loop={true} className="w-60" />
        <p className="mt-4 text-lg text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  };
  
  export default Loading;
  