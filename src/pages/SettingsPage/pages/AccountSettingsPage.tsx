/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BiMaleFemale } from "react-icons/bi";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { PiPhonePlusFill } from "react-icons/pi";
import { RiContactsBook3Fill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaRegAddressCard} from "react-icons/fa";
import { TbBuildingWarehouse } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
// import { IoShareSocial } from "react-icons/io5";
import { getProfile, updateProfile } from "../services";
import { FONTS } from "../../../constants/constants";

const AccountSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: any = await getProfile("");
        console.log("Fetched Profile:", response.data.data);
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: any = await updateProfile(profile);

      if (response) {
        setProfile(response);
      } 
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    
    <div className="p-6 mx-auto bg-white shadow-lg rounded-lg">

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2  border-b pb-2" style={{...FONTS.cardSubHeader}}>
            <BsFillPersonPlusFill />
            <h2>Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="firstName"
                className=" mb-2 font-medium !text-gray-700 flex items-center gap-2"
                // style={{...FONTS.paragraph}}
              >
                <MdOutlineDriveFileRenameOutline /> First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={profile?.firstName || ""}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                className="w-full px-4 py-2 !text-gray-700 border rounded-lg bg-gray-50 focus:border-transparent transition"
              />
            </div>

            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="lastName"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <MdOutlineDriveFileRenameOutline /> Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={profile?.lastName || ""}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                className="w-full !text-gray-700 px-4 py-2 border  rounded-lg bg-gray-5 focus:border-transparent transition"
              />
            </div>

            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="dob"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <LiaBirthdayCakeSolid /> Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                className="w-full !text-gray-700 px-4 py-2 border  rounded-lg bg-gray-50  focus:border-transparent transition"
              />
            </div>

            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="gender"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <BiMaleFemale /> Gender
              </label>
              <select
                id="gender"
                className="w-full px-4 py-2 !text-gray-700 border rounded-lg bg-gray-50 focus:border-transparent transition value={profile?.gender || ''}"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          <div style={{...FONTS.paragraph}}>
            <label
              htmlFor="bio"
              className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
            >
              <HiMiniInformationCircle /> About You
            </label>
            <textarea
              id="bio"
              className="w-full !text-gray-700 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none  focus:border-transparent transition"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div style={{...FONTS.paragraph}}>
            <label
              htmlFor="photo"
              className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
            >
              <CgProfile /> Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2">
                <img
                  src="https://placehold.co/150x150"
                  alt="Profile placeholder"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Ccircle cx="75" cy="75" r="75" fill="%23e5e7eb"/%3E%3Ctext fill="%239b111e" font-family="sans-serif" font-size="16" dy=".3em" text-anchor="middle" x="75" y="75"%3EAdd Photo%3C/text%3E%3C/svg%3E';
                    target.className = "w-full h-full object-contain";
                  }}
                />
              </div>
              <input
                type="file"
                id="photo"
                accept="image/*"
                className=" w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium "
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2  border-b pb-2" style={{...FONTS.cardSubHeader}}>
            <RiContactsBook3Fill />
            <h2>Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="email"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              
              >
                <MdAttachEmail /> Email Address
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                value={profile?.email || ""}
                className="w-full !text-gray-700 px-4 py-2 border  rounded-lg bg-gray-50 focus:border-transparent transition"
              />
            </div>

            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="phone"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <PiPhonePlusFill />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    contact_info: {
                      ...profile.contact_info,
                      phoneNumber: e.target.value,
                    },
                  })
                }
                value={profile?.contact_info.phoneNumber || ""}
                className="w-full px-4 !text-gray-700 py-2 border rounded-lg bg-gray-50  focus:border-transparent transition"
              />
            </div>

            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="address"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <FaRegAddressCard /> Address
              </label>
              <input
                type="text"
                id="address"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    contact_info: {
                      ...profile.contact_info,
                      address1: e.target.value,
                    },
                  })
                }
                value={profile?.contact_info.address1 || ""}
                className="w-full !text-gray-700 px-4 py-2 border  rounded-lg bg-gray-5 focus:border-transparent transition"
              />
            </div>

            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="State"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <FaMapLocationDot /> State
              </label>
              <select
                id="State"
                value={profile?.contact_info.state || ""}
                className="w-full px-4 !text-gray-700 py-2 border rounded-lg bg-gray-50 focus:border-transparent transition"
              >
                <option value="">Select State</option>
                <option>Tamil Nadu</option>
                <option>Kerala</option>
                <option>Andhra Pradesh</option>
                <option>Punjab</option>
                <option>Gujarat</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2  border-b pb-2" style={{...FONTS.cardSubHeader}}>
            <FaRegAddressCard />
            <h2>Professional Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="companyName"
                className=" mb-2 font-medium !text-gray-700 flex items-center gap-2"
              >
                <TbBuildingWarehouse /> Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="w-full px-4 py-2 !text-gray-700 border rounded-lg bg-gray-50  focus:border-transparent transition"
              />
            </div>

            <div style={{...FONTS.paragraph}}>
              <label
                htmlFor="companyWebsite"
                className=" mb-2 font-medium !text-gray-700 flex items-center gap-2"
              >
                <IoIosLink /> Company Website
              </label>
              <input
                type="url"
                id="companyWebsite"
                className="w-full px-4 py-2 !text-gray-700 border rounded-lg bg-gray-50  focus:border-transparent transition"
                placeholder="https://"
              />
            </div>
          </div>
        </section>

        {/* <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#9b111e] border-b pb-2">
            <IoShareSocial />
            <h2>Social Media</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="facebook"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <FaFacebook /> Facebook Profile
              </label>
              <input
                type="url"
                id="facebook"
                className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition"
                placeholder="https://facebook.com/username"
              />
            </div>

            <div>
              <label
                htmlFor="youtube"
                className=" mb-2 font-medium text-gray-700 flex items-center gap-2"
              >
                <FaYoutube /> YouTube Channel
              </label>
              <input
                type="url"
                id="youtube"
                className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition"
                placeholder="https://youtube.com/username"
              />
            </div>
          </div>
        </section> */}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 border border-[#7812A4] rounded-full font-medium !text-[#7812A4] hover:bg-gray-50 transition"
            style={{...FONTS.paragraph}}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#7812A4] !text-white rounded-full "
            style={{...FONTS.paragraph}}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettingsPage;
