import AxiosInstance from "../AxiosInstance";

const UserServices = {
    loadUsers: async () => {
        return AxiosInstance.get('/loadUsers')
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    },
    storeUser: async (data: FormData) => {
        return AxiosInstance.post('/storeUser', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    },
    updateUser: async (id: number, data: FormData) => {
        return AxiosInstance.put(`/updateUser/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    },
    deleteUser: async (id: number) => {
        return AxiosInstance.delete(`/deleteUser/${id}`)
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    },
}

export default UserServices; 