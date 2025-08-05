/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Lock, Car, Wrench, Edit3, Plus, Trash2 } from 'lucide-react';
// import { HiXMark } from "react-icons/hi2";
import { FaRegAddressCard} from "react-icons/fa";
import { createJobCards } from './Services';
import { FONTS } from '../../constants/constants';
// import { useNavigate } from 'react-router-dom';


interface ApiData {
  jobId: string;
  customerName: string;
  contact: string;
  vehicle: string;
  schedule: string;
  priority: 'high' | 'medium' | 'low';
}

interface VehicleInventory {
  jackAndTommy: boolean;
  mirrors: boolean;
  stepney: boolean;
  mudFlaps: boolean;
  toolKit: boolean;
  freshner: boolean;
  keyChain: boolean;
  mats: boolean;
  tapeRecorder: boolean;
  cdPlayer: boolean;
  serviceBooklet: boolean;
  battery: boolean;
  bodyDamages: boolean;
  wheelCovers: boolean;
  others: boolean;
  images: {
    [key: string]: File[];
  };
}

interface ServiceItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

interface servicesmain {
  id:string;
  descriptions:string;
  rates:string;
  amounts:string;
}

interface FormData {
  inventory: VehicleInventory;
  fuelLevel: 'Empty' | '1/4' | '1/2' | '3/4' | 'Full';
  fuelLevelImages: File[];
  registrationNo: string;
  model: string;
  engineNo: string;
  mileage: string;
  color: string;
  chassisNo: string;
  insuranceCompany: string;
  insuranceRenewalDate: string;
  customerComplaint: string;
  actionToBeTaken: string;
  workDone: 'pending' | 'in-progress' | 'completed';
  serviceItems: ServiceItem[];
  servicesmain:servicesmain[];
  productTotalAmount:string;
  serviceTotalAmount:string;
  totalAmount:string;
  
  name: string;
  address: string;
  officeaddress: string;
  contactno: string;
  email: string;
}

interface InventoryItem {
  key: keyof Omit<VehicleInventory, 'images'>;
  label: string;
}

interface JobCardDetailsPageProps {
  apiData?: ApiData;
  onClose?: () => void;
  handleBack: ()=> void;

}

// Mock API data - in real app this would come from props
const defaultApiData: ApiData = {
  jobId: "JOB-2024-001",
  customerName: "John Smith",
  contact: "9876543210",
  vehicle: "KA-01-AB-1234",
  schedule: "2024-05-25 10:00 AM",
  priority: "high"
};

const JobCardDetailsPage: React.FC<JobCardDetailsPageProps> = ({ 
  apiData = defaultApiData, handleBack
}) => {
  const [formData, setFormData] = useState<FormData>({
    // Vehicle Inventory
    inventory: {
      jackAndTommy: false,
      mirrors: false,
      stepney: false,
      mudFlaps: false,
      toolKit: false,
      freshner: false,
      keyChain: false,
      mats: false,
      tapeRecorder: false,
      cdPlayer: false,
      serviceBooklet: false,
      battery: false,
      bodyDamages: false,
      wheelCovers: false,
      others: false,
      images: {}
    },
    fuelLevel: 'Empty',
    fuelLevelImages: [],

    //Customer Information
    name: '',
    address: '',
    officeaddress: '',
    contactno: '',
    email: '',
    // Vehicle Information
    registrationNo: '',
    model: '',
    engineNo: '',
    mileage: '',
    color: '',
    chassisNo: '',
    insuranceCompany: '',
    insuranceRenewalDate: '',
    
    // Service Information
    customerComplaint: '',
    actionToBeTaken: '',
    workDone: 'pending',
    serviceItems: [
      { id: '1', description: '', quantity: '', rate: '', amount: '' }
    ],
    
    servicesmain:[
      {id:'1',descriptions:'',rates:'',amounts:''}
    ],

    productTotalAmount: '0',
    serviceTotalAmount: '0',
    totalAmount: '0',
    // servicesmain
  });

  const handleInputChange = <K extends keyof FormData>(
    field: K, 
    value: FormData[K]
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInventoryChange = (key: keyof Omit<VehicleInventory, 'images'>) => {
    setFormData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [key]: !prev.inventory[key],
        images: {
          ...prev.inventory.images,
          ...(prev.inventory[key] ? { [key]: [] } : {})
        }
      }
    }));
  };

  //handle image upload

  const handleImageUpload = (key: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          images: {
            ...prev.inventory.images,
            [key]: [...(prev.inventory.images[key] || []), ...fileArray]
          }
        }
      }));
    }
  };

  // handle remove image
    const removeImage = (key: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        images: {
          ...prev.inventory.images,
          [key]: prev.inventory.images[key]?.filter((_, i) => i !== index) || []
        }
      }
    }));
  };

