import { FONTS } from "../../../constants/constants"
import { useNavigate } from "react-router-dom"
import { HiArrowLeft } from "react-icons/hi"

const PrivacyPolicySettings = () => {
  const navigate = useNavigate()

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Arrow */}
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 mr-4"
          >
            <HiArrowLeft className="text-xl text-[#9b111e]" />
          </button>
          <h1 
            className="text-3xl font-bold text-[#9b111e]"
            style={{fontFamily: FONTS.header.fontFamily}}
          >
            Privacy Policy & Terms of Service
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Privacy Policy Section */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#9b111e] mb-6" style={{fontFamily: FONTS.cardheader.fontFamily}}>
              Privacy Policy
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Information We Collect</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  We collect information you provide directly to us when using our car service platform, including your name, email address, phone number, vehicle information, service history, and payment details. We also automatically collect certain information about your device and usage patterns to improve our services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">How We Use Your Information</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  Your information is used to provide and improve our car service offerings, process bookings and payments, communicate service updates, send appointment reminders, and ensure the security of your account. We may also use aggregated data for analytics and service enhancement purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Data Security & Protection</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information. Your payment information is processed through secure, PCI-compliant payment processors and is never stored on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Information Sharing</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service partners who assist in operating our platform, conducting business, or servicing you, provided they agree to keep this information confidential.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Your Rights & Choices</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  You have the right to access, update, or delete your personal information at any time. You can also opt-out of marketing communications and request a copy of your data. Contact our support team to exercise these rights or if you have any privacy concerns.
                </p>
              </div>
            </div>
          </div>

          {/* Terms of Service Section */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#9b111e] mb-6" style={{fontFamily: FONTS.cardheader.fontFamily}}>
              Terms of Service
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Service Agreement</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  By using our car service platform, you agree to these terms and conditions. Our services include vehicle maintenance, repairs, diagnostics, and related automotive services. All services are provided by certified technicians using quality parts and equipment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Booking & Cancellation Policy</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  Service appointments can be booked through our platform and are subject to availability. Cancellations must be made at least 24 hours in advance to avoid cancellation fees. Emergency services may be available with additional charges and are subject to technician availability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Payment Terms</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  Payment is due upon completion of services unless other arrangements have been made. We accept various payment methods including credit cards, debit cards, and digital payments. All prices include applicable taxes and fees unless otherwise specified.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Warranty & Liability</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  We provide warranties on our services and parts as specified in your service agreement. Our liability is limited to the cost of the services provided. We are not responsible for pre-existing vehicle conditions or damage not related to our services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">User Responsibilities</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  Users are responsible for providing accurate vehicle information, maintaining account security, and ensuring vehicle accessibility for scheduled services. Any misuse of our platform or fraudulent activity may result in account suspension or termination.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#d35028] mb-3">Contact Information</h3>
                <p className="text-gray-700 leading-relaxed" style={{fontFamily: FONTS.paragraph.fontFamily}}>
                  For questions about these terms or our privacy policy, please contact our customer support team. We are committed to addressing your concerns promptly and maintaining transparent communication about our policies and practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">© 2025 YesMechanic. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicySettings