import React from "react";
import { MdEmail, MdPhone, MdLocationOn, MdSend } from "react-icons/md";
import logo from "../Images/logo.png";
import contactIllustration from "../Images/citizen.png";
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="bg-white text-black min-h-screen px-4 flex flex-col">
      {/* Header - Consistent with other pages */}
      <div className="flex justify-around items-center p-6 gap-14">
        <div className="text-2xl font-bold flex items-center ml-4">
          <img src={logo} width={200} height={200} alt="logo" /> 
        </div>
        <ul className="flex items-center gap-10">
        <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li className="font-bold text-green-300"><Link to="/contactus">Contact</Link></li>
        </ul>
        <button className="bg-green-300 px-5 text-white py-2 rounded-2xl shadow-md hover:bg-green-400">
          Join Us
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-20 py-16 gap-10">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">
            Get In <span className="text-green-300">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about Raskilha? Want to partner with us or report an issue?
            Our team is here to help you with any inquiries about our recycling platform.
          </p>
          
          {/* Contact Information Cards */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MdEmail className="text-green-300 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-gray-600">contact@raskilha.tn</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MdPhone className="text-green-300 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-gray-600">+216 12 345 678</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MdLocationOn className="text-green-300 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Visit Us</h3>
                <p className="text-gray-600">
                  Faculty of Sciences of Tunis<br />
                  University of Tunis El Manar<br />
                  Tunis, Tunisia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="What's this about?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
              <textarea 
                id="message" 
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 bg-green-300 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-400 w-full"
            >
              <MdSend /> Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 md:px-20 py-10 text-center mt-4">
        <h2 className="text-2xl font-bold mb-4">
          Have questions about <span className="text-green-300">recycling</span> in your area?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team is available 7 days a week to help you with any questions about waste collection,
          recycling centers, or using the Raskilha platform.
        </p>
        <button className="bg-green-300 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-400 text-lg">
          Get Instant Help
        </button>
      </div>
    </div>
  );
};

export default ContactUs;