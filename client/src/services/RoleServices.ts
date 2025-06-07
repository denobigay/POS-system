import AxiosInstance from "../AxiosInstance";

const RoleServices = {
    loadRoles: async () => {
        return AxiosInstance.get('/loadRoles').then((response) => response).catch((error) => {
            throw error;
        });
    },
   storeRole: async (data: any) => {
    return AxiosInstance.post('/storeRole', data).then((response)=> response).catch((error)=>{
        throw error;
    });
   },
}

export default RoleServices;