const generateEndpoints = () => {
  return {
    dashboard: {
      get: `/api/partner/dashboard/`,
      postProduct: `/api/products/`,
      getAllProducts: `/api/products/`,
      getProductById: `/api/products/:id`,
      updateProduct: `/api/products/:id`,
      deleteProduct: `/api/products/:id`,
    },
    booking: {
      create: `/api/booking/`,
      getAll: `/api/booking/`,
      getById: `/api/booking/:id`,
      update: `/api/booking/:id`,
      cancel: `/api/booking/:id/cancel`,
    },
    customer_management: {
      getAll :`/api/partner/customermanage`,
    },
    customermanagement_history:{
      getAll: `/api/partner/CustomerManagement/service-history`
    },
    announcement: {
      create: `/api/announcement/create`,
      getAll: `/api/announcement/all`,
      update:'/api/announcement/pinned/update',
      get:'/api/announcement/announcementget/:uuid'

    },
    enquiry: {
      create: `/api/enquiry/create`,
      getAll: `/api/enquiry/all`,
      update: `/api/enquiry/update/:uuid`,
    },
    spareparts: {
      create: `/api/admin/spareparts/create`,
      getById: `/api/admin/spareparts/get/:id`,
      getAll: `/api/admin/spareparts/getall/:uuid`,
      update: `/api/admin/spareparts/update/:uuid`,
      updateStatus: `/api/admin/spareparts/updatestatus/:id`,
      delete: `/api/admin/spareparts/delete`,
    },
    order_history: {
      create: `/api/partner/order-history/create`,
      getById: `/api/partner/order-history/get/:id`,
      getAll: `/api/partner/order-history/getall`,
      update: `/api/partner/order-history/update/:id`,
      updateStatus: `/api/partner/order-history/updatestatus/:id`,
      delete: `/api/partner/order-history/delete/:id`,
    },
    service_requets:{
      getAll : `/api/partner/service-req/all`
    },

    service_history: {
      create: `/api/partner/services-history/create`,
      getById: `/api/partner/services-history/get/:id`,
      getAll: `/api/partner/services-history/getall`,
    },

    job_card:{
      create :`/api/jobcards/createCard`,
      getAll :`/api/jobcards/getall/partner`,
      getById:`/api/jobcards/:id`,
      update:`/api/jobcards/:id`,
      delete:'/api/jobcards/delete/:uuid',
    },

    services: {
      create: `/api/admin/service/`,
      getAll: `/api/admin/service/`,
      getById: `/api/admin/service/:uuid`,
      update: `/api/admin/service/uuid`,
      updateStatus: `/api/admin/service/toggle-status/:uuid`,
      delete:'/api/admin/service/remove/:id'
    },
    
    notifications: {
      create: `/api/notifications/`,
      createBulk: `/api/notifications/bulk`,
      getByUser: `/api/notifications/user/:userId`,
      getUnreadCount: `/api/notifications/user/:userId/unread-count`,
      markAsRead: `/api/notifications/read/:uuid`,
      markAllAsRead: `/api/notifications/read-all/:userId`,
      stats: `/api/notifications/stats/:userId`,
      delete: `/api/notifications/:uuid`,
      getAll: `/api/notifications/`,
      getById: `/api/notifications/:uuid`,
      patch: `/api/notifications/read/:id`,
      createPreference: `/api/notifications/preferences`,
      updatePreference:`/api/notifications/preferences`,
      getPreference: `/api/notifications/preferences/:userId`,
    },
    profile:{
      getProfile: `/api/partner/auth/me`,
      updateProfile:`/api/partner/auth/update`,
      createNewProfile:`/api/partner/auth/register`,
      loginUser:`/api/partner/auth/login`
    },
    auth:{
      forgetPassword:`/api/partner/auth/forget-pass`,
      verifyOtp:`/api/partner/auth/verify-otp`,
      resetPassword:`/api/partner/auth/reset-pass/:id`
    },

    serviceCenter: {
      getAllCat: "/api/admin/category/getAll/:uuid",
    },
    category: {
      update: "/api/admin/category/update/:uuid",
      delete: "/api/admin/category/delete/:uuid",
      create: "/api/admin/category/create",
    },
    Enquiry:{
      create:"/api/serviceEnquiry/createEnquiry",
      get:"/api/serviceEnquiry/getAllEnquiries",
      put:"/api/serviceEnquiry/updateEnquiry/:id"
    }
  };
};

export const HTTP_END_POINTS = generateEndpoints();
