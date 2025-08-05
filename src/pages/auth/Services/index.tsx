import Client from '../../../api';

export const loginUser= async(data:any)=>{
    try{
        const response = await Client.partner.profile.loginUser(data)
        return response;
    }catch(error){
        console.log("Error loginUser:",error)
    }
}