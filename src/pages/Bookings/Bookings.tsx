/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { FONTS } from "../../constants/constants";
import ServiceBookingPanel from "../../components/Booking/BookingCom";
import DashboardCard from "../../components/Booking/BookingDashCard/DashCardBooking";
import History from "../../components/Booking/BookingHistroy/BookingHistroy";
import { MdCollectionsBookmark } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiIncomingRocket } from "react-icons/gi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

// API call
import { getAllBookings } from "./services";

const Bookings = () => {
  //  const [showHistory, setShowHistory] = useState(false);
  const showHistory = false;
  const [bookings, setBookings] = useState<any[]>([]); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response: any = await getAllBookings('');
        setBookings(response.data.data)
        console.log(response.data.data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 m-5">
        {/* Header Row */}
        <h2
          className="text-2xl font-semibold text-[#9b111e] ml-4"
          style={{ ...FONTS.header}}
        >
          Service Bookings
        </h2>

    

      </div>

      {showHistory ? (
        <History bkings={bookings} />
      ) : (
        <div className="w-full h-screen flex justify-left">
          <div className="w-full max-w-7xl px-4 py-2 ">
            {/* Dashboard Section */}
            <div className="bg-[E8d6f0] rounded-xl shadow-md p-6 mb-6 md:p-3 mx-4 justify-center items-center px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-10">
                <DashboardCard
                  icon={<GiIncomingRocket />}
                  title="In-Coming"
                  value={20}
                  per={10}
                  perColor="#facc15"
                  borderColor="rgba(234,179,8,0.8)"
                  backgroundColor="#facc15"
                  dataPoints={[1, 3, 2, 5, 4, 6, 5]}
                />
                <DashboardCard
                  icon={<IoCheckmarkDoneCircleOutline />}
                  title="Completed"
                  value={10}
                  per={5}
                  perColor="#f87171"
                  borderColor="rgba(248,113,113,0.8)"
                  backgroundColor="#f87171"
                  dataPoints={[2, 1, 4, 3, 5, 2, 1]}
                />
                <DashboardCard
                  icon={<AiOutlineLoading3Quarters />}
                  title="In-Process"
                  value={2}
                  per={50}
                  perColor="#3b82f6"
                  borderColor="rgba(59,130,246,0.8)"
                  backgroundColor="#3b82f6"
                  dataPoints={[1, 2, 1, 6, 4, 3, 6]}
                />
                <DashboardCard
                  icon={<MdCollectionsBookmark />}
                  title="Total-Booking"
                  value={bookings.length}
                  per={15}
                  perColor="#10b981"
                  borderColor="rgba(16,185,129,0.8)"
                  backgroundColor="#10b981"
                  dataPoints={[1, 5, 2, 4, 3, 5, 6]}
                />
              </div>
            </div>

            {/* Booking Panel */}
            <div className="mb-6 p-4 bg-[E8d6f0] rounded-xl shadow-md mx-4 justify-center items-center px-1">
              <ServiceBookingPanel services={bookings}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
