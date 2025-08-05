import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsConditionsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const sections = [
    {
      title: "Service Agreement:",
      content: "By using our car service platform, you agree to these terms and conditions. Our car service provides professional automotive maintenance, repair, and diagnostic services. We are committed to delivering high-quality service with certified technicians and genuine parts. All services are performed according to manufacturer specifications and industry standards."
    },
    {
      title: "Booking and Scheduling:",
      content: "Service appointments must be booked through our platform or authorized channels. We require at least 24 hours notice for appointment changes or cancellations. Emergency services may be available subject to technician availability and additional charges. Customers are responsible for providing accurate vehicle information and service history when booking."
    },
    {
      title: "Service Warranty and Guarantees:",
      content: "We provide warranty coverage on all parts and labor as per industry standards. Warranty periods vary by service type and parts used. Original equipment manufacturer (OEM) parts carry manufacturer warranty. Our labor warranty covers workmanship for the specified period. Warranty claims must be reported within the coverage period with proper documentation."
    },
    {
      title: "Payment Terms and Pricing:",
      content: "Payment is due upon completion of service unless prior arrangements are made. We accept various payment methods including cash, credit cards, and digital payments. Service estimates are provided before work begins, and additional charges require customer approval. Prices are subject to change based on parts availability and market conditions."
    },
    {
      title: "Vehicle Safety and Liability:",
      content: "Customers are responsible for ensuring their vehicle is safe to drive to our service location. We are not liable for pre-existing conditions or damage not related to our service. All vehicles are inspected before service begins, and any concerns are documented. We maintain comprehensive insurance coverage for customer vehicles in our care."
    },
    {
      title: "Customer Responsibilities:",
      content: "Customers must provide accurate contact information and vehicle details. Personal items should be removed from vehicles before service. Customers are responsible for maintaining regular service intervals as recommended by the manufacturer. Any modifications or aftermarket parts must be disclosed before service begins."
    },
    {
      title: "Data Privacy and Protection:",
      content: "We collect and store customer information necessary for service delivery and communication. Vehicle diagnostic data may be accessed during service for troubleshooting purposes. Customer information is protected according to applicable privacy laws and is not shared with third parties without consent. Service records are maintained for warranty and service history purposes."
    },
    {
      title: "Dispute Resolution:",
      content: "Any disputes regarding service quality or charges should be reported within 30 days of service completion. We are committed to resolving customer concerns promptly and fairly. Mediation services may be utilized for dispute resolution if direct negotiation is unsuccessful. Legal proceedings, if necessary, will be conducted in accordance with local jurisdiction laws."
    }
  ];

  return (
    <div className="mx-auto p-6 bg-[#f4eae5] min-h-screen">
      <div className="space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center text-[#9b111e] hover:text-[#7a0e18] transition-colors duration-200 group"
          >
            <svg 
              className="w-6 h-6 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#9b111e] rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#9b111e] mb-2">Car Service Terms & Conditions</h1>
              <p className="text-gray-600">Please read these car service terms and conditions carefully before using our automotive services.</p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-[#9b111e]/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#9b111e]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#9b111e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                      {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                      {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />}
                      {index === 4 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                      {index === 5 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                      {index === 6 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                      {index === 7 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />}
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              For questions about these terms, please contact our customer service team.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsConditionsPage;

