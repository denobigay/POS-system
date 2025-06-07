import AxiosInstance from "../AxiosInstance";

const RoleServices = {
   storeRole: async (data: any) => {
    return AxiosInstance.post('/storeRole', data).then((response)=> response).catch((error)=>{
        throw error;
    });
   },
}

export default RoleServices;