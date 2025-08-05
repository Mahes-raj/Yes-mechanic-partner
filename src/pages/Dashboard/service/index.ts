/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index'

export const DashboardProfile=async()=>{
    try {
        const response:any = await Client.partner.profile.getProfile()
        return response.data
    } catch (error) {
        console.log("dashboard error:",error)
    }
}

export const getMeDeatails = async () => {
    try {
        const response:any = await Client.partner.profile.getProfile()
        return response.data
    } catch (error) {
        console.log(error)
    }
}