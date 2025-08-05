/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState, useEffect } from "react";
import {
  Car,
  Wrench,
  Calendar,
  Clock,
  Phone,
  Plus,
  Search,
  Edit,
  Trash2,
  BarChart3,
  Eye,
  X,
  CheckCircle,
} from "lucide-react";
import { MdHomeFilled } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { TbCertificate } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { deleteJobCards, getAllJobCards, getAllServiceRequests, updateJobCards } from "./Services";
import { FONTS } from "../../constants/constants";


// Mock MustCare component
const MustCare = () => (
  <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
    MustCare Component
  </div>
);

// Mock COLORS constant
// const COLORS = {
//   bgColor: "#f8fafc",
// };

interface JobCard {
  cutomerInfo: any;
  vehicleInventory: any;
  _id: string;
  customerName: string;
  phone: string;
  vehicleInfo: {
    chassisNo: string;
    color: string;
    engineNo: string;
    model: string;
    registrationNo: string;
  },
  jobInfo: {
    ContactNo: string;
    VehicleNo: string;
    jobId: string;
    customerName: string;
  },
  customerInfo: {
    email: string;
    name: string;
    address: string;
    contactNo: string;
  },
  jobNumber: string;
  isEditing: boolean;
  address?: string;
  officeAddress?: string;
  email?: string;
  dob?: string;
  vehicleNumber?: string;
  engineNumber?: string;
  chassisNumber?: string;
  makeModel?: string;
  color?: string;
  fuelLevel?: string;
  complaint?: string;
  estimateLabour?: string;
  estimateParts?: string;
  totalEstimate?: string;
  technicianName?: string;
  serviceAdvisor?: string;
  promisedDeliveryDate?: string;
  contactNumber?: string;
  createdDate?: string;
}

interface ServiceManagementProps {
  onView: () => void;
}

