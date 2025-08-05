import { useEffect, useState } from "react";
import { getAllNotifications, markNotificationsAsRead } from "./Services/index";
import { FONTS } from "../../constants/constants";


type MailItem = {
  uuid:string;
  _id: string;
  sender: string;
  title: string;
  preview: string;
  message: string;
  updated_at: string;
  is_read: boolean;
};



export default function GmailStyleInbox() {

  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [mails, setMails] = useState<MailItem[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await getAllNotifications("");
        setMails(response.data.data);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);


const updated = async (uuid:string)=>{
try{
const updatedresponse= await  markNotificationsAsRead(uuid);
console.log(updatedresponse)
}
catch(error){
console.log("error",error)
}
}

  const filteredMails = mails.filter((m) => {
    if (filter === "all") return true;
    if (filter === "unread") return !m.is_read;
    if (filter === "read") return m.is_read;
  });

  return (
    <div className="min-h-screen  p-2 font-[Poppins]">
      <div className="flex items-center mb-6">
       
        <h1
        style={{
                      ...FONTS.header
                    
            }}
                  >Notification</h1>
      </div>

      <div className="flex h-[80vh] border rounded-2xl overflow-hidden shadow-lg bg-white">
        {/* Sidebar */}
        <aside className="w-64 border-r  p-6">
          <h2 className="text-lg font-semibold text-[#9b111e] mb-4"
         style={{
                      ...FONTS.cardheader
                    
            }}
                  >Filters</h2>
          <div className="space-y-3"
          
                  >
            {["all", "unread", "read"].map((f) => (
              <button
              style={{
                      ...FONTS.cardSubHeader
                    
            }}
                key={f}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setFilter(f as any)}
                className={`block w-full text-left px-4 py-2 rounded-full transition-all duration-200 ${
                  filter === f
                    ? "bg-[#7812A4] !text-white !font-semibold shadow-md"
                    : "!text-gray-700 hover:bg-gray-100"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex">
          <section className="w-1/2 overflow-y-auto border-r custom-scroll px-4 py-4 space-y-4">
          
            {filteredMails.map((mail, index) => (
              <div key={index}
                onClick={async()=>{
                  setSelectedMail(mail);
                  if (!mail.is_read) {
                    await markNotificationsAsRead(mail.uuid);
                    setMails((prev) =>
                      prev.map((m) =>
                        m._id === mail._id ? { ...m, is_read: true } : m
                      )
                    );
                  }
                  updated(mail.uuid)
                }}
                className={`cursor-pointer flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition duration-150 ${
                  !mail.is_read
                    ? "bg-gray-100 font-semibold"
                    : "border border-gray-200"
                }`}
              >
                <div className="p-[1px] rounded-full bg-gradient-to-r from-[#7812A4] to-[#7812A4] inline-block"
                  >
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-[#7812A4] rounded-full">
                    {mail.title?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <p 
                  style={{
                      ...FONTS.paragraph
                    
            }}>
                    {mail.title}
                  </p>
                  <p className="text-xs !text-gray-600 truncate"
                  style={{
                      ...FONTS.subParagraph
                    
            }}>
                    {mail.message}
                  </p>
                </div>
              </div>
            ))}
            {filteredMails.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-20">
                No mails found for this filter.
              </div>
            )}
          </section>

          {/* Mail content */}
          <section className="flex-1 overflow-y-auto px-8 py-6 custom-scroll">
            {selectedMail ? (
              <div>
                <button
                  onClick={() => setSelectedMail(null)}
                  className="text-md text-[#9b111e] hover:underline mb-4 inline-flex items-center"
                  style={{
                      ...FONTS.paragraph
                    
            }}
                >
                  ← Back to list
                </button>

                <h2 className="text-2xl font-bold !text-gray-800 mb-2"
                style={{
                      ...FONTS.cardheader
                    
            }}>
                  {selectedMail.title}
                </h2>

                <div className="flex items-center text-lg text-gray-600 mb-4">
                  <div>
                    <p className="font-semibold text-gray-800 capitalize"
                    style={{
                      ...FONTS.subParagraph
                    
            }}>
                      {selectedMail.sender}
                    </p>
                    <p className="text-sm !text-gray-500"
                    style={{
                      ...FONTS.subParagraph
                    
            }}>
                      {selectedMail.updated_at}
                    </p>
                  </div>
                </div>

                <hr className="my-4 border-t-1 border-gray-400" />

                <div className="whitespace-pre-wrap text-md leading-relaxed !text-gray-800"
                style={{
                      ...FONTS.cardSubHeader
                    
            }}>
                  {selectedMail.message}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Select an email to preview
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

