import { useState } from "react";
import {
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FONTS } from "../../constants/constants";
import legal from "../../assets/faq/Legal (1).svg";
import Accounts from "../../assets/faq/Accounts (1).svg";
import General from "../../assets/faq/General (1).svg";
import Booking from "../../assets/faq/Booking (5).svg";
import service from "../../assets/faq/Service (5).svg";
import SpareParts from "../../assets/faq/Spare Parts (5).svg";

// import legal1 from "../../assets/faq/whiteicon/Legal (2).svg";
// import Accounts1 from "../../assets/faq/whiteicon/Accounts (2).svg";
// import General1 from "../../assets/faq/whiteicon/General (1) (1).svg";
// import Booking1 from "../../assets/faq/whiteicon/Booking (3) (1).svg";
// import service1 from "../../assets/faq/whiteicon/Service (3) (1).svg";
// import SpareParts1 from "../../assets/faq/whiteicon/Spare Parts (4) (1).svg";



type Category = "General" | "Service" | "Spare Parts" | "Booking" | "Accounts" | "Legal";

const faqs: Record<Category, { question: string; answer: string }[]> = {
 General: [
  {
    question: "What general services do you offer for cars?",
    answer:
      "We offer a range of general services including routine maintenance, engine diagnostics, fluid top-ups, filter replacements, and complete health checks.",
  },
  {
    question: "Do you inspect all parts during general service?",
    answer:
      "Yes, we perform a multi-point inspection covering brakes, battery, belts, hoses, lights, and tires during a general service.",
  },
  {
    question: "How long does a general service typically take?",
    answer:
      "A general service usually takes about 1.5 to 3 hours, depending on the car's condition and any additional issues found.",
  },
  {
    question: "Is general service covered under warranty?",
    answer:
      "Yes, most general services are covered if your car is under our service warranty. Check your plan for specifics.",
  },
  {
    question: "Do you offer pick-up and drop-off for general services?",
    answer:
      "Yes, we offer complimentary pick-up and drop-off for general service appointments within city limits.",
  },
  {
    question: "What happens if an issue is found during general service?",
    answer:
      "Our technicians will notify you immediately, explain the problem, and provide a quote before proceeding with any repairs.",
  },
],

 Service: [
  {
    question: "How often should I get my car serviced?",
    answer:
      "It’s recommended to service your car every 6 months or 5,000–10,000 km, whichever comes first. Check your owner's manual for exact intervals.",
  },
  {
    question: "What types of car services do you offer?",
    answer:
      "We provide general servicing, oil changes, brake inspections, tire rotations, battery checks, and engine diagnostics.",
  },
  {
    question: "Do you provide full car service packages?",
    answer:
      "Yes, we offer comprehensive car service packages that include engine oil replacement, air and oil filter changes, fluid top-ups, and a detailed inspection.",
  },
  {
    question: "Can I choose individual services instead of a package?",
    answer:
      "Absolutely. You can select individual services based on your car’s needs and your budget. Our advisors can help guide you.",
  },
  {
    question: "Are your technicians certified?",
    answer:
      "Yes, all our technicians are trained and certified to handle a wide range of car makes and models with the latest diagnostic tools.",
  },
  {
    question: "Do you offer warranty on services performed?",
    answer:
      "Yes, we offer a limited warranty on all services and repairs carried out at our center. Please ask for specific terms at the time of service.",
  },
],

  "Spare Parts": [
  {
    question: "Do you use genuine spare parts?",
    answer:
      "Yes, we use OEM (Original Equipment Manufacturer) or high-quality equivalents to maintain your car’s performance and warranty.",
  },
  {
    question: "Can I request specific brands for spare parts?",
    answer:
      "Absolutely. You can let us know your preferred brands and we’ll do our best to source them for you.",
  },
  {
    question: "Do spare parts come with a warranty?",
    answer:
      "Yes, all spare parts used come with manufacturer or supplier warranty depending on the part and brand.",
  },
  {
    question: "Can I bring my own spare parts for installation?",
    answer:
      "Yes, you can bring your own parts. However, we cannot provide a warranty on externally sourced components.",
  },
  {
    question: "How do I know if a spare part needs replacement?",
    answer:
      "Our technicians inspect and advise on parts that show signs of wear or damage during service or diagnostics.",
  },
  {
    question: "Are spare parts in stock or do they need to be ordered?",
    answer:
      "We keep a wide range of commonly used spare parts in stock. Rare parts can be ordered upon request within a short time frame.",
 }
 ],

  Booking: [
  {
    question: "Can I book a service online?",
    answer:
      "Yes, you can easily book a service through our website or mobile app by selecting a date and service type that suits you.",
  },
  {
    question: "Do you offer pick-up and drop service?",
    answer:
      "Yes, we offer complimentary pick-up and drop service within the city limits. Please mention it while booking.",
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes, bookings can be rescheduled or canceled at least 24 hours in advance via our website, app, or customer service.",
  },
  {
    question: "Will I receive a confirmation after booking?",
    answer:
      "Yes, you’ll receive a confirmation email or SMS with all details including date, time, and service center location.",
  },
  {
    question: "How far in advance should I book a service?",
    answer:
      "We recommend booking at least 2–3 days in advance to ensure availability of your preferred time slot.",
  },
  {
    question: "Is there a fee for online booking?",
    answer:
      "No, booking your car service online is completely free. Payment is only required after the service is completed.",
}
],

  Accounts: [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, UPI, net banking, and cash. Online payments are preferred for convenience.",
  },
  {
    question: "Do you offer invoices for services?",
    answer:
      "Yes, digital and printed invoices are provided after service completion for transparency and warranty tracking.",
  },
  {
    question: "Is there any advance payment required for booking?",
    answer:
      "In most cases, no advance payment is needed. However, for premium services or special parts, a deposit may be requested.",
  },
  {
    question: "Can I pay after the service is complete?",
    answer:
      "Yes, payment is typically made after the service is completed and approved by you.",
  },
  {
    question: "Do you offer EMI or financing options?",
    answer:
      "Currently, we don’t offer EMI, but we are working to partner with financial providers for such options.",
  },
  {
    question: "What should I do if my payment fails?",
    answer:
      "If a payment fails, please retry after a few minutes or contact our support team for help resolving the issue.",
}
],

 Legal: [
  {
    question: "Are your services covered under warranty?",
    answer:
      "Yes, we offer service warranties on specific parts and repairs. Details are provided in your service invoice.",
  },
  {
    question: "Do you follow environmental and safety regulations?",
    answer:
      "Absolutely. We comply with all local automotive service regulations and dispose of waste responsibly.",
  },
  {
    question: "Is customer data shared with third parties?",
    answer:
      "No, we strictly protect your data and do not share any personal information without your explicit consent.",
  },
  {
    question: "Are your technicians certified?",
    answer:
      "Yes, all our technicians are certified professionals with training in industry-standard safety and repair practices.",
  },
  {
    question: "Can I raise a dispute about service quality?",
    answer:
      "Yes, you can raise a dispute within 7 days of service. Our customer support team will assist in resolution.",
  },
  {
    question: "Is there a legal liability waiver I should know about?",
    answer:
      "Our terms and conditions include necessary waivers and disclaimers, which are shared at the time of booking or invoice.",
}
],

};

