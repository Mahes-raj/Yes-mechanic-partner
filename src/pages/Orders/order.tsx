import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreateOderHistory, getOrdersHistory } from './Services';


const Order = () => {
  // State management
  const [orders, setOrders] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [newOrder, setNewOrder] = useState({
    customer_name: '',
    email: '',
    date: '',
    total: '',
    details: {
      items: [{ name: '', quantity: 1, price: '', image: null }],
      shipping: '',
      address: ''
    }
  });

  useEffect(()=>{
    const fetchOrders = async()=>{
      try{
        const response:any = await getOrdersHistory('')
        console.log('Fetched orders:',response.data.data)
        setOrders(response.data.data)
      }catch(error){
        console.log('Error fetching orders:',error)
      }
    };
    fetchOrders()
  },[])

  // Sample data - just 2 orders as requested
  // const orders = [
  //   {
  //     id: '#ORD1001',
  //     customer: 'John Smith',
  //     email: 'john.smith@example.com',
  //     date: '15/05/2024',
  //     total: '₹12,500',
  //     status: 'Completed',
  //     details: {
  //       items: [
  //         { 
  //           name: 'Car Battery', 
  //           quantity: 1, 
  //           price: '₹8,500',
  //           image: 'https://via.placeholder.com/80?text=Battery'
  //         },
  //         { 
  //           name: 'Engine Oil', 
  //           quantity: 2, 
  //           price: '₹2,000',
  //           image: 'https://via.placeholder.com/80?text=Oil'
  //         },
  //         { 
  //           name: 'Air Filter', 
  //           quantity: 1, 
  //           price: '₹2,000',
  //           image: 'https://via.placeholder.com/80?text=Filter'
  //         }
  //       ],
  //       shipping: 'Express Delivery',
  //       address: '123 Main St, Bangalore, Karnataka'
  //     }
  //   },
  //   {
  //     id: '#ORD1002',
  //     customer: 'Sarah Johnson',
  //     email: 'sarah.j@example.com',
  //     date: '18/05/2024',
  //     total: '₹7,800',
  //     status: 'Processing',
  //     details: {
  //       items: [
  //         { 
  //           name: 'Brake Pads', 
  //           quantity: 1, 
  //           price: '₹4,500',
  //           image: 'https://via.placeholder.com/80?text=Brake'
  //         },
  //         { 
  //           name: 'Windshield Wipers', 
  //           quantity: 2, 
  //           price: '₹1,800',
  //           image: 'https://via.placeholder.com/80?text=Wipers'
  //         },
  //         { 
  //           name: 'Spark Plugs', 
  //           quantity: 4, 
  //           price: '₹1,500',
  //           image: 'https://via.placeholder.com/80?text=Plugs'
  //         }
  //       ],
  //       shipping: 'Standard Delivery',
  //       address: '456 Oak Ave, Mumbai, Maharashtra'
  //     }
  //   },
  //   {
  //     id: '#ORD1002',
  //     customer: 'Sarah Johnson',
  //     email: 'sarah.j@example.com',
  //     date: '18/05/2024',
  //     total: '₹7,800',
  //     status: 'Processing',
  //     details: {
  //       items: [
  //         { 
  //           name: 'Brake Pads', 
  //           quantity: 1, 
  //           price: '₹4,500',
  //           image: 'https://via.placeholder.com/80?text=Brake'
  //         },
  //         { 
  //           name: 'Windshield Wipers', 
  //           quantity: 2, 
  //           price: '₹1,800',
  //           image: 'https://via.placeholder.com/80?text=Wipers'
  //         },
  //         { 
  //           name: 'Spark Plugs', 
  //           quantity: 4, 
  //           price: '₹1,500',
  //           image: 'https://via.placeholder.com/80?text=Plugs'
  //         }
  //       ],
  //       shipping: 'Standard Delivery',
  //       address: '456 Oak Ave, Mumbai, Maharashtra'
  //     }
  //   },
  //   {
  //     id: '#ORD1002',
  //     customer: 'Sarah Johnson',
  //     email: 'sarah.j@example.com',
  //     date: '18/05/2024',
  //     total: '₹7,800',
  //     status: 'Processing',
  //     details: {
  //       items: [
  //         { 
  //           name: 'Brake Pads', 
  //           quantity: 1, 
  //           price: '₹4,500',
  //           image: 'https://via.placeholder.com/80?text=Brake'
  //         },
  //         { 
  //           name: 'Windshield Wipers', 
  //           quantity: 2, 
  //           price: '₹1,800',
  //           image: 'https://via.placeholder.com/80?text=Wipers'
  //         },
  //         { 
  //           name: 'Spark Plugs', 
  //           quantity: 4, 
  //           price: '₹1,500',
  //           image: 'https://via.placeholder.com/80?text=Plugs'
  //         }
  //       ],
  //       shipping: 'Standard Delivery',
  //       address: '456 Oak Ave, Mumbai, Maharashtra'
  //     }
  //   },
  //   {
  //     id: '#ORD1002',
  //     customer: 'Sarah Johnson',
  //     email: 'sarah.j@example.com',
  //     date: '18/05/2024',
  //     total: '₹7,800',
  //     status: 'Processing',
  //     details: {
  //       items: [
  //         { 
  //           name: 'Brake Pads', 
  //           quantity: 1, 
  //           price: '₹4,500',
  //           image: 'https://www.shutterstock.com/image-vector/tyres-stack-realistic-tires-pile-260nw-2455484439.jpg'
  //         },
  //         { 
  //           name: 'Windshield Wipers', 
  //           quantity: 2, 
  //           price: '₹1,800',
  //           image: 'https://via.placeholder.com/80?text=Wipers'
  //         },
  //         { 
  //           name: 'Spark Plugs', 
  //           quantity: 4, 
  //           price: '₹1,500',
  //           image: 'https://via.placeholder.com/80?text=Plugs'
  //         }
  //       ],
  //       shipping: 'Standard Delivery',
  //       address: '456 Oak Ave, Mumbai, Maharashtra'
  //     }
  //   },
  //   {
  //     id: '#ORD1002',
  //     customer: 'Sarah Johnson',
  //     email: 'sarah.j@example.com',
  //     date: '18/05/2024',
  //     total: '₹7,800',
  //     status: 'Processing',
  //     details: {
  //       items: [
  //         { 
  //           name: 'Brake Pads', 
  //           quantity: 1, 
  //           price: '₹4,500',
  //           image: 'https://via.placeholder.com/80?text=Brake'
  //         },
  //         { 
  //           name: 'Windshield Wipers', 
  //           quantity: 2, 
  //           price: '₹1,800',
  //           image: 'https://via.placeholder.com/80?text=Wipers'
  //         },
  //         { 
  //           name: 'Spark Plugs', 
  //           quantity: 4, 
  //           price: '₹1,500',
  //           image: 'https://via.placeholder.com/80?text=Plugs'
  //         }
  //       ],
  //       shipping: 'Standard Delivery',
  //       address: '456 Oak Ave, Mumbai, Maharashtra'
  //     }
  //   }
  // ];

  // Filter and pagination
  const ordersPerPage = 10;
  const filteredOrders = orders.filter(order => {
  const matchesSearch =
    (order?.orderId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (order?.customer_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());

  const matchesDate = dateFilter
    ? new Date(parseInt(order.date)).toISOString().split('T')[0] === dateFilter
    : true;

  return matchesSearch && matchesDate;
});


  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Helper functions
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleNewOrder = async()=>{
    try {
      await CreateOderHistory(newOrder)
        setShowAddModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const closeModal = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setNewOrder({
      customer_name: '',
      email: '',
      date: '',
      total: '',
      details: {
        items: [{ name: '', quantity: 1, price: '', image: null }],
        shipping: '',
        address: ''
      }
    });
  };

  const addNewItem = () => {
    setNewOrder(prev => ({
      ...prev,
      details: {
        ...prev.details,
        items: [...prev.details.items, { name: '', quantity: 1, price: '', image: null }]
      }
    }));
  };

  const removeItem = (index: number) => {
    setNewOrder(prev => ({
      ...prev,
      details: {
        ...prev.details,
        items: prev.details.items.filter((_, i) => i !== index)
      }
    }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...newOrder.details.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewOrder(prev => ({
      ...prev,
      details: {
        ...prev.details,
        items: updatedItems
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedItems = [...newOrder.details.items];
        updatedItems[index] = { 
          ...updatedItems[index], 
        };
        setNewOrder(prev => ({
          ...prev,
          details: {
            ...prev.details,
            items: updatedItems
          }
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const calculateTotal = () => {
    return newOrder.details.items.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString("en-IN");
};


  return (
    <div className="p-4 md:p-6">
      {/* Summary Cards */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Completed Orders</h3>
          <p className="text-2xl font-bold text-gray-800">
            {orders.filter(o => o.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">Processing Orders</h3>
          <p className="text-2xl font-bold text-gray-800">
            {orders.filter(o => o.status === 'Processing').length}
          </p>
        </div>
      </motion.div>

      {/* Header and Filters */}
      <motion.div 
        variants={slideUp}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <h1 className="text-[#9b111e] text-3xl font-bold">Car Spare Parts Orders</h1>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or Name..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          
          {/* <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#9b111e] hover:bg-[#7a0d19] text-white font-medium py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            + Add Order
          </button> */}
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div 
        variants={slideUp}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {order.customer_name?.charAt(0) || "?"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.customer_name}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <td>{formatDate(order.date)}</td>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-[#9b111e] hover:text-[#7a0d19] mr-3 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <motion.div 
          variants={fadeIn}
          className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4"
        >
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * ordersPerPage + 1} to{' '}
            {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of{' '}
            {filteredOrders.length} orders
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#9b111e] text-white hover:bg-[#7a0d19]'} transition-colors`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full ${currentPage === page ? 'bg-[#9b111e] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition-colors`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#9b111e] text-white hover:bg-[#7a0d19]'} transition-colors`}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Add Order Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
                <h3 className="text-xl font-semibold text-gray-900">Add New Car Spare Parts Order</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      placeholder="Enter customer name"
                      value={newOrder.customer_name}
                      onChange={(e) => setNewOrder({...newOrder, customer_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      placeholder="Enter email"
                      value={newOrder.email}
                      onChange={(e) => setNewOrder({...newOrder, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Date*</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      value={newOrder.date}
                      onChange={(e) => setNewOrder({...newOrder, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method*</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      value={newOrder.details.shipping}
                      onChange={(e) => setNewOrder({...newOrder, details: {...newOrder.details, shipping: e.target.value}})}
                    >
                      <option value="">Select shipping method</option>
                      <option value="Standard Delivery">Standard Delivery</option>
                      <option value="Express Delivery">Express Delivery</option>
                      <option value="In-Store Pickup">In-Store Pickup</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address*</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      placeholder="Enter full shipping address"
                      rows={3}
                      value={newOrder.details.address}
                      onChange={(e) => setNewOrder({...newOrder, details: {...newOrder.details, address: e.target.value}})}
                    ></textarea>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Order Items</h4>
                    <button
                      type="button"
                      onClick={addNewItem}
                      className="text-sm bg-[#9b111e] text-white px-3 py-1 rounded hover:bg-[#7a0d19] transition-colors"
                    >
                      + Add Item
                    </button>
                  </div>

                  {newOrder.details.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="col-span-12 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex items-center">
                          {item.image ? (
                            <img src={item.image} alt="Preview" className="h-16 w-16 object-cover rounded" />
                          ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-500">No image</span>
                            </div>
                          )}
                          <label className="ml-2 cursor-pointer">
                            <span className="text-xs bg-[#9b111e] text-white px-2 py-1 rounded hover:bg-[#7a0d19] transition-colors">
                              Upload
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name*</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                          placeholder="Enter item name"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="col-span-6 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                        <input
                          type="number"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        />
                      </div>
                      <div className="col-span-6 md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                          placeholder="Enter price"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                        />
                      </div>
                      <div className="col-span-12 md:col-span-1 flex items-end justify-end">
                        {newOrder.details.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Subtotal: ₹{calculateTotal().toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Shipping: ₹0</p>
                      <p className="text-lg font-semibold mt-1">Total: ₹{calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-4 border-t sticky bottom-0 bg-white">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#9b111e] text-white rounded-md hover:bg-[#7a0d19] transition-colors"
                  onClick={handleNewOrder}
                >
                  Save Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Order Modal */}
      <AnimatePresence>
        {showViewModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
                <h3 className="text-xl font-semibold text-gray-900">Order Details - {selectedOrder.id}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span> {selectedOrder.customer_name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {selectedOrder.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {selectedOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Order Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Date:</span> {selectedOrder.date}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Shipping:</span> {selectedOrder.details.shipping}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Total:</span> {selectedOrder.total}
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.details.items.map((item: any, index: number) => {
                        const price = parseInt(item.price);
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₹{(price * item.quantity).toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h4>
                    <p className="text-gray-600">{selectedOrder.details.address}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Order Summary</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{selectedOrder.total}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium">₹0</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="text-gray-900 font-medium">Total:</span>
                        <span className="text-[#9b111e] font-bold">{selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-4 border-t sticky bottom-0 bg-white">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-[#9b111e] text-white rounded-md hover:bg-[#7a0d19] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Order;