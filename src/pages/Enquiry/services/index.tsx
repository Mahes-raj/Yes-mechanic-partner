/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api'
export const createEnquiry = async (data:any)=>{
    try{
        const response:any=await Client.partner.Enquiry.create(data)
        return response
    }
    catch(error){
        console.log('created successfully ',error)
    }
}

export const getEnquiry = async(params:string)=>{
    try{
        const response:any=await Client.partner.enquery.getAll(params)
        return response ;
    }
    catch(error){
       console.log('recived all fetched data',error);
    }
}
