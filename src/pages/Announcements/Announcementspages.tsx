/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { TiPin } from "react-icons/ti";
import Client from '../../api/index.ts';
import { FONTS } from '../../constants/constants.ts';
// import { pinnedAnnouncementsAPI } from './services/index.tsx';

const categories = ["All", "General", "Offeres", "Services"];

type announcement = {
  userId: {
    firstName: string;
    lastName: string;
    image: string;
  };
  subject: string;
  description: string;
  title: string;
  uuid: string;
  _id: string;
  category: string;
  isPinned: boolean;
  createdAt: string;
};

const AnnouncementPages = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [announcements, setAnnouncements] = useState<announcement[]>([]);
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState<announcement[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response: any = await Client.partner.annoucement.getAll();
        const data: announcement[] = response.data.data;
        setAnnouncements(data);
        setPinnedAnnouncements(data.filter((a) => a.isPinned));
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    }
    fetchData();
  }, []);

  const togglePin = async (announcementToToggle: announcement) => {
    const updatedAnnouncements = announcements.map((a) =>
      a._id === announcementToToggle._id
        ? { ...a, isPinned: !a.isPinned }
        : a
    );

    setAnnouncements(updatedAnnouncements);
    setPinnedAnnouncements(updatedAnnouncements.filter((a) => a.isPinned));

    // Optional: Persist the change via API
    // await pinnedAnnouncementsAPI(partnerId, announcementToToggle._id, !announcementToToggle.isPinned);
  };

  const handlePinnedClick = async (announcement: announcement) => {
    try {
      const res: any = await Client.partner.annoucement.get({ _id: announcement._id });
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch pinned announcement:", err);
    }
  };

  const filteredAnnouncements =
    selectedCategory === "All"
      ? announcements
      : announcements.filter((a) => a.category === selectedCategory);

  return (
    <div className="flex flex-col p-2  h-[650px]">
      <div className='flex flex-row'>
        
        <h1 className="text-center p-4 "style={{...FONTS.header}}>
          Announcements
        </h1>
      </div>

      <div className="flex gap-4 h-[550px] xl:h-[700px] flex-row mt-3 items-stretch">

        <div className="w-1/6 bg-white rounded-xl shadow p-2 flex flex-col">
          <h2 className=" mb-2"style={{...FONTS.header,fontSize:22}}>Category</h2>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer p-4 rounded-full  ${selectedCategory.toLowerCase() === cat ? "bg-[#7812A4] text-white font-bold" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/4 bg-white rounded-xl shadow p-4 flex flex-col space-y-4 overflow-auto" style={{scrollbarWidth:"none"}}>
          {filteredAnnouncements.map((a) => (
            <div
              key={a.uuid}
              className="bg-gray-50 p-4 hover:bg-orange-100 rounded-xl shadow relative"
            >
              <div
                className="absolute top-2 right-2 cursor-pointer text-xl text-gray-500 hover:text-red-600"
                onClick={() => togglePin(a)}
                title={a.isPinned ? "Unpin" : "Pin"}
              >
                <TiPin className={a.isPinned ? "rotate-45 text-red-500" : "rotate-0"} />
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-2">
                <img
                  src={`https://i.pravatar.cc/32?u=${a.userId.firstName}`}
                  alt={a.userId.firstName}
                  className="w-6 h-6 rounded-full"
                />
                <span>{a.userId.firstName + " " + a.userId.lastName} • {a.createdAt}</span>
              </div>
              <h3 className="text-lg font-semibold mt-1">{a.title}</h3>
              <p className="text-gray-700 mt-2">{a.description}</p>
            </div>
          ))}
        </div>

        <div className="w-1/3 bg-white rounded-xl shadow p-4 flex flex-col">
          <h2 className=" mb-4 flex items-center gap-1"style={{...FONTS.header,fontSize:22}}>
            Pinned Announcements
          </h2>
          {pinnedAnnouncements.length === 0 ? (
            <p className="text-gray-500 font-bold text-center p-10">No pinned announcements.</p>
          ) : (
            pinnedAnnouncements.map((a) => (
              <div
                key={a.uuid}
                className="bg-gray-50 p-4 rounded-lg shadow mb-4 relative cursor-pointer"
                onClick={() => handlePinnedClick(a)}
              >
                <div
                  className="absolute top-2 right-2 cursor-pointer text-xl text-gray-500 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(a);
                  }}
                  title="Unpin"
                >
                  <TiPin className="rotate-45 text-red-500" />
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-2 mb-1">
                  <img
                    src={`https://i.pravatar.cc/32?u=${a.userId.firstName}`}
                    alt={a.userId.firstName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{a.userId.firstName + " " + a.userId.lastName} • {a.createdAt}</span>
                </div>
                <h3 className="text-lg font-semibold hover:underline">{a.title}</h3>
                <p className="text-gray-700 mt-2">{a.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPages;
