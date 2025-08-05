import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaArrowUp,
  FaChevronRight,
  FaChevronLeft,
  FaFilter,
} from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUsers, FaTools, FaShoppingCart } from "react-icons/fa";
import { getAllCustomer } from "./Services";

// const customerData = [
//   {
//     name: 'John Doe',
//     email: 'john@example.com',
//     services: '6',
//     orders: 3,
//     spec: 'Toyota Camry',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     services: '8',
//     orders: 5,
//     spec: 'Honda Civic',
//     status: 'Inactive',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Sam Wilson',
//     email: 'sam@example.com',
//     services: '3',
//     orders: 2,
//     spec: 'Ford Explorer',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Emily Johnson',
//     email: 'emily@example.com',
//     services: '7',
//     orders: 4,
//     spec: 'Nissan Altima',
//     status: 'Inactive',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Michael Brown',
//     email: 'michael@example.com',
//     services: '5',
//     orders: 1,
//     spec: 'BMW 3 Series',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Emily Johnson',
//     email: 'emily@example.com',
//     services: '7',
//     orders: 4,
//     spec: 'Nissan Altima',
//     status: 'Inactive',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Michael Brown',
//     email: 'michael@example.com',
//     services: '5',
//     orders: 1,
//     spec: 'BMW 3 Series',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'John Doe',
//     email: 'john@example.com',
//     services: '6',
//     orders: 3,
//     spec: 'Toyota Camry',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Emily Johnson',
//     email: 'emily@example.com',
//     services: '7',
//     orders: 4,
//     spec: 'Nissan Altima',
//     status: 'Inactive',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Michael Brown',
//     email: 'michael@example.com',
//     services: '5',
//     orders: 1,
//     spec: 'BMW 3 Series',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Emily Johnson',
//     email: 'emily@example.com',
//     services: '7',
//     orders: 4,
//     spec: 'Nissan Altima',
//     status: 'Inactive',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Michael Brown',
//     email: 'michael@example.com',
//     services: '5',
//     orders: 1,
//     spec: 'BMW 3 Series',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'John Doe',
//     email: 'john@example.com',
//     services: '6',
//     orders: 3,
//     spec: 'Toyota Camry',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     services: '8',
//     orders: 5,
//     spec: 'Honda Civic',
//     status: 'Inactive',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
//   {
//     name: 'Sam Wilson',
//     email: 'sam@example.com',
//     services: '3',
//     orders: 2,
//     spec: 'Ford Explorer',
//     status: 'Active',
//     image: 'https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg',
//   },
// ];

const ITEMS_PER_PAGE = 5;

