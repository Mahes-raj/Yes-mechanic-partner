/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  createSparePart,
  deleteSpareParts,
  getAllSpareParts,
  updateSparePart,
} from "./Services/index";
import { FONTS } from "../../constants/constants";
import { EllipsisVertical } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

interface SparePart {
  _id: string;
  price: string;
  productName: string;
  brand: string;
  image: string;
  stock: string;
  inStock: boolean;
  category: string;
  slug: string;
  warrantyPeriod:string;
  partnerId:string;
}

const partTypes = [
  "Engine",
  "Brakes",
  "Lighting",
  "Cooling",
  "Sensor",
  "Switch & Buttons",
  "Grille",
  "Mirror",
  "Slider",
  "Suspension",
  "Electrical",
  "Body Parts",
  "Interior",
];

// ToggleSwitch Component
const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({
  enabled,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9b111e] ${
      enabled ? "bg-[#9b111e]" : "bg-gray-300"
    }`}
    aria-pressed={enabled}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const SpareParts: React.FC = () => {
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [partsData, setPartsData] = useState<SparePart[]>([]);
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPart, setNewPart] = useState<Omit<SparePart, "id" |"_id">>({
    productName: "",
    price: "0",
    inStock: true,
    image: "",
    stock: "12",
    slug: "Engine",
    category: "spare",
    brand: "new",
    partnerId:"",
    warrantyPeriod:""
  });
  const [editForm, seteditForm] = useState(false);

  const partner_id = localStorage.getItem("PartnerId") ?? ''

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response: any = await getAllSpareParts(partner_id);
        console.log("Fetched spare parts:", response.data.data);
        setPartsData(response.data.data);
      } catch (error) {
        console.error("Error fetching spare parts:", error);
      }
    };

    fetchParts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewPart = async () => {
    try {
      console.log(newPart);
      newPart.partnerId = partner_id
      const response: any = await createSparePart(newPart);
      console.log(response);
      const createdPart = response.data.data;
      setPartsData((prev) => [...prev, createdPart]);
      resetAddForm();
    } catch (error) {
      console.error("Error creating spare part:", error);
    }
     setShowAddForm(false);
  };

  const deletePart = async (partId: string) => {
    try {
      await deleteSpareParts(partId);
      setPartsData((prev) => prev.filter((part) => part._id !== partId));
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredParts = partsData.filter((part) =>[part.productName].join("").toLowerCase().includes(searchTerm.toLowerCase()));

  const updatePart = async(updatedParts: SparePart) => {
    setPartsData((prev) =>
      prev.map((part) => (part._id === updatedParts._id ? updatedParts : part))
    );
    const datas ={
      productName: selectedPart?.productName,
      price: selectedPart?.price,
      slug: selectedPart?.slug,
      brand: selectedPart?.brand,
      image: selectedPart?.image,
      stock: selectedPart?.stock,
      inStock:selectedPart?.inStock,
      category: selectedPart?.category,
      warrantyPeriod: selectedPart?.warrantyPeriod,
      reStockAuto: false,
    }
    await updateSparePart(datas,updatedParts._id ?? '')
    // setSelectedPart(null);
  };


  const resetAddForm = () => {
    setNewPart({
      productName: "",
      price: "0",
      inStock: true,
      image: "",
      slug: "Engine",
      brand: "new",
      category: "Engine",
      stock: "12",
      partnerId:partner_id,
      warrantyPeriod:""
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-7">
     <div className="flex items-center justify-between w-full mb-6">
  <h1 className="text-left" style={{ ...FONTS.header }}>
    Spare Parts
  </h1>

  {/* Search Bar */}
  <div className="relative w-full max-w-md">
    <input
      type="text"
      placeholder="Search by product name..."
      className="border border-gray-300 rounded-full px-5 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#5d3c7b]"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {searchTerm ? (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-[#9b111e] hover:text-red-600 transition-transform hover:scale-125"
          onClick={() => setSearchTerm("")}
          aria-label="Clear search"
        >
          <IoMdClose />
        </button>
      ) : (
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500" />
      )}
  </div>
</div>


      {/* Hero Card */}
      <div className="mb-8 w-full bg-gray-100 rounded-xl shadow p-6 flex flex-col lg:flex-row items-center gap-6 hover:shadow-lg hover:scale-[1.01] transition-transform duration-300 ease-in-out">
        <div className="flex-1">
          <h2 className=""style={{ ...FONTS.header,fontSize:24 }}>
            Welcome to Auto Spare Hub
          </h2>
          <p className="mt-2"style={{ ...FONTS.cardSubHeader }}>
            Discover top-quality auto spare parts. We offer genuine and
            aftermarket components with fast delivery and customer satisfaction
            guaranteed.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-8 bg-[#7812A4] !text-white px-6 py-3 rounded-full  transition  flex items-center gap-2"style={{ ...FONTS.cardSubHeader,fontWeight:600 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add New Product
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://t4.ftcdn.net/jpg/05/21/93/17/360_F_521931702_TXOHZBa3tLVISome894Zc061ceab4Txm.jpg"
            alt="Spare Parts Overview"
            className="rounded-lg max-h-[250px] w-full object-cover shadow"
          />
        </div>
      </div>

      <div className="flex  justify-between mb-6">
        <h2 className=" text-left"style={{ ...FONTS.header,fontSize:24}}>
          Products
        </h2>
       
      </div>

      {/* Product Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
  {filteredParts?.map((part, index) => {
  
    return (
      <div
        key={index}
        className="group relative border rounded-lg overflow-hidden shadow transition-transform duration-300 cursor-pointer bg-[white] hover:scale-105 hover:shadow-[0_0_10px_rgba(155,17,30,0.5)]"
        // onClick={() => setSelectedPart(part)}
        // onMouseEnter={() => setHoveredIndex(index)}
        // onMouseLeave={() => setHoveredIndex(null)}
        style={{ minHeight: "260px" }}
      >

        <div className="relative">
          <button
            className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-3xl shadow-md transition-all duration-200"
            aria-label="Quick view"
            onClick={(e) => {
              e.stopPropagation(); 
              setMenuOpenId(menuOpenId === part._id ? null : part._id);
            }}
          >
            <EllipsisVertical className="w-4 h-4 text-black" />
          </button>

          {menuOpenId === part._id && (
            <div className="absolute right-3 top-12 z-20 w-20 bg-white border border-gray-200 rounded-3xl shadow-lg">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-3xl"
                onClick={(e) => {
                  e.stopPropagation();
                  seteditForm(true)
                  setSelectedPart(part)
                  setMenuOpenId(null);
                }}
              >
                Edit
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-3xl"
                onClick={() =>{ 
                  setSelectedPart(part)
                  setShowDeleteConfirm(true)}}
              >
                Delete
              </button>
            </div>
          )}
        </div>
       
        <div className="h-[180px] flex justify-center items-center overflow-hidden rounded-md">
          <img
            src={part?.image}
            alt={part?.productName}
            className="w-full h-full object-cover transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="line-clamp-2"style={{ ...FONTS.cardheader}}>
            {part?.productName}
          </h3>
          {part.brand && (
            <p className=" mt-1"style={{ ...FONTS.cardheader,fontSize:14}}>{part?.brand}</p>
          )}
          <div className="flex justify-between items-center mt-2">
            <span className="text-[#9b111e] font-bold"style={{ ...FONTS.header,fontSize:14}}>
              ₹{part?.price?.toLocaleString() ?? "0"}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              part?.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {part?.inStock ? "IN STOCK" : "OUT OF STOCK"}
            </span>
          </div>
        </div>
      </div>
    );
  })}
</div>


      <div className="max-w-full mt-10">
        <h1 className=" mb-8 text-center md:text-left"style={{ ...FONTS.header,fontSize:24}}>
          By Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category Card */}
          {[
            {
              title: "Wheels and Tires",
              image:
                "https://img.freepik.com/free-vector/realistic-complete-set-car-wheels_1284-29765.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: [
                "Bearings & Hubs",
                "Chrome Rims",
                "Hybrid Tyres",
                "Seasonal Tyres",
                "Wheel Bolts",
              ],
            },
            {
              title: "Body Parts",
              image:
                "https://img.freepik.com/premium-photo/two-metal-pistons-white_241146-682.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: [
                "Headlights",
                "Accelerator",
                "Bumpers",
                "Clutch",
                "Washers",
              ],
            },
            {
              title: "Performance Parts",
              image:
                "https://img.freepik.com/free-psd/3d-style-mechanical-item-isolated-transparent-background_191095-13746.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: [
                "Drive Belts",
                "Engine Gasket",
                "Fuel Pumps",
                "Head Bolts",
                "Piston Rings",
              ],
            },
            {
              title: "Maintenance",
              image:
                "https://img.freepik.com/free-vector/engine-pistons-system-composition-with-realistic-image-assembled-metal-engine-elements-isolated_1284-53969.jpg?ga=GA1.1.1244886688.1725532511&semt=ais_hybrid&w=740",
              items: [
                "Cleaners",
                "Antifreeze",
                "Engine Oil",
                "Repair Kits",
                "Bodypaint",
              ],
            },
          ]?.map(({ title, image, items }, index) => (
            <div className="flex flex-col gap-4 p-6 border  rounded-xl shadow-md" key={index}>
              <div className="flex justify-between items-center">
                <h2 className="uppercase "style={{ ...FONTS.header,fontSize:16}}>
                  {title}
                </h2>
                <img
                  src={image}
                  alt={title}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <ul className="space-y-1 text-sm">
                {items?.map((item, idx) => (
                  <li key={idx} className="hover:underline cursor-pointer"style={{ ...FONTS.cardheader,fontSize:14}}>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="cursor-pointer hover:underline mt-1"style={{ ...FONTS.header,fontSize:14}}>
                ALL CATEGORIES →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Full Width Section */}
      <div className="w-full py-12 px-6 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 max-w-2xl lg:order-1">
          <h2 className=" mb-2"style={{ ...FONTS.header,fontSize:24}}>
            Professional Auto Service & Support
          </h2>
          <p className="mb-6  leading-relaxed"style={{ ...FONTS.cardSubHeader}}>
            Need help installing your spare parts? Our certified technicians
            provide expert installation services and comprehensive support. We
            ensure your vehicle gets the best care with genuine parts and
            professional service.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white px-4 py-2 rounded-full text-sm border shadow-sm"style={{ ...FONTS.cardSubHeader,fontSize:14}}>
              ✓ Expert Installation
            </div>
            <div className="bg-white px-4 py-2 rounded-full text-sm border shadow-sm"style={{ ...FONTS.cardSubHeader,fontSize:14}}>
              ✓ Quality Guarantee
            </div>
            <div className="bg-white px-4 py-2 rounded-full text-sm border shadow-sm"style={{ ...FONTS.cardSubHeader,fontSize:14}}>
              ✓ 24/7 Support
            </div>
          </div>
          {/* <button className="bg-[#9b111e] text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-medium text-lg">
      Book Service
    </button> */}
        </div>
        <div className="flex-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Professional Auto Service"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => resetAddForm()}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => resetAddForm()}
              className="absolute top-2 right-2 text-3xl font-bold text-gray-600 "
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-6 ">
              Add New Product
            </h2>

            <div className="space-y-4" style={{...FONTS.subParagraph}}>
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={newPart?.productName}
                  onChange={(e) =>
                    setNewPart({ ...newPart, productName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                  placeholder="Enter product name"
                />
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Product Type *
                </label>
                <select
                  value={newPart?.slug}
                  onChange={(e) =>
                    setNewPart({ ...newPart, slug: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                >
                  {partTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Price (₹) *
                </label>
                <input
                  type="text"
                  min="0"
                  value={newPart.price}
                  onChange={(e) =>
                    setNewPart({ ...newPart, price: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                  placeholder="Enter price"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Upload Image *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setNewPart({ ...newPart, image: imageUrl });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                />

                {newPart?.image[0] && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={newPart?.image[0]}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Stock Status */}
            </div>

            <div className="flex justify-between gap-3 mt-8">
              <button
                onClick={() => resetAddForm()}
                className="px-6 py-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={addNewPart}
                disabled={
                  !newPart?.productName?.trim() || !newPart?.image[0]?.trim()
                }
                className="px-6 py-2 bg-[#7812A4] text-white rounded-full transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {selectedPart&& editForm  && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedPart(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() =>{seteditForm(false); setSelectedPart(null)}}
              className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-red-600"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Product Image */}
            <div className="mb-4 flex justify-center">
              <img
                src={selectedPart?.image}
                alt={selectedPart?.productName}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Product Name
              <input
                type="text"
                value={selectedPart?.productName}
                onChange={(e) =>
                  setSelectedPart({
                    ...selectedPart,
                    productName: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded p-2 mb-4 mt-2"
              />
            </label>

            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Product Type
              <input
                type="text"
                value={selectedPart?.slug}
                onChange={(e) =>
                  setSelectedPart({
                    ...selectedPart,
                    slug: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded p-2 mb-4 mt-2"
              />
            </label>

            {/* Editable price */}
            <label
              htmlFor="price"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Price (₹)
            </label>
            <input
              id="price"
              type="number"
              min={0}
              value={selectedPart?.price}
              onChange={(e) =>
                setSelectedPart({
                  ...selectedPart,
                  price: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />

            {/* Stock toggle */}
            <div className="flex items-center gap-3 mb-4">
              <ToggleSwitch
                enabled={selectedPart?.inStock}
                onToggle={() =>
                  setSelectedPart((prev) =>
                    prev ? { ...prev, inStock: !prev.inStock } : null
                  )
                }
              />
              <span className="text-sm font-medium">
                {selectedPart?.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Upload Image *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setNewPart({ ...newPart, image: imageUrl });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#9b111e]"
                />

                {newPart?.image[0] && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={newPart?.image[0]}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

            <div className="flex justify-between gap-2 mt-6">
              <button
                onClick={() => {updatePart(selectedPart);}}
                className="bg-[#9b111e] text-white py-2 px-3 rounded hover:bg-red-700 transition text-xs"
              >
                Save & Close
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Toast */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Product
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              <span className="font-medium">{selectedPart?.productName}</span>"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedPart) deletePart(selectedPart?._id);
                  setSelectedPart(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpareParts;
