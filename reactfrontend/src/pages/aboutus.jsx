import React from "react";
import { MdGroups, MdCode, MdEco, MdLocationOn } from "react-icons/md";

import aboutIllustration from "../Images/Volunteering-amico (1).png";

import Header from "./header";
const AboutUs = () => {
  return (
    <div className="bg-white text-black min-h-screen px-4 flex flex-col">
      {/* Header - Same as Home page */}
      <Header></Header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-20 py-8 gap-10 mb-10">
        <div className="w-full md:w-1/2 mb-12">
          <h1 className="text-5xl font-bold mb-10">
            About <span className="text-green-300">Raskilha</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Raskilha is revolutionizing waste management in Tunisia by connecting citizens with 
            waste collectors through our innovative platform. Our name comes from the Arabic 
            verb "raskil" meaning "to recycle," reflecting our mission to create a cleaner 
            environment while improving lives.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MdEco className="text-green-300 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Our Mission</h3>
                <p className="text-gray-600">
                  To bridge the gap between waste sources and collectors, making recycling 
                  efficient and accessible for everyone in Tunisia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MdLocationOn className="text-green-300 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">How It Works</h3>
                <p className="text-gray-600">
                  Citizens report recyclable waste locations, and collectors can easily find 
                  and claim them, optimizing collection routes and reducing environmental impact.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="hidden  md:flex justify-center ">
          <img 
            width={550}
            height={450}
            src={aboutIllustration} 
            alt="About Raskilha" 
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="px-6 md:px-20 py-10 bg-gray-50 rounded-xl mx-6 md:mx-20 mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Meet Our <span className="text-green-300">Team</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: "Mohamed El Amine Fezai", role: "Developer" },
            { name: "Moedem Errachi", role: "Developer" },
            { name: "Abderrazek Houidi", role: "Developer" },
            { name: "Louay Hamdani", role: "Developer" }
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdGroups className="text-green-300 text-3xl" />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-6 md:px-20 py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to make a <span className="text-green-300">difference</span>?
        </h2>
        <button className="bg-green-300 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-400 text-lg">
          Join Raskilha Today
        </button>
      </div>
    </div>
  );
};

export default AboutUs;