const SimpleDonutChart = ({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) => {
  const radius = 40;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  const renderSegments = data.map((slice, index) => {
    const offset = circumference * cumulativePercent;
    const dash = (slice.value / 100) * circumference;
    cumulativePercent += slice.value / 100;

    return (
      <circle
        key={index}
        r={radius}
        cx="50"
        cy="50"
        fill="transparent"
        stroke={slice.color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeDashoffset={-offset}
        transform="rotate(-90 50 50)"
      />
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-6 h-full w-full flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
    >
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#800000] pb-5">
          Customer Status
        </h3>
        <div className="space-y-2">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 text-sm font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700">{item.label}:</span>
              <span className="text-gray-900">{item.value}%</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {renderSegments}
          </motion.g>
          <circle cx="50" cy="50" r="30" fill="white" />
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#800000"
          >
            {data.reduce((acc, item) => acc + item.value, 0)}%
          </text>
        </svg>
      </div>
    </motion.div>
  );
};

type ProfileViewComponent = {
  onProfileView: () => void;
};

const CustomerDetails: React.FC<ProfileViewComponent> = ({ onProfileView }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await getAllCustomer("");
        console.log("Fetched customers", response.data.customer);
        setCustomerData(response.data.customer);
      } catch (error) {
        console.log("Error fetching customer", error);
      }
    };
    fetchCustomer();
  }, []);

  const activeCount = customerData.filter((c) => c.is_active).length;
  const inactiveCount = customerData.filter((c) => !c.is_active).length;
  const total = activeCount + inactiveCount;

  const donutChartData =
    total > 0
      ? [
          {
            label: "Active",
            value: Math.round((activeCount / total) * 100),
            color: "#10B981",
          },
          {
            label: "Inactive",
            value: Math.round((inactiveCount / total) * 100),
            color: "#EF4444",
          },
        ]
      : [];

  const filteredData = Array.isArray(customerData)
    ? customerData.filter((customer) => {
        const name = customer.name?.toLowerCase() || "";
        const email = customer.email?.toLowerCase() || "";

        const matchesSearch =
          name.includes(search.toLowerCase()) ||
          email.includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "Active"
            ? customer.is_active === true
            : statusFilter === "Inactive"
            ? customer.is_active === false
            : true;

        return matchesSearch && matchesStatus;
      })
    : [];

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-red-50 to-gray-50">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#800000] mb-2">
          Customer Management
        </h1>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {["Total Customers", "Total Services", "Total Orders"].map(
          (title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 relative h-48"
            >
              {/* Percentage in top right corner */}
              <motion.div
                className="absolute top-4 right-4 flex items-center space-x-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FaArrowUp className="text-xs" />
                <span>{[15, 8, 12][i]}%</span>
              </motion.div>

              <div className="flex flex-col h-full justify-between">
                <div>
                  <p className="text-sm font-medium text-[#800000]">{title}</p>
                  <p className="mt-12 text-5xl font-bold text-gray-800">
                    <CountUp
                      end={
                        i === 0
                          ? Array.isArray(customerData)
                            ? customerData.length
                            : 0
                          : i === 1
                          ? Array.isArray(customerData)
                            ? customerData.reduce(
                                (acc, c) => acc + Number(c.services || 0),
                                0
                              )
                            : 0
                          : Array.isArray(customerData)
                          ? customerData.reduce(
                              (acc, c) => acc + Number(c.orders || 0),
                              0
                            )
                          : 0
                      }
                      duration={2.5}
                    />
                  </p>
                </div>

                <div className="flex justify-end -mt-12">
                  <motion.div
                    className="text-[#b94747]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {i === 0 ? (
                      <FaUsers className="text-4xl" />
                    ) : i === 1 ? (
                      <FaTools className="text-4xl" />
                    ) : (
                      <FaShoppingCart className="text-4xl" />
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        )}

        {/* Donut Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 relative h-48"
        >
          <SimpleDonutChart data={donutChartData} />
        </motion.div>
      </div>

      {/* Customer Table Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaSearch />
            </div>
            <motion.input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {showFilters && (
              <motion.div
                className="flex items-center gap-2 bg-gray-100 rounded-lg p-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <button
                  onClick={() => handleStatusFilter(null)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    statusFilter === null
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-50"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => handleStatusFilter("Active")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    statusFilter === "Active"
                      ? "bg-green-100 text-green-800"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Active
                </button>

                <button
                  onClick={() => handleStatusFilter("Inactive")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    statusFilter === "Inactive"
                      ? "bg-red-100 text-red-800"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Inactive
                </button>
              </motion.div>
            )}

            <motion.button
              onClick={handleFilterClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters
                  ? "bg-[#800000] text-white border-[#800000]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter className="text-sm" />
              <span className="text-sm">Filters</span>
            </motion.button>
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 text-sm font-semibold text-gray-600 p-4 bg-gray-50 border-b border-gray-200">
              <div className="pl-6">Customer</div>
              <div className="pl-2">Email</div>
              <div className="pl-2 text-center">Services</div>
              <div className="pl-2 text-center">Orders</div>
              <div className="pl-2">Vehicle</div>
              <div className="pl-2 text-center">Status</div>
              <div className="pl-2">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((customer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "#fef2f2" }}
                    className="grid grid-cols-7 gap-4 items-center text-sm p-4 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3 pl-2">
                      <motion.img
                        src={customer.image}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        whileHover={{ scale: 1.1 }}
                      />
                      <span className="font-medium text-gray-800">
                        {customer.firstName + " " + customer.lastName}
                      </span>
                    </div>
                    <div className="text-gray-600 truncate pr-2">
                      {customer.email}
                    </div>
                    <div className="text-center text-gray-700">
                      {customer.services}
                    </div>
                    <div className="text-center text-gray-700">
                      {customer.orders}
                    </div>
                    <div className="text-gray-600 truncate pr-2">
                      {customer.vehicleInfo.model}
                    </div>
                    <div className="flex justify-center">
                      <motion.span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {customer.is_active ? "Active" : "Inactive"}
                      </motion.span>
                    </div>
                    <div>
                      <motion.button
                        onClick={onProfileView}
                        className="text-[#800000] hover:text-[#990000] font-medium text-sm flex items-center gap-1"
                        whileHover={{ x: 3 }}
                      >
                        View <FaChevronRight className="text-xs" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-500">
                    No customers found matching your search
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredData.length > ITEMS_PER_PAGE && (
          <motion.div
            className="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition 
                ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed bg-gray-100 border-gray-200"
                    : "text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700 border-transparent"
                }`}
              whileHover={currentPage !== 1 ? { scale: 1.03 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.97 } : {}}
            >
              <FaChevronLeft className="text-xs" />
              Previous
            </motion.button>

            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>

            <motion.button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition 
                ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed bg-gray-100 border-gray-200"
                    : "text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700 border-transparent"
                }`}
              whileHover={currentPage !== totalPages ? { scale: 1.03 } : {}}
              whileTap={currentPage !== totalPages ? { scale: 0.97 } : {}}
            >
              Next
              <FaChevronRight className="text-xs" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CustomerDetails;