const categories: Category[] = [
  "Legal",
  "General",
  "Service",
  "Spare Parts",
  "Booking",
  "Accounts",
  
];

const categoryIcons: Record<Category, React.ReactNode> = {
     "Legal": legal,
  "Accounts": Accounts,
  "General": General,
  "Booking": Booking,
  "Service": service,
  "Spare Parts": SpareParts,
};



const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  const toggleAnswer = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white min-h-screen rounded-2xl">
      <h1 className=" text-center mb-2 pt-4 "style={{...FONTS.header}}>
        FAQ
      </h1>
      <p className="text-center mb-8 mt-4"style={{...FONTS.cardSubHeader}}>
        Your questions answered here.
      </p>

      <div className="flex pl-5">
       
        <div className="w-1/4 pr-6">
<ul className="space-y-2">
  {categories.map((category) => (
    <li
      key={category}
      onClick={() => {
        setActiveCategory(category);
        setActiveIndex(null);
      }}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition duration-200 ${
        activeCategory === category
          ? "bg-[#7812A4] text-white font-semibold shadow-md"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >

      <img
      src={`${categoryIcons[category]}`}
        className={`w-5 h-5 transition duration-200 ${
          activeCategory === category
            ? "filter brightness-0 invert"
            : "group-hover:filter group-hover:brightness-0"
        }`}
      />
      {category}
    </li>
  ))}
</ul>

</div>


       
        <div
          className="w-3/4 max-h-[70vh] overflow-auto pl-4"
          style={{ scrollbarWidth: "none" }}
        >
          <h2 className="text-xl font-semibold bg-white mb-4 sticky top-0 text-[#7812A4] flex items-center gap-2">
            <div className="bg-[#7812A4] text-white rounded-full p-2">
             <img src={` ${categoryIcons[activeCategory]} `} alt="logo"  className="w-5 h-5 filter invert brightness-0"/>
              
            </div>
            {activeCategory} Questions
          </h2>

          <div className="space-y-4 pr-10">
            {faqs[activeCategory].map((faq, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <h3 className="font-medium">{faq.question}</h3>
                  <div className="rounded-full p-2">
                    {activeIndex === index ? (
                      <div className="bg-gradient-to-r from-[#7812A4] to-[#7812A4] text-white rounded-full p-2">
                        <FaMinus />
                      </div>
                    ) : (
                      <div className="p-[1px] rounded-full bg-gradient-to-r from-[#7812A4] to-[#7812A4] inline-block">
                        <div className="bg-white text-[#7812A4] rounded-full p-2">
                          <FaPlus />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {activeIndex === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
