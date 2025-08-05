"use client"

import type React from "react"
import { useState } from "react"
import { IoCreateSharp } from "react-icons/io5"
import { ArrowLeft } from "lucide-react";

interface JobCard {
  id: string
  customerName: string
  phone: string
  vehicleInfo: string
  jobNumber: string
  isEditing: boolean
  address?: string
  officeAddress?: string
  email?: string
  dob?: string
  vehicleNumber?: string
  engineNumber?: string
  chassisNumber?: string
  makeModel?: string
  color?: string
  fuelLevel?: string
  complaint?: string
  estimateLabour?: string
  estimateParts?: string
  totalEstimate?: string
  technicianName?: string
  serviceAdvisor?: string
  promisedDeliveryDate?: string
  contactNumber?: string
  createdDate?: string
}

interface JobCardPageProps {
  setstate: React.Dispatch<React.SetStateAction<boolean>>
  jobCards: JobCard[]
  setJobCards: React.Dispatch<React.SetStateAction<JobCard[]>>
}

const JobCardPage: React.FC<JobCardPageProps> = ({ setstate, jobCards, setJobCards }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    officeAddress: "",
    phone: "",
    email: "",
    dob: "",
    vehicleNumber: "",
    engineNumber: "",
    chassisNumber: "",
    makeModel: "",
    color: "",
    fuelLevel: "",
    complaint: "",
    estimateLabour: "",
    estimateParts: "",
    totalEstimate: "",
    technicianName: "",
    serviceAdvisor: "",
    promisedDeliveryDate: "",
    revisedDeliveryDate: "",
    contactNumber: "",
    revisedEstimate: "",
  })

  const [vehicleInventory, setVehicleInventory] = useState({
    jackTommy: false,
    mirrors: false,
    stepney: false,
    mudFlap: false,
    toolKit: false,
    freshner: false,
    keyChain: false,
    tapes: false,
    cdRecorder: false,
    cdPlayer: false,
    serviceBooklet: false,
    mats: false,
    bodyDamages: false,
    dent: false,
    others: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setVehicleInventory((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

   
    const newJobCard: JobCard = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      phone: formData.phone,
      vehicleInfo: formData.makeModel || "Unknown Vehicle",
      jobNumber: `JC-${String(jobCards.length + 1).padStart(3, "0")}`,
      isEditing: false,
      address: formData.address,
      officeAddress: formData.officeAddress,
      email: formData.email,
      dob: formData.dob,
      vehicleNumber: formData.vehicleNumber,
      engineNumber: formData.engineNumber,
      chassisNumber: formData.chassisNumber,
      makeModel: formData.makeModel,
      color: formData.color,
      fuelLevel: formData.fuelLevel,
      complaint: formData.complaint,
      estimateLabour: formData.estimateLabour,
      estimateParts: formData.estimateParts,
      totalEstimate: formData.totalEstimate,
      technicianName: formData.technicianName,
      serviceAdvisor: formData.serviceAdvisor,
      promisedDeliveryDate: formData.promisedDeliveryDate,
      contactNumber: formData.contactNumber,
      createdDate: new Date().toISOString().split("T")[0],
    }

    // Add to job cards list
    setJobCards((prev) => [...prev, newJobCard])

    console.log("Job Card Created:", newJobCard)
    alert("Job Card Created Successfully!")

    // Reset form
    setFormData({
      customerName: "",
      address: "",
      officeAddress: "",
      phone: "",
      email: "",
      dob: "",
      vehicleNumber: "",
      engineNumber: "",
      chassisNumber: "",
      makeModel: "",
      color: "",
      fuelLevel: "",
      complaint: "",
      estimateLabour: "",
      estimateParts: "",
      totalEstimate: "",
      technicianName: "",
      serviceAdvisor: "",
      promisedDeliveryDate: "",
      revisedDeliveryDate: "",
      contactNumber: "",
      revisedEstimate: "",
    })

    setVehicleInventory({
      jackTommy: false,
      mirrors: false,
      stepney: false,
      mudFlap: false,
      toolKit: false,
      freshner: false,
      keyChain: false,
      tapes: false,
      cdRecorder: false,
      cdPlayer: false,
      serviceBooklet: false,
      mats: false,
      bodyDamages: false,
      dent: false,
      others: false,
    })

    
    setstate(true)
  }


  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setstate(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-3xl font-bold text-[#9b111e]">Job Card</h2>
                <p className="text-gray-600 mt-1">Fill in the details to generate a new job card.</p>
              </div>
            </div>
          </div>
        </div>

        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
      
          <fieldset className="border p-4 rounded-lg">
            <legend className="font-semibold text-[#9b111e] mb-4">Customer Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Customer Name", name: "customerName", type: "text" },
                { label: "Address", name: "address", type: "text" },
                { label: "Office Address", name: "officeAddress", type: "text" },
                { label: "Phone No.", name: "phone", type: "text" },
                { label: "Email ID", name: "email", type: "email" },
                { label: "DOB", name: "dob", type: "date" },
              ].map((field) => (
                <label key={field.label} className="flex flex-col text-sm font-medium">
                  {field.label}
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          {/* Vehicle Information */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="font-semibold text-[#9b111e] mb-4">Vehicle Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Vehicle No.", name: "vehicleNumber" },
                { label: "Engine No.", name: "engineNumber" },
                { label: "Chassis No.", name: "chassisNumber" },
                { label: "Make & Model", name: "makeModel" },
                { label: "Color", name: "color" },
                { label: "Fuel Level", name: "fuelLevel" },
              ].map((field) => (
                <label key={field.label} className="flex flex-col text-sm font-medium">
                  {field.label}
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          {/* Vehicle Inventory */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="font-semibold text-[#9b111e] mb-4">Vehicle Inventory</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {[
                { label: "Jack & Tommy", name: "jackTommy" },
                { label: "Mirrors", name: "mirrors" },
                { label: "Stepney", name: "stepney" },
                { label: "Mud Flap", name: "mudFlap" },
                { label: "Tool Kit", name: "toolKit" },
                { label: "Freshner", name: "freshner" },
                { label: "Key Chain", name: "keyChain" },
                { label: "Tapes", name: "tapes" },
                { label: "CD Recorder", name: "cdRecorder" },
                { label: "CD Player", name: "cdPlayer" },
                { label: "Service Booklet", name: "serviceBooklet" },
                { label: "Mats", name: "mats" },
                { label: "Body Damages", name: "bodyDamages" },
                { label: "Dent", name: "dent" },
                { label: "Others", name: "others" },
              ].map((item) => (
                <label key={item.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={vehicleInventory[item.name as keyof typeof vehicleInventory]}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Complaints & Diagnosis */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="font-semibold text-[#9b111e] mb-4">Complaints & Diagnosis</legend>
            <label className="flex flex-col text-sm font-medium">
              Customer Complaint / Diagnosis / Action to be taken
              <textarea
                name="complaint"
                value={formData.complaint}
                onChange={handleInputChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e] h-24"
                placeholder="Enter details..."
              />
            </label>
          </fieldset>

          {/* Estimate Section */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="font-semibold text-[#9b111e] mb-4">Estimate</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Estimate Labour", name: "estimateLabour" },
                { label: "Estimate Parts", name: "estimateParts" },
                { label: "Total Estimate", name: "totalEstimate" },
              ].map((field) => (
                <label key={field.label} className="flex flex-col text-sm font-medium">
                  {field.label}
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          {/* Delivery Details */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="font-semibold text-[#9b111e] mb-4">Technician / Delivery Info</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Technician Name", name: "technicianName", type: "text" },
                { label: "Service Advisor", name: "serviceAdvisor", type: "text" },
                { label: "Promised Delivery Date", name: "promisedDeliveryDate", type: "date" },
                { label: "Revised Delivery Date", name: "revisedDeliveryDate", type: "date" },
                { label: "Contact No.", name: "contactNumber", type: "text" },
                { label: "Revised Estimate", name: "revisedEstimate", type: "text" },
              ].map((field) => (
                <label key={field.label} className="flex flex-col text-sm font-medium">
                  {field.label}
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          {/* Signatures */}
          <div className="flex justify-between mt-6 text-sm italic text-gray-600">
            <div className="text-[#9b111e]">🖋 Authorized Signature</div>
            <div className="text-[#9b111e]">🖋 Signature of Customer</div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={() => setstate(true)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-[#9b111e] text-white rounded-md hover:bg-red-800 transition"
            >
              <IoCreateSharp className="w-5 h-5" />
              <span>Create Job Card</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobCardPage
