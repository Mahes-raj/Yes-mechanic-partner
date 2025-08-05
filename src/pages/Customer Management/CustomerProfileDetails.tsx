import { MdCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FONTS } from "../../constants/constants";
import { FaCar } from "react-icons/fa";
import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import CustomerServiceDetails from "./CustomerServiceDetails";
import { getAllHistory } from "./Services";

interface handle {
  handleBack: () => void;
}

const CustomerProfileDetails: React.FC<handle> = ({ handleBack}) => {

  useEffect(()=>{
    const fetchCustomerHistory = async()=>{
      try{
        const response:any = await getAllHistory('');
        console.log("Customer History Response:", response.data.data);
      }catch(error){
        console.error("Error fetching customer history:", error);
      }
    }
    fetchCustomerHistory();
  },[])

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Profile Section - Left Side */}
      <div className="w-full md:w-2/3 lg:w-1/4 p-2 relative">
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-full">
          {/* Back Button - Top Left Corner */}
          <motion.button
            className="absolute top-3 left-3 z-10 p-2 hover:bg-gray-100 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </motion.button>

          <div
            className="flex flex-col items-center py-8 px-4 bg-gradient-to-b from-amber-50 to-white"
            style={{ fontFamily: FONTS.header.fontFamily }}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-28 h-28 mb-4 rounded-full shadow-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300"
              src="https://www.svgrepo.com/show/475692/whatsapp-color.svg"
              alt="Chris Bumstead"
              whileHover={{ scale: 1.05 }}
            />

            <motion.h5
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800"
            >
              Chris Bumstead
            </motion.h5>

            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm text-amber-600 font-medium"
            >
              Professional Athlete
            </motion.span>

            <motion.div
              className="flex gap-5 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.a
                href="#"
                className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src="https://www.svgrepo.com/show/475692/whatsapp-color.svg" alt="WhatsApp" className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                whileHover={{ scale: 1.1, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src="https://www.svgrepo.com/show/398466/telephone-receiver.svg" alt="Phone" className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src="https://www.svgrepo.com/show/485253/email-opened.svg" alt="Email" className="w-5 h-5" />
              </motion.a>
            </motion.div>

            <motion.div
              className="mt-5 px-4 py-1 bg-amber-100 rounded-full flex items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium text-amber-800">Premium Membership</span>
              <motion.svg
                className="w-4 h-4 text-amber-500 ml-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                animate={{ rotate: 360 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </motion.svg>
            </motion.div>
          </div>

          <motion.div
            className="px-6 py-4 border-t border-gray-100"
            style={{ fontFamily: FONTS.paragraph.fontFamily }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {[
              { icon: <MdCall />, label: "Phone", value: "+1 234 567 6789" },
              { icon: <MdEmail />, label: "Email", value: "Cbum@gmail.com" },
              { icon: <FaCar />, label: "Vehicles", value: "PORSCHE 911 GT3 , Nissan GTR,  Ford 1978 F150 Lariat edition, 1969 Chevrolet Camaro" },
              { icon: <FaLocationDot />, label: "Address", value: "3512 Carlson Road, Prince George, British Columbia, Canada" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <div className="text-amber-600 mt-1 mr-3">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-gray-700 font-medium pt-1 pb-1">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3"
            style={{ fontFamily: FONTS.paragraph.fontFamily }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {["6+ Years Experience", "Premium Member", "#1 Customer"].map((badge, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full flex items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05, backgroundColor: "#FDE68A", color: "#92400E" }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content Section - Right Side */}
      <CustomerServiceDetails />
    </div>
  );
};

export default CustomerProfileDetails;