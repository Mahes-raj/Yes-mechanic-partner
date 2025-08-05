/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api';
export const pinnedAnnouncementsAPI= async (data:any)=>{
    try{
       const response = await Client.partner.annoucement.update({uuid:data})
       return response;
    }
    catch (error){
console.log(error)
    }
}

export const announcementget=async (data:any )=>{
    try{
        const response = await Client.partner.annoucement.get(data)
        return response;
    }
    catch(error){
        console.log(error)
    }
}