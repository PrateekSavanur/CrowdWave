import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-4/5 m-auto p-10">
      <div className="md:flex justify-between items-start my-10">
        {/* Left Section */}
        <div className="space-y-5 py-5 border-b">
          <h1 className="text-3xl font-bold mb-8 mr-5">CrowdWave</h1>
          <div className="flex space-x-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram size={"1.5rem"} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={"1.5rem"} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={"1.5rem"} />
            </a>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex justify-between w-full">
          {/* Company */}
          <div className="space-y-6 flex-1">
            <h2 className="text-xl font-semibold mb-2">Company</h2>
            <ul className="text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-500">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div className="space-y-6 flex-1 ml-8">
            <h2 className="text-xl font-semibold mb-2">Resources</h2>
            <ul className="text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-500">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-500">
                  Support
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-500">
                  API
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-500">
                  Community
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div className="space-y-6 flex-1 ml-8">
            <h2 className="text-xl font-semibold mb-2">Legal</h2>
            <ul className="text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-500">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t py-4 flex items-center justify-center mt-6">
        <p className="text-sm text-gray-600">
          &copy; 2023 <span className="font-bold">CrowdWave</span> All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