// handleFuelLevel 
const handleFuelLevelImageUpload = (files: FileList | null) => {
  if (files) {
    const fileArray = Array.from(files);
    setFormData(prev => ({
      ...prev,
      fuelLevelImages: [...prev.fuelLevelImages, ...fileArray]
    }));
  }
};

const removeFuelLevelImage = (index: number) => {
  setFormData(prev => ({
    ...prev,
    fuelLevelImages: prev.fuelLevelImages.filter((_, i) => i !== index)
  }));
};

  // Dynamic Service Items Functions
  const addServiceItem = (): void => {
    const newItem: ServiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: '',
      rate: '',
      amount: ''
    };
    setFormData(prev => ({
      ...prev,
      serviceItems: [...prev.serviceItems, newItem]
    }));
  };


  const removeServiceItem = (id: string): void => {
    if (formData.serviceItems.length > 1) {
      setFormData(prev => ({
        ...prev,
        serviceItems: prev.serviceItems.filter(item => item.id !== id)
      }));
      calculateTotalAmount();
    }
  };

  const updateServiceItem = (id: string, field: keyof ServiceItem, value: string): void => {
    setFormData(prev => {
      const updatedItems = prev.serviceItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Auto-calculate amount when quantity or rate changes
          if (field === 'quantity' || field === 'rate') {
            const quantity = parseFloat(field === 'quantity' ? value : updatedItem.quantity) || 0;
            const rate = parseFloat(field === 'rate' ? value : updatedItem.rate) || 0;
            updatedItem.amount = (quantity * rate).toFixed(2);
          }
          
          return updatedItem;
        }
        return item;
      });
      
      // Calculate total amount
      const total = updatedItems.reduce((sum, item) => {
        return sum + (parseFloat(item.amount) || 0);
      }, 0);
      
      return {
        ...prev,
        serviceItems: updatedItems,
        totalAmount: total.toFixed(2)
      };
    });
  };

  const calculateTotalAmount = (): void => {
    
    const productTotal = formData.serviceItems.reduce((sum, item) => {
    return sum + (parseFloat(item.amount) || 0);
  }, 0);

  const serviceTotal = formData.servicesmain.reduce((sum, item) => {
    return sum + (parseFloat(item.amounts) || 0);
  }, 0);

  const total = productTotal + serviceTotal
    
    setFormData(prev => ({
      ...prev,
      productTotalAmount: productTotal.toFixed(2),
      serviceTotalAmount: serviceTotal.toFixed(2),
      totalAmounts : total.toFixed(2)
    }));
  };


const addServices = (): void => {
  const newItems: servicesmain = {
    id: Date.now().toString(),
    descriptions: '',
    rates: '',
    amounts: ''
  };
  setFormData(prev => ({
    ...prev,
    servicesmain: [...prev.servicesmain, newItems]
  }));
};

const removeServiceItems = (id: string): void => {
  if (formData.servicesmain.length > 1) {
    setFormData(prev => {
      const updatedItems = prev.servicesmain.filter(items => items.id !== id);
      const total = updatedItems.reduce((sum, items) => sum + (parseFloat(items.amounts) || 0), 0);
      return {
        ...prev,
        servicesmain: updatedItems,
        totalAmount: total.toFixed(2)
      };
    });
  }
};



