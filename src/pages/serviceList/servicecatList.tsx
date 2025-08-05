/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { ArrowLeft, Search, Plus, X, Edit3, Trash2 } from "lucide-react";
import Client from "../../api/index";
import { FONTS } from "../../constants/constants";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Service {
  _id: string;
  service_name: string;
  slug: string;
  description?: string;
  price?: number;
  category_id?: string;
  partner_id?: string;
  is_active?: boolean;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  uuid?: string;
  image?: string;
  duration?: string;
}

interface Category {
  _id: string;
  id: number;
  category_name: string;
  slug: string;
  is_active: boolean;
  is_deleted: boolean;
  services: Service[];
  uuid: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface NewCategoryState {
  category_name: string;
  is_active: boolean;
}

interface NewServiceState {
  service_name: string;
  price: string;
  description: string;
  duration: string;
  image: string | ArrayBuffer | null;
  is_active: boolean;
}

// interface ApiResponse<T> {
//   data: {
//     data: T;
//     // Add other fields from your API response if needed
//   };
// }

const ServiceCatList = () => {
 
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState<boolean>(false);
  const [activeServiceType, setActiveServiceType] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [newCategory, setNewCategory] = useState<NewCategoryState>({
    category_name: "",
    is_active: true,
  });

  const [newService, setNewService] = useState<NewServiceState>({
    service_name: "",
    price: "",
    description: "",
    duration: "",
    image: null,
    is_active: true,
  });

  const partnerId = localStorage.getItem("PartnerId") ?? "";

  useEffect(() => {
    async function fetchdata() {
      try {
        const response:any = await Client.partner.serviceCat.getAll(partnerId);
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchdata();
  }, [partnerId]);

  const handleBack = () => {
    navigate(-1)
  };

  const getAllServices = () => {
    const allServices: (Service & { categoryName: string })[] = [];
    categories.forEach((category) => {
      if (category.is_active && category.services && category.services.length > 0) {
        category.services
          .filter((service) => service && !service.is_deleted)
          .forEach((service) => {
            allServices.push({
              ...service,
              categoryName: category.category_name,
            });
          });
      }
    });
    return allServices;
  };

  const getFilteredServices = () => {
    let services = getAllServices();

    if (selectedCategory !== "all") {
      const selectedCat = categories.find((cat) => cat._id === selectedCategory);
      if (selectedCat && selectedCat.is_active) {
        services = selectedCat.services
          .filter((service) => service && !service.is_deleted)
          .map((service) => ({
            ...service,
            categoryName: selectedCat.category_name,
          }));
      } else {
        services = [];
      }
    }

    if (searchTerm) {
      services = services.filter(
        (service) =>
          service.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return services;
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      if (!confirm("Are you sure you want to delete this category?")) {
        return;
      }

      // await new Client().admin.category.delete(categoryId);
      setCategories(categories.filter(cat => cat._id !== categoryId));

      if (selectedCategory === categoryId) {
        setSelectedCategory("all");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const handleAddCategory = async () => {
    try {
      setEditingCategory(null);
      setNewCategory({ category_name: "", is_active: true });
      setShowAddCategoryForm(true);
    } catch (error) {
      console.log("add category:", error);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      category_name: category.category_name,
      is_active: category.is_active,
    });
    setShowAddCategoryForm(true);
  };

  const handleCancelAddCategory = () => {
    setShowAddCategoryForm(false);
    setEditingCategory(null);
    setNewCategory({ category_name: "", is_active: true });
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setNewCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.category_name) {
      try {
        console.log("Creating/updating category:", newCategory);

        if (editingCategory) {
          const updatedCategories = await Promise.all(
            categories.map(async (cat) => {
              if (cat._id === editingCategory._id) {
                const response: any = await Client.partner.category.update(newCategory, cat.uuid);
                const { data } = response.data;
                return {
                  ...cat,
                  data
                };
              } else {
                return cat;
              }
            })
          );
          setCategories(updatedCategories);
        } else {
          const newCategoryItem: any = {
            id: Date.now(),
            category_name: newCategory.category_name,
            slug: newCategory.category_name.toLowerCase().replace(/\s+/g, "-"),
            is_active: newCategory.is_active,
            is_deleted: false,
            partnerId
          };
          const response:any = await Client.partner.category.create(newCategoryItem);
          console.log(response.data.data);
          setCategories([...categories, response.data.data]);
        }

        setNewCategory({ category_name: "", is_active: true });
        setShowAddCategoryForm(false);
        setEditingCategory(null);
      } catch (error) {
        console.error("Error saving category:", error);
      }
    }
  };

  const handleAddService = (categoryId?: string) => {
    setActiveServiceType(categoryId || selectedCategory);
    setEditingService(null);
    setNewService({
      service_name: "",
      price: "",
      description: "",
      duration: "",
      image: null,
      is_active: true,
    });
    setShowAddForm(true);
  };

  const handleEditService = (service: Service) => {
    const category = categories.find((cat) => cat.services.some((s) => s._id === service._id));
    setActiveServiceType(category?._id || "");
    setEditingService(service);
    setNewService({
      service_name: service.service_name,
      price: service.price?.toString() || "",
      description: service.description || "",
      duration: service.duration || "",
      image: service.image || null,
      is_active: service.is_active ?? true,
    });
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setEditingService(null);
    setNewService({
      service_name: "",
      price: "",
      description: "",
      duration: "",
      image: null,
      is_active: true,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setNewService((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleActive = async (serviceId: string) => {
    try {
      console.log("Toggling service status:", serviceId);
      const updatedCategories = categories.map((category) => ({
        ...category,
        services: category.services.map((service) =>
          service._id === serviceId ? { ...service, is_active: !service.is_active } : service,
        ),
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error toggling service status:", error);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      console.log("Deleting service:", serviceId);
      // await new Client().admin.service.delete(serviceId);
      const updatedCategories = categories.map((category) => ({
        ...category,
        services: category.services.map((service) =>
          service._id === serviceId ? { ...service, is_deleted: true } : service,
        ),
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.service_name && newService.price && activeServiceType) {
      try {
        const selectedCat = categories.find((cat) => cat._id === activeServiceType);
        if (!selectedCat) return;

        if (editingService) {
          const editservice: any = {
            service_name: newService.service_name,
            price: Number.parseFloat(newService.price),
            description: newService.description,
            duration: newService.duration,
            image: newService.image as string,
          };

          const updatedCategories = await Promise.all(
            categories.map(async (category) => {
              const updatedServices = await Promise.all(
                category.services.map(async (service: any) => {
                  if (service._id === editingService._id) {
                    await Client.partner.services.update(editservice, service.uuid);
                    const data: any = {
                      service_name: newService.service_name,
                      price: Number.parseFloat(newService.price),
                      description: newService.description,
                      duration: newService.duration,
                      image: newService.image as string,
                      is_active: newService.is_active,
                      updated_at: new Date().toISOString(),
                    };
                    return {
                      ...service,
                      data
                    };
                  } else {
                    return service;
                  }
                })
              );
              console.log(updatedServices);
              console.log(categories);
              return {
                ...category,
                services: updatedServices,
              };
            })
          );

          setCategories(updatedCategories);
        } else {
          const newServiceItem: any = {
            service_name: newService.service_name,
            description: newService.description,
            price: Number.parseFloat(newService.price),
            category_id: selectedCat.uuid,
            partner_id: partnerId,
            duration: newService.duration,
          };
          const response:any = await Client.partner.services.create(newServiceItem);
          const updatedCategories = categories.map((category) =>
            category._id === activeServiceType
              ? { ...category, services: [...category.services, response.data.data] }
              : category,
          );
          setCategories(updatedCategories);
        }

        setNewService({
          service_name: "",
          price: "",
          description: "",
          duration: "",
          image: null,
          is_active: true,
        });
        setShowAddForm(false);
        setEditingService(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error saving service:", error);
      }
    }
  };

  const filteredServices = getFilteredServices();

  return (
    <div className="h-[650px] bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-pink-50 shadow-lg border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <button onClick={handleBack} className="p-2 rounded-3xl hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 style={{ ...FONTS.header }}>Service Catalog</h1>
              <p style={{ ...FONTS.paragraph }}>Manage services</p>
            </div>
          </div>

          <button
            style={{ ...FONTS.paragraph }}
            onClick={handleAddCategory}
            className="w-full flex items-center justify-center space-x-2 px-2 py-2 bg-[#7812A4] !text-white rounded-3xl hover:bg-[#7812A4] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex-1 p-4 space-y-2">
          <div className="mb-4">
            <h3 className="!font-semibold mb-2" style={{ ...FONTS.cardSubHeader }}>CATEGORIES</h3>
          </div>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-3xl transition-colors ${selectedCategory === "all"
                ? "bg-[#800000]/10 text-[#800000]"
                : "text-gray-700 hover:bg-[#800000]/10 hover:text-[#800000]"
              }`}
          >
            <div className="flex-1 text-left">
              <div  style={{ ...FONTS.paragraph }}>All Services</div>
              <div className="font-semibold" style={{ ...FONTS.subParagraph }}>{getAllServices().length} services</div>
            </div>
          </button>

          {categories
            .filter((cat) => cat.is_active && !cat.is_deleted)
            .map((category) => (
              <div key={category._id} className="group">
                <button
                  onClick={() => setSelectedCategory(category._id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-3xl transition-colors ${selectedCategory === category._id
                      ? "bg-[#800000]/10 text-[#800000]"
                      : "text-gray-700 hover:bg-[#800000]/10 hover:text-[#800000]"
                    }`}
                >
                  <div className="flex-1 text-left">
                    <div style={{ ...FONTS.paragraph }}>{category.category_name}</div>
                    <div className="font-semibold" style={{ ...FONTS.subParagraph }}>
                      {category.services?.filter((s) => s && !s.is_deleted).length || 0} services
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(category);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-3xl transition-all"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-3xl transition-all text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-pink-50 shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ ...FONTS.cardheader }}>
                {selectedCategory === "all"
                  ? "All Services"
                  : categories.find((c) => c._id === selectedCategory)?.category_name}
              </h2>
              <p className=" font-semibold" style={{ ...FONTS.paragraph }}>{filteredServices.length} Services Available</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 w-45 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Add Service */}
              <button
                style={{ ...FONTS.paragraph }}
                onClick={() => handleAddService()}
                className="flex items-center space-x-2 px-4 py-2 bg-[#7812A4] !text-white rounded-3xl hover:bg-[#7812A4] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div key={service._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={service.image as string}
                    alt={service.service_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => handleEditService(service)}
                      className="p-2 bg-white/90 rounded-3xl shadow hover:bg-gray-100 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="p-2 bg-white/90 rounded-3xl shadow hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="!font-bold text-lg " style={{ ...FONTS.cardSubHeader }}>{service.service_name}</h3>
                      <p className="text-sm " style={{ ...FONTS.paragraph }}>{service.categoryName}</p>
                    </div>
                    <span className="font-bold" style={{ ...FONTS.cardheader }}>₹{service.price || 0}</span>
                  </div>
                  <p className="mt-2 text-sm  line-clamp-2" style={{ ...FONTS.subParagraph }}>{service.description || "No description"}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm " style={{ ...FONTS.paragraph }}>{service.duration || "N/A"}</span>
                    <button
                      style={{ ...FONTS.paragraph }}
                      onClick={() => handleToggleActive(service._id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-3xl ${service.is_active ? "bg-green-100 !text-green-800" : "bg-red-100 !text-red-800"
                        }`}
                    >
                      {service.is_active ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-500">
                {selectedCategory === "all"
                  ? "Try adjusting your search or add a new service"
                  : `No services available in ${categories.find((c) => c._id === selectedCategory)?.category_name || "this category"}. Add a service to get started.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Service Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h3>
                <button onClick={handleCancelAdd} className="p-2 hover:bg-gray-100 rounded-3xl transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    name="service_name"
                    value={newService.service_name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Enter service name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={newService.price}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={newService.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    placeholder="e.g., 30 min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={activeServiceType}
                    onChange={(e) => setActiveServiceType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  >
                    <option value="">Select category</option>
                    {categories
                      .filter((cat) => cat.is_active && !cat.is_deleted)
                      .map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.category_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  placeholder="Enter service description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Image</label>
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                  {newService.image && (
                    <div className="mt-3">
                      <img
                        src={typeof newService.image === "string" ? newService.image : ""}
                        alt="Preview"
                        className="h-32 w-48 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={newService.is_active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">Activate service immediately</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-3xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-[#7812A4] rounded-3xl hover:bg-[#7812A4] transition-colors"
                >
                  {editingService ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddCategoryForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h3>
                <button
                  onClick={handleCancelAddCategory}
                  className="p-2 hover:bg-gray-100 rounded-3xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitCategory} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  name="category_name"
                  value={newCategory.category_name}
                  onChange={handleCategoryInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={newCategory.is_active}
                  onChange={handleCategoryInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">Activate category immediately</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancelAddCategory}
                  className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-3xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-[#7812A4] rounded-3xl hover:bg-[#7812A4] transition-colors"
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCatList;