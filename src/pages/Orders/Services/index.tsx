/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api';

// eslint-disable-next-line react-refresh/only-export-components
export const getOrdersHistory = async(params: string)=>{
    try{
        const response = await Client.partner.order_history.getAll(params)
        console.log(response);
        return response
    }catch(error){
        console.log("Error getting orders history:", error)
    }
}

export const CreateOderHistory =async(data:any)=>{
    try {
        const response:any = await Client.partner.order_history.create(data)
        return response
    } catch (error) {
        console.log("Error getting orders history:",error)
    }
}