const updateServiceItems = (id: string, field: keyof servicesmain, value: string): void => {
  setFormData(prev => {
    const updatedItems = prev.servicesmain.map(items => {
      if (items.id === id) {
        const updatedItem = { ...items, [field]: value };

        // Auto calculate amount if rate is changed
        if (field === 'rates') {
          const rate = parseFloat(value) || 0;
          updatedItem.amounts = rate.toFixed(2);
        }

        return updatedItem;
      }
      return items;
    });

    const total = updatedItems.reduce((sum, items) => sum + (parseFloat(items.amounts) || 0), 0);

    return {
      ...prev,
      servicesmain: updatedItems,
      totalAmount: total.toFixed(2)
    };
  });
};

  const getPriorityColor = (priority: ApiData['priority']): string => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // const navigate = useNavigate();

  const handleSave = async (): Promise<void> => {
  try {
    const payload = {
      jobInfo: {
        customerName: formData.name,
        ContactNo: formData.contactno,
        jobId: apiData.jobId,
        VehicleNo: formData.registrationNo,
        Schedule: apiData.schedule,
        priority: apiData.priority,
      },
      customerInfo: {
        name: formData.name,
        address: formData.address,
        officeAddress: formData.officeaddress,
        contactNo: formData.contactno,
        email: formData.email,
      },
      vehicleInfo: {
        registrationNo: formData.registrationNo,
        model: formData.model,
        engineNo: formData.engineNo,
        mileage: formData.mileage,
        color: formData.color,
        chassisNo: formData.chassisNo,
        insuranceCompany: formData.insuranceCompany,
        insuranceRenewalDate: formData.insuranceRenewalDate,
      },
      serviceInfo: {
        customerComplaint: formData.customerComplaint,
        actionToBeTaken: formData.actionToBeTaken,
        products: formData.serviceItems.map(item => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          productAmount: parseFloat(item.amount)
        })),
        services: formData.servicesmain.map(item => ({
          description: item.descriptions,
          rate: item.rates,
          serviceAmount: parseFloat(item.amounts)
        })),
         productTotalAmount: parseFloat(formData.productTotalAmount),
         serviceTotalAmount: parseFloat(formData.serviceTotalAmount),
         totalAmount:parseFloat(formData.totalAmount),
      },
      vehicleInventory: {
        currentState: {
          ...formData.inventory,
        },
        fuelLevel: formData.fuelLevel,
        fuelLevelImages: formData.fuelLevelImages,
        items: Object.entries(formData.inventory)
          .filter(([key, value]) => key !== 'images' && value === true)
          .map(([key]) => key),
      },
    };

    const response:any = await createJobCards(payload);
    if (response?.data) {
  alert("Job Card Created Successfully!");
    setTimeout(() => handleBack(), 0); // Defer routing till after modal unmount
  } else {
    handleBack()
  }
  } catch (err) {
    console.error("Failed to create job card:", err);
    alert("Failed to create job card. Please try again.");
  }
};
  const inventoryItems: InventoryItem[] = [
    { key: 'jackAndTommy', label: 'JACK & TOMMY' },
    { key: 'mirrors', label: 'MIRRORS' },
    { key: 'stepney', label: 'STEPNEY' },
    { key: 'mudFlaps', label: 'MUD FLAPS' },
    { key: 'toolKit', label: 'TOOL KIT' },
    { key: 'freshner', label: 'FRESHNER' },
    { key: 'keyChain', label: 'KEY CHAIN' },
    { key: 'mats', label: 'MATS' },
    { key: 'tapeRecorder', label: 'TAPE RECORDER' },
    { key: 'cdPlayer', label: 'CD PLAYER' },
    { key: 'serviceBooklet', label: 'SERVICE BOOKLET' },
    { key: 'battery', label: 'BATTERY' },
    { key: 'bodyDamages', label: 'BODY DAMAGES' },
    { key: 'wheelCovers', label: 'WHEEL COVERS' },
    { key: 'others', label: 'OTHERS' }
  ];

  // function handleFuelLevelChange(arg0: string): void {
  //   throw new Error('Function not implemented.');
  // }

  // Replace the incomplete function at the bottom of your file with this:
