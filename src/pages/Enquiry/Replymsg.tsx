import { useEffect, useState } from "react";
import { getEnquiry } from "../../pages/Enquiry/services/index";
import { FONTS } from "../../constants/constants";

interface EnquiryReply {
  name: string;
  description: string;
  reply?: string;
}

const ReplyMessageList = () => {
  const [replies, setReplies] = useState<EnquiryReply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await getEnquiry('');
        console.log("getEnquiry response:", response);

        const data = response?.data;

        if (Array.isArray(data)) {
          setReplies(data);
        } else {
          console.error("Expected array but got:", data);
          setReplies([]);
        }
      } catch (error) {
        console.error("Failed to fetch replies", error);
        setReplies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, []);

  return (
    <div className="space-y-4">
      <h2 style={{ ...FONTS.cardheader }}>Reply Messages</h2>

      {loading && <p>Loading...</p>}

      {!loading && replies.length === 0 && (
        <p className="text-gray-500">No replies available.</p>
      )}

      {Array.isArray(replies) &&
        replies.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 border rounded shadow-sm"
          >
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Enquiry:</strong> {item.description}</p>
            <p
              className="text-red-700 mt-2"
              style={{ ...FONTS.tableHeader }}
            >
              <strong>Reply:</strong> {item.reply || "No reply yet"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ReplyMessageList;
