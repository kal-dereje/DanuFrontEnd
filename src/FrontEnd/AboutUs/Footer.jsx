import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-32 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p>Email: info@mindrest.com</p>
            <p>Phone: +251-XXX-XXXX</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex">
              <a href="#" className="mr-4">
                Facebook
              </a>
              <a href="#" className="mr-4">
                Twitter
              </a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 MindRest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
