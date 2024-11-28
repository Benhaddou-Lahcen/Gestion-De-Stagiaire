import { axiosClient } from "../../api/axios"

const StagiaireApi = {
    login: async (email,password) => {
        return await axiosClient.post('/login',{email,password})
    },
    logout: async () => {
        return await axiosClient.post('/logout')
    },
    getUser: async () => {
        return await axiosClient.get('/me')
    },
}
export default StagiaireApi
