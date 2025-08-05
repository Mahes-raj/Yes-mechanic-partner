/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpClient from "./httpClient";
import { HTTP_END_POINTS } from "./httpEndpoints";

class Client {
  partner = {
    booking:{
      create: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.booking.create, data),
      getById: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.booking.getById, params),
      getAll: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.booking.getAll, params),
      update: (data: any, params: string) =>
        HttpClient.update(HTTP_END_POINTS.booking.update, data, params),
      cancel:()=>
        HttpClient.delete(HTTP_END_POINTS.booking.cancel)
    },
    spareparts: {
      create: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.spareparts.create,data),
      getById: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.spareparts.getById, params),
      getAll: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.spareparts.getAll.replace(":uuid",params)),
      update: (data: any, params: string) =>
        HttpClient.update(HTTP_END_POINTS.spareparts.update.replace(":uuid",params),'',data),
      updateStatus: (data: any, params: string) =>
        HttpClient.update(
          HTTP_END_POINTS.spareparts.updateStatus,
          data,
          params
        ),
      delete: (id: string) => HttpClient.delete(`${HTTP_END_POINTS.spareparts.delete}/${id}`),
    },
    order_history: {
      create: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.order_history.create, data),
      getById: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.order_history.getById, params),
      getAll: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.order_history.getAll, params),
      update: (data: any, params: string) =>
        HttpClient.update(HTTP_END_POINTS.order_history.update, data, params),
      updateStatus: (data: any, params: string) =>
        HttpClient.update(
          HTTP_END_POINTS.order_history.updateStatus,
          data,
          params
        ),
      delete: () => HttpClient.delete(HTTP_END_POINTS.order_history.delete),
    },
    service_requets: {
      getAll: (params:string)=>
        HttpClient.get(HTTP_END_POINTS.service_requets.getAll,params),
    },
    service_history: {
      create: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.service_history.create, data),
      getById: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.service_history.getById, params),
      getAll: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.service_history.getAll, params),
    },
    job_card:{
      create : (data:any)=> 
        HttpClient.post(HTTP_END_POINTS.job_card.create,data),
      getAll : ()=> 
        HttpClient.get(HTTP_END_POINTS.job_card.getAll),
      getById : (params:string)=>
        HttpClient.get(HTTP_END_POINTS.job_card.getById,params),
      update :( params:string,data:any)=>
        HttpClient.update(HTTP_END_POINTS.job_card.update.replace(':id',data),params,data),
      delete : (params:string)=>
        HttpClient.delete(HTTP_END_POINTS.job_card.delete.replace(':uuid',params))
    },
    services: {
      create: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.services.create, data),
      getById: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.services.getById, params),
      getAll: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.services.getAll, params),
      update: (data: any, params: string) =>
        HttpClient.update(HTTP_END_POINTS.services.update, data, params),
      updateStatus: (data: any, params: string) =>
        HttpClient.update(HTTP_END_POINTS.services.updateStatus, data, params),
      deleteservice:(params:string)=>HttpClient.delete(HTTP_END_POINTS.services.delete.replace(":id",params))
    },
    notifications: {
      create: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.notifications.create, data),
      createBulk: (data: any) =>
        HttpClient.post(HTTP_END_POINTS.notifications.createBulk, data),
      getByUser: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.notifications.getByUser, params),
      getUnreadCount: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.notifications.getUnreadCount, params),
      markAsRead: (params: string) =>
        HttpClient.patch(HTTP_END_POINTS.notifications.markAsRead.replace(':uuid',params), ''),
      MarkAllAsRead: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.notifications.markAllAsRead, params),
      stats: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.notifications.stats, params),
      delete: () => HttpClient.delete(HTTP_END_POINTS.notifications.delete),
      getAll: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.notifications.getAll, params),
      getById: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.notifications.getById, params),
      patch: (data: any, uuid: string) =>
        HttpClient.patch(HTTP_END_POINTS.notifications.patch, data, uuid),
      createPreference: (data: any,) =>
        HttpClient.post(
          HTTP_END_POINTS.notifications.createPreference,
          data,
        ),
      updatePreference: (data: any, params: string) =>
        HttpClient.update(
          HTTP_END_POINTS.notifications.updatePreference,
          data,
          params
        ),
      getPreference: (params: string) =>
        HttpClient.get(HTTP_END_POINTS.notifications.getPreference, params),
    },
    profile:{
        getProfile:(data?:any)=>HttpClient.get(HTTP_END_POINTS.profile.getProfile,data),
        updateProfile:(data:any)=>HttpClient.update(HTTP_END_POINTS.profile.updateProfile,'',data),
        createNewProfile:(data:any)=>HttpClient.post(HTTP_END_POINTS.profile.createNewProfile,data),
        loginUser:(data:any)=>HttpClient.post(HTTP_END_POINTS.profile.loginUser,data)
    },
    customer_management:{
      getallCustomer:(data:any)=>HttpClient.get(HTTP_END_POINTS.customer_management.getAll,data),
    },
    customermanagement_history:{
      getallHistory:(data:any)=>HttpClient.get(HTTP_END_POINTS.customermanagement_history.getAll,data)
    },
    auth:{
        forgetPassword:(data:any)=>HttpClient.post(HTTP_END_POINTS.auth.forgetPassword,data),
        verifyOtp:(data:any)=>HttpClient.post(HTTP_END_POINTS.auth.verifyOtp,data),
        resetPassword:(data:any)=>HttpClient.post(HTTP_END_POINTS.auth.resetPassword,data)
    },
    annoucement:{
       getAll:()=>HttpClient.get(HTTP_END_POINTS.announcement.getAll),
       update:(data:any)=>HttpClient.update(HTTP_END_POINTS.announcement.update,'',data),
       get:(data:any)=>HttpClient.get(HTTP_END_POINTS.announcement.get.replace(':uuid',data))
    },
    enquery:{
      create:(data:any)=>HttpClient.post(HTTP_END_POINTS.enquiry.create,data),
      getAll:(params:string)=>HttpClient.get(HTTP_END_POINTS.enquiry.getAll,params)
    },
    serviceCat:{
      getAll:(params:string)=>HttpClient.get(HTTP_END_POINTS.serviceCenter.getAllCat.replace(":uuid",params))
    },
    category:{
      create:(data:any)=>HttpClient.post(HTTP_END_POINTS.category.create,data),
      update:(data:any,params:string)=>HttpClient.update(HTTP_END_POINTS.category.update,params,data)
    },
    Enquiry:{
      create:(data:any)=>HttpClient.post(HTTP_END_POINTS.Enquiry.create,data),
      get:()=>HttpClient.get(HTTP_END_POINTS.Enquiry.get),
    }
  };
}

export default new Client();