const handleFuelLevelChange = (level: 'Empty' | '1/4' | '1/2' | '3/4' | 'Full'): void => {
  setFormData(prev => ({
    ...prev,
    fuelLevel: level
  }));
};

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-blue-50 p-2 ">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className=" bg-clip-text text-transparent mb-2"style={{...FONTS.header}}>
            Job Card Details
          </h1>
          <div className="w-24 h-1 bg-[#7812A4] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Job Information Section - Read Only */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
            <div className="bg-[#7812A4] p-2">
              <div className="flex items-center gap-2 !text-white">
                <Lock className="w-5 h-5" />
                <h2 className="text-lg !text-white font-semibold"style={{...FONTS.cardSubHeader}}>Job Information (Read Only)</h2>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Job ID</label>
                  <div className="bg-white p-3 rounded-lg border-2 border-gray-200 !text-gray-600 font-mono"style={{...FONTS.subParagraph}}>
                    {apiData.jobId}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Customer Name</label>
                  <div className="bg-white p-3 rounded-lg border-2 border-gray-200 !text-gray-600"style={{...FONTS.subParagraph}}>
                    {apiData.customerName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Contact No</label>
                  <div className="bg-white p-3 rounded-lg border-2 border-gray-200 !text-gray-600"style={{...FONTS.subParagraph}}>
                    {apiData.contact}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Vehicle No</label>
                  <div className="bg-white p-3 rounded-lg border-2 border-gray-200 !text-gray-600 font-mono"style={{...FONTS.subParagraph}}>
                    {apiData.vehicle}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Schedule</label>
                  <div className="bg-white p-3 rounded-lg border-2 border-gray-200 !text-gray-600"style={{...FONTS.subParagraph}}>
                    {apiData.schedule}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Priority</label>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(apiData.priority)}`}></div>
                    <div className="bg-white p-3 rounded-lg border-2 border-gray-200 !text-gray-600 capitalize flex-1"style={{...FONTS.subParagraph}}>
                      {apiData.priority}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cutomer Information Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          <div className="bg-[#7812A4] p-2">
          <div className="flex items-center gap-2 !text-white">
            <FaRegAddressCard />
                <h2 className="text-lg !text-white font-semibold"style={{...FONTS.cardSubHeader}}>Customer Information</h2>
          </div>   
          </div>
          <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Customer name"
                  />
          </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Address </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Address"
                  />
          </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Office Address </label>
                  <input
                    type="text"
                    value={formData.officeaddress}
                    onChange={(e) => handleInputChange('officeaddress', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Office Address"
                  />
          </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Contact No </label>
                  <input
                    type="text"
                    value={formData.contactno}
                    onChange={(e) => handleInputChange('contactno', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Contact No"
                  />
          </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>E mail </label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Address"
                  />
          </div>
          </div>
          </div>
          </div>  

          {/* Vehicle Inventory Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
            <div className="bg-[#7812A4] p-2">
              <div className="flex items-center gap-2 text-white">
                <Car className="w-5 h-5" />
                <h2 className="text-lg !text-white font-semibold" style={{...FONTS.cardSubHeader}}>Vehicle Inventory</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-6">
                {inventoryItems.map((item) => (
                <React.Fragment key={item.key}>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.inventory[item.key]}
                      onChange={() => handleInventoryChange(item.key)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-semibold !text-gray-700 group-hover:text-[#9b111e]"style={{...FONTS.subParagraph}}>
                      {item.label}
                    </span>
                  </label>

                  {formData.inventory[item.key] && (
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(item.key, e.target.files)}
                          className="text-xs file:text-black file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-white file:hover:text-white file:hover:bg-gradient-to-r file:hover:from-red-600 file:hover:to-red-800"style={{...FONTS.subParagraph}}
                        />
                      </div>

                      {formData.inventory.images[item.key] && formData.inventory.images[item.key].length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.inventory.images[item.key].map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`${item.label} ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(item.key, index)}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
            ))}
          </div>
          
          <div className="border-t pt-4">
         <label className="block text-sm font-medium !text-gray-700 mb-2"style={{...FONTS.paragraph}}>Fuel Level</label>
         <div className="space-y-6">
           <select
             value={formData.fuelLevel}
             onChange={(e) => handleFuelLevelChange(e.target.value as FormData['fuelLevel'])}
             className="w-full md:w-48 p-3 border-2 border-gray-300 rounded-full !text-black  transition-all"style={{...FONTS.subParagraph}}
           >
             <option value="Empty">Empty</option>
             <option value="1/4">1/4</option>
             <option value="1/2">1/2</option>
             <option value="3/4">3/4</option>
             <option value="Full">Full</option>
           </select>
                  
           {/* Add this entire section */}
           <div className="space-y-2">
             <label className="block text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Upload Fuel Level Images</label>
             <input
               type="file"
               multiple
               accept="image/*"
               onChange={(e) => handleFuelLevelImageUpload(e.target.files)}
               className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-medium file:hover:text-white file:hover:bg-[#7812A4]"
             />

             {formData.fuelLevelImages.length > 0 && (
               <div className="flex flex-wrap gap-2">
                 {formData.fuelLevelImages.map((file, index) => (
                   <div key={index} className="relative group">
                     <img
                       src={URL.createObjectURL(file)}
                       alt={`Fuel Level ${index + 1}`}
                       className="w-16 h-16 object-cover rounded border border-gray-200"
                     />
                     <button
                       type="button"
                       onClick={() => removeFuelLevelImage(index)}
                       className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                     >
                       ×
                     </button>
                   </div>
                 ))}
               </div>
             )}
           </div>
         </div>
        </div>
        </div>
      </div>
      
      {/* Debug Info */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold !text-gray-800 mb-2"style={{...FONTS.paragraph}}>Current State:</h3>
        <div className="text-sm !text-gray-600"style={{...FONTS.paragraph}}>
          <p className='mt-2'><strong>Fuel Level:</strong> {formData.fuelLevel}</p>
          <p className='mt-2'><strong>Selected Items:</strong> {Object.entries(formData.inventory).filter(([key, value]) => key !== 'images' && value).map(([key]) => key).join(', ') || 'None'}</p>
          <p className='mt-2'><strong>Images Uploaded:</strong> {Object.entries(formData.inventory.images).map(([key, files]) => `${key}: ${files.length}`).join(', ') || 'None'}</p>
        </div>
      </div>
          {/* Vehicle Information Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
            <div className="bg-[#7812A4] p-2">
              <div className="flex items-center gap-2 text-white">
                <Edit3 className="w-5 h-5" />
                <h2 className="text-lg !text-white font-semibold" style={{...FONTS.cardSubHeader}}>Vehicle Information</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Registration No</label>
                  <input
                    type="text"
                    value={formData.registrationNo}
                    onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Enter registration number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Model</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Enter vehicle model"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Engine No</label>
                  <input
                    type="text"
                    value={formData.engineNo}
                    onChange={(e) => handleInputChange('engineNo', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Enter engine number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Mileage</label>
                  <input
                    type="text"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Enter mileage"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Enter vehicle color"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Chassis No</label>
                  <input
                    type="text"
                    value={formData.chassisNo}
                    onChange={(e) => handleInputChange('chassisNo', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Enter chassis number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Insurance Company</label>
                  <input
                    type="text"
                    value={formData.insuranceCompany}
                    onChange={(e) => handleInputChange('insuranceCompany', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                    placeholder="Enter insurance company"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Insurance Renewal Date</label>
                  <input
                    type="date"
                    value={formData.insuranceRenewalDate}
                    onChange={(e) => handleInputChange('insuranceRenewalDate', e.target.value)}
                    className="w-full p-3 border-2 !text-gray-400 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"style={{...FONTS.subParagraph}}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Information Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
            <div className="bg-[#7812A4] p-2">
              <div className="flex items-center gap-2 text-white">
                <Wrench className="w-5 h-5" />
                <h2 className="text-lg !text-white font-semibold" style={{...FONTS.cardSubHeader}}>Service Information</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Customer Complaint</label>
                <textarea
                  value={formData.customerComplaint}
                  onChange={(e) => handleInputChange('customerComplaint', e.target.value)}
                  rows={4}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"style={{...FONTS.subParagraph}}
                  placeholder="Describe the customer's complaint..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Action to be Taken</label>
                <textarea
                  value={formData.actionToBeTaken}
                  onChange={(e) => handleInputChange('actionToBeTaken', e.target.value)}
                  rows={4}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"style={{...FONTS.subParagraph}}
                  placeholder="Describe the action to be taken..."
                />
              </div>
              
              {/* Dynamic Service Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Service Items</label>
                  <button
                    type="button"
                    onClick={addServiceItem}
                    className="bg-[#7812A4] !text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"style={{...FONTS.paragraph}}
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.serviceItems.map((item, index) => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium !text-gray-700"style={{...FONTS.subParagraph}}>Item #{index + 1}</span>
                        {formData.serviceItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeServiceItem(item.id)}
                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-all"style={{...FONTS.subParagraph}}
                          >

                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium !text-gray-600 mb-1"style={{...FONTS.paragraph}}>Description</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateServiceItem(item.id, 'description', e.target.value)}
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all"style={{...FONTS.subParagraph}}
                            placeholder="Service description"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium !text-gray-600 mb-1"style={{...FONTS.paragraph}}>Quantity</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateServiceItem(item.id, 'quantity', e.target.value)}
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all"style={{...FONTS.subParagraph}}
                            placeholder="Qty"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium !text-gray-600 mb-1"style={{...FONTS.paragraph}}>Rate (₹)</label>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateServiceItem(item.id, 'rate', e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all"style={{...FONTS.subParagraph}}
                            placeholder="Rate"
                          />
                        </div>
                      </div>
                      <div className="mt-3 text-right">
                        <span className="text-sm font-medium !text-gray-600"style={{...FONTS.paragraph}}>Amount: </span>
                        <span className="text-lg !font-bold text-[#9b111e]"style={{...FONTS.paragraph}}>₹{item.amount || '0.00'}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
    </div>




{/* Service Items Section */} 
<div className="space-y-4">
  {/* Header and Add Button */}
  <div className="flex items-center justify-between">
    <label className="text-sm font-medium !text-gray-700"style={{...FONTS.paragraph}}>Service Items</label>
    <button
      type="button"
      onClick={addServices}
      className="bg-[#7812A4] !text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"style={{...FONTS.paragraph}}
    >
      <Plus className="w-4 h-4" />
      Add services
    </button>
  </div>

  {/* List of Service Inputs */}
  <div className="space-y-3">
    {formData.servicesmain.map((items, index) => (
      <div
        key={items.id}
        className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200"
      >
        {/* Header with Item Number and Remove Button */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium !text-gray-700"style={{...FONTS.subParagraph}}>
            Item {index + 1}
          </span>
          {formData.servicesmain.length > 1 && (
            <button
              type="button"
              onClick={() => removeServiceItems(items.id)}
              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium !text-gray-600 mb-1"style={{...FONTS.paragraph}}>
              Description
            </label>
            <input
              type="text"
              value={items.descriptions}
              onChange={(e) =>
                updateServiceItems(items.id, "descriptions", e.target.value)
              }
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all"style={{...FONTS.subParagraph}}
              placeholder="Service description"
            />
          </div>

          <div>
            <label className="block text-xs font-medium !text-gray-600 mb-1 ml-50"style={{...FONTS.paragraph}}>
              Rate (₹)
            </label>
            <input
              type="number"
              value={items.rates}
              onChange={(e) =>
                updateServiceItems(items.id, "rates", e.target.value)
              }
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all"style={{...FONTS.subParagraph}}
              placeholder="Rate"
            />
          </div>
        </div>

        {/* Calculated Amount */}
        <div className="mt-3 text-right">
          <span className="text-sm font-medium !text-gray-600"style={{...FONTS.paragraph}}>Amount: </span>
          <span className="text-lg !font-bold "style={{...FONTS.paragraph}}>
            ₹{items.amounts || "0.00"}
          </span>
        </div>
      </div>
    ))}
  </div>

  {/* Total Amount Summary */}
  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
    <div className="flex justify-between items-center">
      <span className="text-lg font-semibold "style={{...FONTS.paragraph}}>
        Total Amount:
      </span>
      <span className="text-2xl !font-bold "style={{...FONTS.paragraph}}>
        ₹{formData.totalAmount}
      </span>
    </div>
  </div>
</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#7812A4] !text-white px-4 h-[40px]  rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 "style={{...FONTS.paragraph}}
            >
              {/* <Save className="w-5 h-5" /> */}
              Save
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-[#7812A4] !text-white px-4 h-[40px] rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"style={{...FONTS.paragraph}}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardDetailsPage;