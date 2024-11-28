import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL+'/api',
    withCredentials : true,
    withXSRFToken: true,
})


axiosClient.interceptors.request.use(function (config) {
    // Récupère le token d'authentification stocké dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
        // Ajoute l'en-tête Authorization avec le token Bearer si disponible
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;  // Retourne la configuration mise à jour
});

export { axiosClient };
