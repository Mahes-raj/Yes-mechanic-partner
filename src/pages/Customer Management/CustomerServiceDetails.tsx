import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch,  FiClock, FiCheckCircle, FiRotateCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {  FONTS } from '../../constants/constants';

interface Service {
  id: number;
  name: string;
  description: string;
  wash: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  price: string;
  date: string;
  orderID: string;
  vehicleNo: string;
  modalImg: string;
}

type Product = {
  id: number;
  date: string;
  name: string;
  vehicle: string;
  vehicleNo: string;
  price: string;
  serviceDetails?: Service;
};

const CustomerServiceDetails = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);


  const productsData: Product[] = [
    { 
      id: 1, 
      date: "Apr 14, 2026", 
      name: "Engine Repair",
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 8743', 
      price: '₹2,999',
      serviceDetails: {
        id: 1,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹2,999",
        date: "May 15, 2023",
        orderID: "#123",
        vehicleNo: "TN 69 L 8743",
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5U1exPRb8nYGzOkh9Vb7FLMoG_ufwMUW0w&s"
      }
    },
    { 
      id: 2, 
      date: "Mar 07, 2026",
      name: 'Oil Service', 
      vehicle: 'Benz', 
      vehicleNo: 'TN 69 L 2343', 
      price: '₹1,999',
      serviceDetails: {
        id: 2,
        name: "Oil Service",
        description: "Complete oil change with premium synthetic oil and filter replacement.",
        wash: "Basic Wash",
        duration: "1 hour",
        status: "Completed",
        price: "₹1,999",
        date: "June 2, 2023",
        orderID: "#124",
        vehicleNo: "TN 69 L 9123",
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0m-bnN72wqG0IKyt_EpEzubRR0HbLRDrJQ&s"
      }
    },
    { 
      id: 3, 
      date: "Jun 19, 2026",
      name: 'Seat Change', 
      vehicle: 'Rolls Royce', 
      vehicleNo: 'TN 69 L 9123', 
      price: '₹9,999',
      serviceDetails: {
        id: 3,
        name: "Seat Change",
        description: "Replacement of driver and passenger seats with new premium leather seats.",
        wash: "None",
        duration: "2 hours",
        status: "Completed",
        price: "₹9,999",
        date: "June 10, 2023",
        orderID: "#124",
        vehicleNo: "TN 69 L 9123",
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPbWFlVL5ha1bX46zgwq76giio-GpX3HWatQ&s"
      }
    },
    { 
      id: 4, 
      date: "Apr 07, 2026",
      name: 'Engine Service', 
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 9099', 
      price: '₹3,499',
      serviceDetails: {
        id: 4,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹3,499",
        date: "May 15, 2023",
        orderID: "#125",
        vehicleNo: 'TN 69 L 9099',
        modalImg: "https://img.etimg.com/thumb/width-420,height-315,imgsize-416137,resizemode-75,msid-115343296/industry/auto/tyres/no-brakes-on-tyre-price-hikes-likely-for-now/tyres-bccl.jpg"
      }
    },
    { 
      id: 5, 
      date: "Jan 01, 2026",
      name: 'Engine Service', 
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 8345', 
      price: '₹3,299',
      serviceDetails: {
        id: 5,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹3,299",
        date: "May 15, 2023",
        orderID: "#126",
        vehicleNo: 'TN 69 L 8345', 
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gVe2BnWWyTjcBDuV58IRxv0JFBAm5IA4TQ&s"
      }
    },
    { 
      id: 6, 
      date: "May 28, 2026",
      name: 'Engine Service', 
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 9837', 
      price: '₹3,799',
      serviceDetails: {
        id: 6,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹3,799",
        date: "May 15, 2023",
        orderID: "#127",
        vehicleNo: 'TN 69 L 9837',
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5U1exPRb8nYGzOkh9Vb7FLMoG_ufwMUW0w&s"
      }
    },
    { 
      id: 7, 
      date: "Jun 01, 2026",
      name: 'Engine Service', 
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 9873', 
      price: '₹4,199',
      serviceDetails: {
        id: 7,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹4,199",
        date: "May 15, 2023",
        orderID: "#128",
        vehicleNo: 'TN 69 L 9873',
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPbWFlVL5ha1bX46zgwq76giio-GpX3HWatQ&s"
      }
    },
    { 
      id: 8, 
      date: "May 01, 2026",
      name: 'Engine Service', 
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 1029', 
      price: '₹3,899',
      serviceDetails: {
        id: 8,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹3,899",
        date: "May 15, 2023",
        orderID: "#129",
        vehicleNo: 'TN 69 L 1029',
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5U1exPRb8nYGzOkh9Vb7FLMoG_ufwMUW0w&s"
      }
    },
    { 
      id: 9, 
      date: "May 17, 2026",
      name: 'Engine Service', 
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 8744', 
      price: '₹3,599',
      serviceDetails: {
        id: 9,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹3,599",
        date: "May 15, 2023",
        orderID: "#130",
        vehicleNo: 'TN 69 L 8744',
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gVe2BnWWyTjcBDuV58IRxv0JFBAm5IA4TQ&s"
      }
    },
    { 
      id: 10, 
      date: "May 19, 2026",
      name: 'Engine Service', 
      vehicle: 'BMW', 
      vehicleNo: 'TN 69 L 7243', 
      price: '₹4,499',
      serviceDetails: {
        id: 10,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair service including oil change, filter replacement, and tune-up.",
        wash: "Foam Wash",
        duration: "3-4 hours",
        status: "Completed",
        price: "₹4,499",
        date: "May 15, 2023",
        orderID: "#131",
        vehicleNo: 'TN 69 L 7243',
        modalImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5U1exPRb8nYGzOkh9Vb7FLMoG_ufwMUW0w&s"
      }
    },
  ];

  const filteredProducts = productsData.filter(product => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      product.vehicle.toLowerCase().includes(searchTermLower) ||
      product.vehicleNo.toLowerCase().includes(searchTermLower) ||
      product.name.toLowerCase().includes(searchTermLower)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleViewClick = (product: Product) => {
    if (product.serviceDetails) {
      setSelectedService(product.serviceDetails);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchTerm('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'In Progress':
        return <FiRotateCw className="text-blue-500 animate-spin" />;
      case 'Pending':
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const formatPrice = (priceString: string) => {
    if (priceString.includes('₹')) return priceString;
    const numericValue = priceString.replace(/[^0-9]/g, '');
    const formattedValue = new Intl.NumberFormat('en-IN').format(parseInt(numericValue));
    return `₹${formattedValue}`;
  };

  return (
    <div className="w-full " style={{ fontFamily: FONTS.header.fontFamily }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#9b111e] pl-2">Service History</h2>
        
        <div className="flex gap-3 w-full md:w-auto">
          <motion.div
            className="relative flex-grow md:flex-grow-0"
            initial={{ width: showSearch ? '100%' : 'auto' }}
            animate={{ width: showSearch ? '100%' : 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {showSearch && (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                type="text"
                placeholder="Search by vehicle, service, or number..."
                className="w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleSearch}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${showSearch ? 'text-gray-500' : 'text-gray-600'}`}
            >
              {showSearch ? <FiX size={20} /> : <FiSearch size={20} />}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle No
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                    style={{ fontFamily: FONTS.paragraph.fontFamily }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.vehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-md font-mono">
                        {product.vehicleNo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewClick(product)}
                        className="text-[#9b111e] hover:text-white bg-[#fdefe9] hover:bg-[#9b111e] px-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="text-gray-500 flex flex-col items-center justify-center">
                      <FiSearch className="w-10 h-10 mb-3 opacity-50" />
                      <p className="text-lg">No services found</p>
                      {searchTerm && (
                        <p className="text-sm mt-1">Try adjusting your search query</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredProducts.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of{' '}
                  <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-[#9b111e] border-[#9b111e] text-[#ffffff]'
                          : '  text-[#9b111e] hover:bg-[#9b111e] hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <img src={selectedService.modalImg} alt="Service" className="w-1/4 rounded-lg"/>
                  <div className="flex-1 pl-4">
                    <h3 className="text-2xl font-bold text-gray-800">{selectedService.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Order ID: {selectedService.orderID}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800">Description</h4>
                    <p className="text-gray-600 mt-1">{selectedService.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800">Wash Type</h4>
                      <p className="text-gray-600 mt-1">{selectedService.wash}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Duration</h4>
                      <p className="text-gray-600 mt-1">{selectedService.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Vehicle No</h4>
                      <p className="text-gray-600 mt-1 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                        {selectedService.vehicleNo}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Status</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedService.status)}`}>
                          {selectedService.status}
                        </span>
                        {getStatusIcon(selectedService.status)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Price</h4>
                      <p className="text-gray-600 mt-1 font-semibold">{formatPrice(selectedService.price)}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Service Date</h4>
                      <p className="text-gray-600 mt-1">{selectedService.date}</p>
                    </div>
                  </div>
                </div>  
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerServiceDetails;