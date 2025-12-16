import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 text-gray-600 py-6 text-center flex md:flex-row flex-col justify-between items-center px-16">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MindMint. All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-4">
          <a href="#" className="hover:text-gray-800">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-800">
            Terms
          </a>
          <a href="#" className="hover:text-gray-800">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
