import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: 'https://a11-act-for-bd-server.vercel.app',
});

axiosSecure.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
