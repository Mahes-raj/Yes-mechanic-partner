/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api';

export const createSparePart = async (data: any) => {
  try {
    const response = await Client.partner.spareparts.create(data);
    return response
  } catch (error) {
    console.log('Error creating spare part:', error);
  }
};

export const getSparePartById = async (params: string) => {
  try {
    const response = await Client.partner.spareparts.getById(params);
    return response
  } catch (error) {
    console.log('Error getting spare part by ID:', error);
  }
};

export const getAllSpareParts = async (partnerId:string) => {
  try {
    const response = await Client.partner.spareparts.getAll(partnerId);
    return response;
  } catch (error) {
    console.log('Error getting all spare parts:', error);
  }
};

export const updateSparePart = async (data: any, params: string) => {
  try {
    const response = await Client.partner.spareparts.update(data, params);
    console.log(response,"update cheicnng")
    return response
  } catch (error) {
    console.log('Error updating spare part:', error);
  }
};

export const updateSparePartStatus = async (data: any, params: string) => {
  try {
    const response = await Client.partner.spareparts.updateStatus(data, params);
    return response
  } catch (error) {
    console.log('Error updating spare part status:', error);
  }
};

export const deleteSpareParts = async (id:string ) => {
  try {
    const response = await Client.partner.spareparts.delete(id);
    return response
  } catch (error) {
    console.log('Error deleting spare parts:', error);
  }
};
