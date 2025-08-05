import { useEffect, useState } from 'react';
import { FONTS } from '../../constants/constants';
import { createEnquiry } from '../../pages/Enquiry/services/index';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    enquiry: '',
  //  date: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload:any = {
        fullName: formData.fullName,
        yourEnquiry: formData.enquiry,
        phoneNumber: formData.phoneNumber,
        Date: new Date() ,
      };

      const response = await createEnquiry(payload);
      console.log('API Response:', response);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      setFormData({
        fullName: '',
        phoneNumber: '',
        enquiry: '',
       // date: '',
      });
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Submission failed. Check the console for details.');
    }
  };

  useEffect(() => {
    console.log('EnquiryForm mounted');
    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
      setFormData((prev) => ({ ...prev, phoneNumber: savedPhone }));
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      console.log('Form submitted successfully');
    }
  }, [submitted]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 style={{ ...FONTS.cardheader }}>Enquiry Form</h2>

      {submitted && (
        <div className="bg-green-100 text-green-800 p-3 rounded text-sm">
          Enquiry submitted successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md "
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md  "
            placeholder="Enter phone number"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div> */}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Your Enquiry</label>
        <textarea
          name="enquiry"
          value={formData.enquiry}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full px-4 py-2 border rounded-md"
          placeholder="Describe your issue or question..."
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 text-white bg-[#7812A4] rounded-full transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export default EnquiryForm;