const ServiceManagement: React.FC<ServiceManagementProps> = ({ onView }) => {
  const [jobCards, setJobCards] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchReq, setSearchReq] = useState("");
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [selectedJobCard, setSelectedJobCard] = useState<JobCard | null>(null);
  const [showJobCardModal, setShowJobCardModal] = useState(false);
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [editFormData, setEditFormData] = useState<JobCard | null>(null);
  // const [updatedJobcards, setupdatedJobcards] = useState<JobCard | null>(null);

  const fetchupdatejobcards = async (params: string, data: any) => {
    try {
      const response = await updateJobCards(params, data);

      if (response && response.data) {
        // setupdatedJobcards(response.data);
        setJobCards(prev =>[...prev,response.data])
        console.log("Job card updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Failed to update job card:", error);

    }
  }

  const fetchServiceRequests = async () => {
    try {
      const response: any = await getAllServiceRequests("");
      console.log("Fetched service requests:", response.data.data);
      setServiceRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchJobCards = async () => {
    try {
      const response: any = await getAllJobCards();
      setJobCards(response.data.data);
    } catch (error) {
      console.error("Error fetching job cards:", error);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
    fetchJobCards();
  }, []);

  const stats = [
    { label: "Total Requests", value: serviceRequests.length, change: "+12%", color: "blue" },
    { label: "Completed Today", value: "3", change: "+8%", color: "green" },
    { label: "Pending", value: jobCards.length, change: "-5%", color: "yellow" },
    
  ];

  const getPriorityColor = (Priority: string) => {
    switch (Priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const handleView = (jobCard: any) => {
    console.log(jobCard)
    setSelectedJobCard(jobCard);
    setShowJobCardModal(true);
  };

  const handleEditModal = () => {
    setIsEditingModal(true);
    setEditFormData(selectedJobCard);
  };

  const handleSaveEdit = () => {
    if (editFormData) {
      console.log(editFormData, "edit")
      setJobCards(
        jobCards.map((card) =>
          card._id === editFormData._id ? editFormData : card
        )
      );
      fetchupdatejobcards(editFormData._id, editFormData);
      setSelectedJobCard(editFormData);
      setIsEditingModal(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingModal(false);
    setEditFormData(selectedJobCard);
  };

  const handleEditInputChange = (field: keyof JobCard, value: string) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: value,
      });
    }
  };

  const deleteJob = async (param: string) => {
    try {
      const deleteCard = await deleteJobCards(param);
      console.log(deleteCard)
      setJobCards(jobCards.filter((c) => c.uuid != param))
    } catch (error) {
      console.log("Job Cards Deleted ", error)
    }
  }

  return (
    <div className="p-4" >
      {/* Stats Section */}
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className=" mb-1" style={{...FONTS.cardSubHeader}}>{stat.label}</p>
                <p className=" font-bolt !text-gray-900" style={{...FONTS.cardheader}}>{stat.value}</p>
                <p
                  className={`text-sm ${stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  {stat.change} from last week
                </p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <BarChart3 className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className=" !text-gray-900" style={{...FONTS.cardheader}}>
                  Service Requests
                </h2>
                <p className=" mt-1 !text-gray-600"style={{...FONTS.paragraph}}>
                  Manage incoming service appointments
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-5 h-5  absolute left-3 top-1/2 transform -translate-y-1/2" style={{...FONTS.paragraph}} />
                  <input
                    type="search"
                    placeholder="Search request..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
                    value={searchReq}
                    onChange={(e)=> setSearchReq(e.target.value)}
                  />
                </div>

                {/* <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button> */}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b  border-gray-200 " style={{...FONTS.tableHeader}}>
                  <tr>
                    <th className="text-left py-3 px-6 ">
                      Request ID
                    </th>
                    <th className="text-left py-3 px-6 ">
                      Phone No
                    </th>
                    <th className="text-left py-3 px-6 ">
                      Vehicle
                    </th>
                    <th className="text-left py-3 px-6 ">
                      Schedule
                    </th>
                    <th className="text-left py-3 px-6">
                      Priority
                    </th>
                    <th className="text-left py-3 px-6" >
                      Jobcard
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.isArray(serviceRequests) &&
                    serviceRequests.filter((req)=>[
                      req?.requestId,
                      req?.customerId?.contact_info?.phoneNumber,
                      req?.customerId?.vehicleInfo?.registerNumber
                    ]
                    .join("").toLowerCase().includes(searchReq.toLowerCase())
                  ).map((request) => (
                      <tr key={request._id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <span className="font-medium !text-blue-600"style={{...FONTS.paragraph}}>
                            {request?.requestId}
                          </span>
                        </td>
                        <td className="flex py-4 px-6">
                          <div>
                            <p className="font-medium flex !text-gray-900"style={{...FONTS.paragraph}}>
                              <Phone className="w-3 h-3 mt-1 mr-1" />
                              {request?.customerId?.contact_info?.phoneNumber}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <Car className="w-4 h-4 text-gray-500" />
                            <span className="!text-gray-900" style={{...FONTS.paragraph}}>
                              {request?.customerId?.vehicleInfo?.registerNumber || "car"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <p className="!text-gray-900 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" style={{...FONTS.paragraph}}/>
                              {/* {request.schedule_date} */}
                              {request?.assigned_date.split('T')[0]}
                            </p>
                            <p className="!text-gray-600 flex items-center mt-1">
                              <Clock className="w-3 h-3 mr-1" style={{...FONTS.paragraph}} />
                              {/* {request.scheduledTime} */}
                              {request?.assigned_date.split('T')[1].split('.')[0]}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6"style={{...FONTS.paragraph}} >
                          <span
                            className={`text-sm font-medium capitalize ${getPriorityColor(
                              request?.priority
                            )}`}
                          >
                            {request?.priority}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={onView}
                            className="flex items-center space-x-1 text-sm text-[#717171] font-medium hover:underline"
                          >
                            <Plus className="w-4 h-4"/>
                            <span style={{...FONTS.paragraph}}> Create</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Job Card Register Section */}
      <div className="p-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className=" !text-gray-900" style={{...FONTS.cardheader}}>
                  Job Card Register
                </h2>
                <p className="!text-gray-600 mt-1"style={{...FONTS.paragraph}}>
                  Track and manage job card details
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" style={{...FONTS.paragraph}}/>
                  <input
                    type="search"
                    placeholder="Search job cards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9b111e] transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCards
              .filter((card) =>
                [
                  card.jobInfo?.customerName,
                  card.jobInfo?.ContactNo,
                  card.jobInfo?.jobId,
                  card.jobInfo?.VehicleNo,
                ]
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((card, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Wrench className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleView(card)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Job Card Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteJob(card.uuid)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">
                    {card.jobInfo?.customerName}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="!text-gray-600"style={{...FONTS.paragraph}}>Vehicle:</span>
                      <span className="font-medium !text-blue-600"style={{...FONTS.paragraph}}>
                        {card.jobInfo?.VehicleNo}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="!text-gray-600" style={{...FONTS.paragraph}}>Job No:</span>
                      <span className="!text-gray-900"style={{...FONTS.paragraph}}>
                        {card.jobInfo?.jobId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="!text-gray-600"style={{...FONTS.paragraph}}>Phone:</span>
                      <span className="!text-gray-900"style={{...FONTS.paragraph}}>
                        {card.jobInfo?.ContactNo}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Job Card Details Modal */}
      {showJobCardModal && selectedJobCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 style={{...FONTS.header,fontWeight:22}}>
                  Job Card Details
                </h2>
                <p className="!text-gray-600"style={{...FONTS.cardSubHeader}}>
                  Job Number: {selectedJobCard?.jobInfo?.jobId}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {!isEditingModal ? (
                  <>
                    <button
                      onClick={handleEditModal}
                      className="flex items-center space-x-2 px-4 py-2 !bg-[#7812a4] !text-white rounded-lg hover:bg-red-800"style={{...FONTS.paragraph}}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setShowJobCardModal(false)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center space-x-2 px-4 py-2 !bg-green-600 !text-white rounded-lg hover:bg-green-700"style={{...FONTS.paragraph}}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center space-x-2 px-4 py-2 !bg-gray-500 !text-white rounded-lg hover:bg-gray-600"style={{...FONTS.paragraph}}
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className=" mb-4"style={{...FONTS.header,fontWeight:14}}>
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Name:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.jobInfo?.customerName || ""}
                        onChange={(e) =>
                          handleEditInputChange("customerName", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.jobInfo?.customerName}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Phone:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.phone || ""}
                        onChange={(e) =>
                          handleEditInputChange("phone", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">{selectedJobCard.jobInfo?.ContactNo}</p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Email:</span>
                    {isEditingModal ? (
                      <input
                        type="email"
                        value={editFormData?.email || ""}
                        onChange={(e) =>
                          handleEditInputChange("email", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.customerInfo?.email || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Address:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.address || ""}
                        onChange={(e) =>
                          handleEditInputChange("address", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard.cutomerInfo?.address || "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className=" mb-4"style={{...FONTS.header,fontWeight:14}}>
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="!text-gray-600" style={{...FONTS.paragraph}}>Vehicle Number:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.jobInfo?.VehicleNo || ""}
                        onChange={(e) =>
                          handleEditInputChange("vehicleNumber", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard.jobInfo?.VehicleNo || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Make & Model:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.vehicleInfo?.model || ""}
                        onChange={(e) =>
                          handleEditInputChange("makeModel", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.vehicleInfo?.model ||
                          selectedJobCard.vehicleInfo.model}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Engine Number:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.vehicleInfo?.engineNo || ""}
                        onChange={(e) =>
                          handleEditInputChange("engineNumber", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.vehicleInfo?.engineNo || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Chassis Number:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.vehicleInfo?.chassisNo || ""}
                        onChange={(e) =>
                          handleEditInputChange("chassisNumber", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard.vehicleInfo?.chassisNo || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Color:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.vehicleInfo?.color || ""}
                        onChange={(e) =>
                          handleEditInputChange("color", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard.vehicleInfo?.color || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Fuel Level:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.vehicleInventory?.fuelLevel || ""}
                        onChange={(e) =>
                          handleEditInputChange("fuelLevel", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.vehicleInventory?.fuelLevel || "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className=" mb-4"style={{...FONTS.header,fontWeight:16}}>
                  Complaint & Diagnosis
                </h3>
                {isEditingModal ? (
                  <textarea
                    value={editFormData?.complaint || ""}
                    onChange={(e) =>
                      handleEditInputChange("complaint", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e] h-24"
                    placeholder="Enter complaint details..."
                  />
                ) : (
                  <p className="text-sm !text-gray-900" style={{...FONTS.subParagraph}}>
                    {selectedJobCard?.complaint || "No complaint specified"}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <h3 className=" mb-4"style={{...FONTS.header,fontWeight:14}}>Estimate</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Labour:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.estimateLabour || ""}
                        onChange={(e) =>
                          handleEditInputChange(
                            "estimateLabour",
                            e.target.value
                          )
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.estimateLabour || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Parts:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.estimateParts || ""}
                        onChange={(e) =>
                          handleEditInputChange("estimateParts", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.estimateParts || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Total:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.totalEstimate || ""}
                        onChange={(e) =>
                          handleEditInputChange("totalEstimate", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.totalEstimate || "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="mb-4"style={{...FONTS.header,fontWeight:14}}>
                  Service Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Technician:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.technicianName || ""}
                        onChange={(e) =>
                          handleEditInputChange(
                            "technicianName",
                            e.target.value
                          )
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.technicianName || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Service Advisor:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.serviceAdvisor || ""}
                        onChange={(e) =>
                          handleEditInputChange(
                            "serviceAdvisor",
                            e.target.value
                          )
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.serviceAdvisor || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Promised Delivery:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.promisedDeliveryDate || ""}
                        onChange={(e) =>
                          handleEditInputChange(
                            "promisedDeliveryDate",
                            e.target.value
                          )
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.promisedDeliveryDate || "N/A"}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="!text-gray-600"style={{...FONTS.paragraph}}>Created Date:</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={editFormData?.createdDate || ""}
                        onChange={(e) =>
                          handleEditInputChange("createdDate", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                      />
                    ) : (
                      <p className="font-medium">
                        {selectedJobCard?.createdDate || "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16">
        <h2 className=" font-bold text-center"style={{...FONTS.header}}>
          Customised Care For All Your Needs
        </h2>
        <div className="flex justify-center mt-8 space-x-8">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <MdHomeFilled className="w-8 h-8 text-[#7812A4]" />
            </div>
            <p className="!font-bold !text-black"style={{...FONTS.cardSubHeader}}>4000+</p>
            <p className="!text-gray-600"style={{...FONTS.cardSubHeader}}>Authorized Service Centers</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <FaLocationDot className="w-8 h-8 text-[#7812A4]" />
            </div>
            <p className="!font-bold !text-black"style={{...FONTS.cardSubHeader}}>3800+</p>
            <p className="!text-gray-600"style={{...FONTS.cardSubHeader}}>Cities Nationwide Connected</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <TbCertificate className="w-8 h-8 text-[#7812A4]" />
            </div>
            <p className="!font-bold !text-black"style={{...FONTS.cardSubHeader}}>5000+</p>
            <p className="!text-gray-600"style={{...FONTS.cardSubHeader}}>Certified Technicians</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <RiCustomerService2Fill className="w-8 h-8 text-[#7812A4]" />
            </div>
            <p className="!font-bold !text-black" style={{...FONTS.cardSubHeader}}>10+ yrs</p>
            <p className="!text-gray-600"style={{...FONTS.cardSubHeader}}>Of Customer Care Expertise</p>
          </div>
        </div>
        <MustCare />
      </div>
    </div>
  );
};

export default ServiceManagement;
