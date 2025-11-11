import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-10 bg-white border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section */}
        <p className="text-gray-600 text-sm mb-4 sm:mb-0">
          © {new Date().getFullYear()} <span className="font-semibold text-gray-800">Made By Abreeq, Asrar, Saleh, Moomin, and Mutaib</span>. All rights reserved.
        </p>

        {/* Center Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="/privacy" className="hover:text-blue-500 transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-500 transition">Terms of Service</a>
          <a href="/contact" className="hover:text-blue-500 transition">Contact</a>
        </div>

        {/* Right Section (Socials) */}
        <div className="flex gap-5 mt-4 sm:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
