import React from 'react';
import { Wrench, Shield, Clock, Award, MapPin, Phone, Mail } from 'lucide-react';
import { FONTS } from '../../../constants/constants';

const AboutPage: React.FC = () => {
  const services = [
    {
      icon: <Wrench className="w-8 h-8 text-blue-600" />,
      title: "Expert Repairs",
      description: "Professional automotive repairs with certified technicians"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Quality Guarantee",
      description: "All work backed by our comprehensive warranty program"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Fast Service",
      description: "Quick turnaround times without compromising quality"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Certified Excellence",
      description: "ASE certified technicians with years of experience"
    }
  ];

  const teamMembers = [
    {
      name: "Mike Johnson",
      role: "Master Technician",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Davis",
      role: "Service Manager",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Carlos Rodriguez",
      role: "Engine Specialist",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "15+", label: "Years Experience" },
    { number: "10", label: "Expert Technicians" },
    { number: "24/7", label: "Emergency Service" }
  ];

  return (
    <div className="  bg-white shadow-lg rounded-xl ">
      {/* Hero Section */}
      <div className="relative bg-[#7812A4] !text-white rounded-lg ">
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="!text-5xl !text-white !font-bold mb-6 !bg-gradient-to-r !from-white !to-blue-200 !bg-clip-text "
              style={{ ...FONTS.header }}>
              About AutoCare Pro
            </h1>
            <p className="text-xl !text-blue-100 max-w-3xl mx-auto leading-relaxed"
              style={{ ...FONTS.paragraph }}>
              Your trusted automotive service partner for over 15 years. We combine cutting-edge technology
              with old-school craftsmanship to  keep your vehicle running at its best.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white  mb-3  px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-200 py-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="!text-4xl font-bold text-[#9b111e] mb-2 group-hover:text-[#9b111e] "
                  style={{ ...FONTS.header }}>
                  {stat.number}
                </div>
                <div className="!text-gray-600 font-medium" style={{ ...FONTS.paragraph }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="!text-4xl !font-bold text-[#9b111e]"
                style={{ ...FONTS.cardSubHeader }}>Our Story</h2>
              <div className="space-y-4 !text-gray-600 leading-relaxed" style={{ ...FONTS.paragraph }}>
                <p className="text-lg">
                  Founded in 2008 by automotive enthusiast John Miller, AutoCare Pro began as a small
                  family-owned garage with a simple mission: to provide honest, reliable car service
                  that customers can trust.
                </p>
                <p>
                  What started with just two bays and a dream has grown into a state-of-the-art facility
                  serving thousands of satisfied customers. We've maintained our commitment to personal
                  service while embracing the latest diagnostic technology and training.
                </p>
                <p>
                  Today, we're proud to be your neighborhood's most trusted automotive service center,
                  combining traditional values with modern expertise.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=500&fit=crop"
                alt="Auto service garage"
                className="relative rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="!text-4xl !font-bold text-[#9b111e] mb-4" style={{ ...FONTS.header }}>Why Choose Us</h2>
            <p className="!text-lg !text-gray-600 max-w-2xl mx-auto" style={{ ...FONTS.paragraph }}>
              We're not just another auto shop. Here's what sets us apart from the competition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="!text-xl font-bold !text-gray-900 mb-3" style={{ ...FONTS.cardheader }}>{service.title}</h3>
                <p className="!text-gray-600 leading-relaxed" style={{ ...FONTS.paragraph }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="!text-4xl !font-bold text-[#9b111e] mb-4" style={{ ...FONTS.header }}>Meet Our Expert Team</h2>
            <p className="!text-lg !text-gray-600 max-w-2xl mx-auto" style={{ ...FONTS.paragraph }}>
              Our certified technicians bring decades of combined experience to every job.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="!text-xl !font-bold !text-gray-900 mb-1" style={{ ...FONTS.cardheader }}>{member.name}</h3>
                  <p className="!text-blue-600 !font-semibold mb-2" style={{ ...FONTS.cardSubHeader }}>{member.role}</p>
                  <p className="!text-gray-600" style={{ ...FONTS.paragraph }}>{member.experience} experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column */}
            <div className="space-y-12">
              {/* Our Mission */}
              <div className="text-left">
                <h3 className="!text-2xl !font-bold !text-[#d35028] mb-4"
                  style={{ ...FONTS.cardheader }}>
                  Our Mission
                </h3>
                <p className="!text-gray-600 !leading-relaxed !text-lg" style={{...FONTS.subParagraph}}>
                  To provide exceptional automotive service that exceeds expectations while building
                  lasting relationships with our customers through honesty, expertise, and reliability.
                </p>
              </div>

              {/* Our Values */}
              <div className="text-left">
                <h3 className="!text-2xl !font-bold !text-[#d35028] mb-4"
                    style={{ ...FONTS.cardheader }}
                    >
                  Our Values
                </h3>
                <ul className="!space-y-3 !text-lg !text-gray-600" style={{...FONTS.paragraph}}>
                  <li className="flex items-start">
                    <div className="w-2 h-2 !bg-[#E6A895] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Integrity in every interaction and repair</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#E6A895] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Continuous learning and skill development</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#E6A895] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Environmental responsibility in our practices</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#E6A895] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Community involvement and support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl transform -rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=500&fit=crop"
                alt="Modern auto service bay"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>



      {/* Contact CTA */}
      <div className="bg-[#7812A4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="!text-4xl !font-bold !text-white mb-6" style={{...FONTS.header}}>Ready to Experience the Difference?</h2>
          <p className="!text-lg !text-blue-100 mb-8 max-w-2xl mx-auto" style={{ ...FONTS.paragraph }}>
            Join thousands of satisfied customers who trust AutoCare Pro with their vehicles.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" style={{ ...FONTS.cardSubHeader }}>
            <div className="flex items-center justify-center space-x-3 !text-white" >
              <MapPin className="w-6 h-6 !text-white-300" />
              <div>
                <div className="font-semibold">Visit Us</div>
                <div className="!text-white-200">123 Main St, City</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 text-white">
              <Phone className="w-6 h-6 text-white-300" />
              <div>
                <div className="font-semibold">Call Us</div>
                <div className="text-white-200">(555) 123-4567</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 text-white">
              <Mail className="w-6 h-6 text-white-300" />
              <div>
                <div className="font-semibold">Email Us</div>
                <div className="text-white-200">info@autocarepro.com</div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button className="!bg-white !text-blue-900 px-8 py-4 rounded-lg !font-bold !text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{...FONTS.paragraph}}>
              Schedule Service Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;