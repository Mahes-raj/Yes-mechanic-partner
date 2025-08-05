/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api';

export const getProfile = async(params: string)=>{
    try{
        const response = await Client.partner.profile.getProfile(params);
        console.log(response);
        return response;
    }catch(error){
        console.log("Error getting profile:",error)
    }
}

export const updateProfile = async (data: any) => {
  try {
    const response = await Client.partner.profile.updateProfile(data);
    return response.data;
  } catch (error) {
    console.error("Error updating Profile func:", error)
  }
};



