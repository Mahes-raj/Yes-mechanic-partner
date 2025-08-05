/* eslint-disable @typescript-eslint/no-explicit-any */

import Client from '../../../api';

export const updateServices = async (uuid: string, data: any) => {
  try {
    const response = await Client.partner.services.update(uuid, data);
    return response;
  } catch (error) {
    console.log('Updating service error:', error);
    throw error;
  }
};

export const createService = async (data: any) => {
  try {
    const response = await Client.partner.services.create(data);
    return response;
  } catch (error) {
    console.log('Creating service error:', error);
    throw error;
  }
};

export const deleteService = async (uuid: string) => {
  try {
    const response = await Client.partner.services.deleteservice(uuid);
    return response;
  } catch (error) {
    console.log('Deleting service error:', error);
    throw error;
  }
};

export const getServices = async (uuid: string) => {
  try {
    const response = await Client.partner.services.getById(uuid);
    return response;
  } catch (error) {
    console.log('Get service by ID error:', error);
    throw error;
  }
};

export const getallServices = async (partnerId: string) => {
  try {
    const response = await Client.partner.services.getAll(partnerId);
    return response;
  } catch (error) {
    console.log('Get all services error:', error);
    throw error;
  }
};

export const GetCatgeory = async()=>{
  try {
    const partner:string = localStorage.getItem("PartnerId")?? ''
    const response:any = await Client.partner.serviceCat.getAll(partner)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log("category data ",error)
  }
}

export const CreateCategory = async(data:any)=>{
    try {
      await Client.partner.category.create(data)
    } catch (error) {
      console.log(error)
    }
}