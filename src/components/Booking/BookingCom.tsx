/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../constants/constants";

// type BookingStatus = "Pending" | "Viewed" | "Solved";

// interface ServiceBooking {
//   _id: number;
//   firstName: string;
//   lastName: string;
//   serviceItems: string[];
//   serviceDateTime: string;
//   status: BookingStatus;
// }

// interface ServiceBooking{
//   id: number,
//   customerName: string,
//   carModel: string,
//   servicePurpose: string[],
//   serviceDateTime: string,
//   status: BookingStatus,
// }


// const initialBookings: ServiceBooking[] = [
//   {
//     id: 1,
//     customerName: "John Doe",
//     carModel: "Toyota Camry",
//     servicePurpose: [
//       "Engine oil",
//       "tyre",
//       "headlight",
//       "fuse change",
//       "full normal check up",
//     ],
//     serviceDateTime: "2025-05-24T10:30",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     customerName: "Jane Smith",
//     carModel: "Honda Civic",
//     servicePurpose: ["Oil Change", "water Wash", "tyre check-up"],
//     serviceDateTime: "2025-05-25T14:30",
//     status: "Viewed",
//   },
//   {
//     id: 3,
//     customerName: "Alice Brown",
//     carModel: "BMW X5",
//     servicePurpose: ["Brake Repair", "full wash", "inside cleaning"],
//     serviceDateTime: "2025-05-26T09:00",
//     status: "Solved",
//   },
//   {
//     id: 4,
//     customerName: "Berlin",
//     carModel: "Audi A4",
//     servicePurpose: ["Car Service"],
//     serviceDateTime: "2025-05-26T02:00",
//     status: "Solved",
//   },
// ];

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleString();
};

interface servicesType{
  services:any;
}
const ServiceBookingPanel: React.FC<servicesType> = ({services}) => {
  // const [bookings, setBookings] = useState<ServiceBooking[]>(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  // const updateStatus = (id: number, newStatus: BookingStatus) => {
  //   setBookings((prev) =>
  //     prev.map((booking) =>
  //       booking.id === id ? { ...booking, status: newStatus } : booking
  //     )
  //   );
  // };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && selectedBooking) {
        setSelectedBooking(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBooking]);

  return (
    <div className="p-2 lg:max-w-6xl mx-auto md:max-w-full">
      <div className="space-y-4">
        <div>
          <h2 className="" style={{ ...FONTS.header,fontSize:20}}>
            Slot Bookings
          </h2>
        </div>

        {services.map((booking:any) => (
          <div
            key={booking._id}
            className="bg-[#FAF3EB] rounded-xl shadow p-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
          >
            <div className="flex-1">
              <p className="font-semibold text-lg text-[#9b111e]">
                {booking?.jobCardId?.customerInfo.name} - {booking?.jobCardId?.vehicleInfo?.model}
              </p>
              {
                booking?.jobCardId?.serviceInfo?.services.map((item:any,index:number)=>{
                  return <p key={index} className="text-[#e07f62]">{item.description}</p>
                })
              }     
              <p className="text-sm text-[#e07f62]">
                Scheduled: {formatDateTime(booking?.jobCardId?.jobInfo?.Schedule)}
              </p>
              <p
                className={`mt-1 text-sm font-medium ${
                  booking.status === "Solved"
                    ? "text-green-600"
                    : booking.status === "Viewed"
                    ? "text-yellow-600"
                    : "text-red-500"
                }`}
              >
                Status: {booking?.status}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBooking(booking)}
                className=" text-white px-3 py-1 rounded bg-[#4e9bcd] hover:bg-[#55ACEE] transition text-sm"
              >
                Open Service
              </button>
              <button
                // onClick={() => updateStatus(booking.id, "Viewed")}
                className=" text-white px-3 py-1 rounded bg-[#dcbb63] hover:bg-[#d6c779] transition text-sm"
              >
                Mark as Viewed
              </button>
              <button
                // onClick={() => updateStatus(booking.id, "Solved")}
                className=" text-white px-3 py-1 rounded bg-[#60cc7d] hover:bg-[#86AF49]  transition text-sm"
              >
                Completed
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center md:overflow-auto"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="p-6 rounded-xl max-w-5xl w-full h-3/4 shadow-lg grid lg:grid-cols-2 md:grid-cols-2 gap-4 overflow-y-auto md:max-h-[90vh] md:m-10"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: COLORS.bgColor }}
          >
            {/* Left Column */}
            <div className="grid lg:grid-rows-2 md:grid-cols-1 p-4 overflow-auto bg-[#FBFBFB] rounded-xl shadow-xl">
              <div className="cursor-default p-4">
                <h3 className="text-2xl font-bold mb-4 text-[#9b111e]">Service Details</h3>
                <p>
                  <strong className="text-[#e07f62]">Customer:</strong> {selectedBooking?.jobCardId?.customerInfo?.name}
                </p>
                <p>
                  <strong className="text-[#e07f62]">Car Model:</strong> {selectedBooking?.jobCardId?.vehicleInfo?.model}
                </p>
                <p>
                  <strong className="text-[#e07f62]">Date & Time:</strong> {formatDateTime(selectedBooking?.service)}
                </p>
                <p>
                  <strong className="text-[#e07f62]">Status:</strong>{" "}
                  <span
                    className={`font-medium ${
                      selectedBooking.status === "Solved"
                        ? "text-green-600"
                        : selectedBooking.status === "Viewed"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {selectedBooking.status}
                  </span>
                </p>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-semibold mb-2 text-[#9b111e]">Services</h4>
                <div className="space-y-2 overflow-y-auto flex-1 pr-1 max-h-64 scrollbar-hide">
                  {selectedBooking.services.map((purpose:any, index:number) => (
                    <div key={index} className="bg-gray-100 hover:scale-[1.022] rounded p-3 text-sm shadow-sm">
                      <p
                        onClick={() => {
                          setSelectedService(purpose?.name);
                          handleClick();
                        }}
                        className="cursor-pointer"
                      >
                       {
                        purpose?.name
                       }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="p-4 flex flex-col justify-between bg-[#FBFBFB] rounded-xl shadow-xl overflow-auto">
              <div>
                {selectedService && isVisible ? (
                  <div className="cursor-default">
                    <h4 className="text-2xl font-bold text-[#9b111e]">Service Preview</h4>
                    <p className="text-xl mt-2 text-[#E6A895]">{selectedService}</p>
                    <div className="mt-8 space-y-4">
                      {["In-Process", "Pending", "Completed"].map((label, i) => (
                        <div key={i} className="flex flex-col md:flex-row justify-between p-4 gap-3 md:h-20">
                          <button
                            className={`${
                              label === "In-Process"
                                ? "bg-[#0F7DC7] hover:bg-[#55ACEE]"
                                : label === "Pending"
                                ? "bg-[#FFBB00] hover:bg-[#F2E394]"
                                : "bg-[#34A853] hover:bg-[#86AF49]"
                            } text-white w-32 px-3 py-2 rounded-lg shadow transition font-medium md:text-sm`}
                          >
                            {label}
                          </button>
                          <textarea
                            placeholder="Text..."
                            className="w-full border p-2 rounded resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>Select a service to preview...</p>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className=" text-white px-4 py-2 rounded hover:bg-red-900 transition bg-[#C5172E]"
                >
                  Save
                </button>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBookingPanel;
